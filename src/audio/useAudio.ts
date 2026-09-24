import { useCallback, useEffect, useRef, useState } from 'react';

type Sfx = 'click' | 'success' | 'error' | 'complete' | 'boom' | 'tick';

/**
 * Gestor de audio ligero basado en Web Audio API (sin archivos externos).
 * Ambientación drone sutil + efectos puntuales. Silenciado por defecto;
 * se activa con el botón 🔊/🔇 (primera interacción del usuario).
 */
export function useAudioManager() {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const ambientRef = useRef<{ stop: () => void } | null>(null);

  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    const ctx = new AC();
    const master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
    ctxRef.current = ctx;
    masterRef.current = master;
    return ctx;
  }, []);

  const tone = useCallback(
    (freq: number, dur: number, type: OscillatorType = 'sine', gain = 0.2, when = 0) => {
      const ctx = ctxRef.current, master = masterRef.current;
      if (!enabledRef.current || !ctx || !master) return;
      try {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        const t = ctx.currentTime + when;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + dur + 0.06);
      } catch { /* ignore */ }
    },
    []
  );

  const boom = useCallback(() => {
    const ctx = ctxRef.current, master = masterRef.current;
    if (!enabledRef.current || !ctx || !master) return;
    try {
      const len = Math.floor(ctx.sampleRate * 0.5);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filt = ctx.createBiquadFilter();
      filt.type = 'lowpass';
      filt.frequency.value = 380;
      const g = ctx.createGain();
      g.gain.value = 0.35;
      src.connect(filt);
      filt.connect(g);
      g.connect(master);
      src.start();
      src.stop(ctx.currentTime + 0.5);
    } catch { /* ignore */ }
  }, []);

  const play = useCallback(
    (name: Sfx) => {
      switch (name) {
        case 'click': tone(620, 0.07, 'square', 0.06); break;
        case 'success': tone(523, 0.12); tone(659, 0.12, 'sine', 0.18, 0.12); tone(784, 0.2, 'sine', 0.2, 0.24); break;
        case 'error': tone(230, 0.16, 'sawtooth', 0.13); tone(180, 0.24, 'sawtooth', 0.13, 0.14); break;
        case 'complete': [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, 'triangle', 0.2, i * 0.12)); break;
        case 'boom': boom(); break;
        case 'tick': tone(950, 0.04, 'square', 0.05); break;
      }
    },
    [tone, boom]
  );

  const startAmbient = useCallback(() => {
    const ctx = ensureCtx(), master = masterRef.current;
    if (!ctx || !master || ambientRef.current) return;
    try {
      const gmain = ctx.createGain();
      gmain.gain.value = 0.045;
      const o1 = ctx.createOscillator(); o1.type = 'sine'; o1.frequency.value = 110;
      const o2 = ctx.createOscillator(); o2.type = 'triangle'; o2.frequency.value = 110.6;
      const o3 = ctx.createOscillator(); o3.type = 'sine'; o3.frequency.value = 165;
      const g3 = ctx.createGain(); g3.gain.value = 0.4;
      o1.connect(gmain); o2.connect(gmain);
      o3.connect(g3); g3.connect(gmain);
      const lfo = ctx.createOscillator(); lfo.frequency.value = 0.18;
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain); lfoGain.connect(gmain.gain);
      gmain.connect(master);
      o1.start(); o2.start(); o3.start(); lfo.start();
      const stop = () => {
        try {
          gmain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
          setTimeout(() => { try { o1.stop(); o2.stop(); o3.stop(); lfo.stop(); gmain.disconnect(); } catch {} }, 450);
        } catch { /* ignore */ }
      };
      ambientRef.current = { stop };
    } catch { /* ignore */ }
  }, [ensureCtx]);

  const stopAmbient = useCallback(() => {
    ambientRef.current?.stop();
    ambientRef.current = null;
  }, []);

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setEnabled(next);
    try {
      if (next) {
        const ctx = ensureCtx();
        if (ctx && ctx.state === 'suspended') ctx.resume();
      }
    } catch { /* ignore */ }
  }, [ensureCtx]);

  // Sincroniza ambientación con el estado habilitado
  useEffect(() => {
    if (enabled) startAmbient();
    else stopAmbient();
    return () => stopAmbient();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Clic suave en cualquier botón/enlace (solo cuando está activo)
  useEffect(() => {
    if (!enabled) return;
    const h = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && typeof t.closest === 'function' && t.closest('button,a')) play('click');
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  return { enabled, toggle, play };
}
