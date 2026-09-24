import React, { useEffect, useRef, useState } from 'react';
// Misiones de La Gran Guerra (todas aceptan onComplete)
import SarajevoMission from '../components/SarajevoMission';
import InfantryMission from '../components/InfantryMission';
import SommeBattleMission from '../components/SommeBattleMission';
import EspionageMission from '../components/EspionageMission';
import AerialCombatMission from '../components/AerialCombatMission';
import WarNurseMission from '../components/WarNurseMission';

// Roles disponibles (sabor narrativo; la campaña es secuencial para todos)
const ROLES = [
  { id: 'infantry',    icon: '🪖', name: 'Soldado de Infantería' },
  { id: 'pilot',       icon: '✈️', name: 'Piloto de Combate' },
  { id: 'intelligence',icon: '🕵️', name: 'Oficial de Inteligencia' },
  { id: 'nurse',       icon: '🚑', name: 'Enfermera de Guerra' },
  { id: 'factory',     icon: '🏭', name: 'Trabajador de Fábrica' },
  { id: 'diplomat',    icon: '🎩', name: 'Diplomático' },
] as const;

// CAMPAÑA SECUENCIAL: Sarajevo primero; se desbloquea una a una en orden.
const CAMPAIGN: {
  id: string; Comp: React.ComponentType<{ onComplete?: (r: { success: boolean; score: number; label: string }) => void }>;
  title: string; icon: string; desc: string; time: number;
}[] = [
  { id: 'sarajevo-1914',    Comp: SarajevoMission,     title: 'Sarajevo, 1914',          icon: '🚗', time: 120, desc: 'Protege al Archiduque en el momento que cambió la historia.' },
  { id: 'infantry-mission', Comp: InfantryMission,     title: 'Asalto a las Trincheras', icon: '🪖', time: 150, desc: 'Toma la dirección del asalto en el frente occidental.' },
  { id: 'somme-battle',     Comp: SommeBattleMission,  title: 'Batalla de Somme',        icon: '🎖️', time: 120, desc: 'Manda tu escuadra en la ofensiva más sangrienta.' },
  { id: 'espionage-mission',Comp: EspionageMission,    title: 'Espionaje',               icon: '🕵️', time: 150, desc: 'Infíltrate y descifra los códigos enemigos.' },
  { id: 'aerial-combat',    Comp: AerialCombatMission, title: 'Combate Aéreo',           icon: '✈️', time: 120, desc: 'Ases de los cielos: domina el duelo aéreo.' },
  { id: 'war-nurse-mission',Comp: WarNurseMission,     title: 'Hospital de Campaña',     icon: '🚑', time: 120, desc: 'Decide a quién salvar primero en el triaje.' },
];

const MAX_LIVES = 3;
type Phase = 'start' | 'role' | 'board' | 'play' | 'final' | 'gameover';
const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const Index: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('start');
  const [name, setName] = useState('');
  const [role, setRole] = useState<string>('');
  const [lives, setLives] = useState(MAX_LIVES);
  const [completed, setCompleted] = useState<string[]>([]);
  const [results, setResults] = useState<{ label: string; success: boolean; score: number }[]>([]);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const unlocked = completed.length;
  const allDone = completed.length === CAMPAIGN.length;
  const roleMeta = ROLES.find((r) => r.id === role);

  // Temporizador de la misión activa
  useEffect(() => {
    if (phase !== 'play' || !currentId) return;
    const lim = CAMPAIGN.find((m) => m.id === currentId)?.time ?? 120;
    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, currentId]);

  function handleTimeout() {
    const next = lives - 1;
    setLives(next);
    setCurrentId(null);
    setPhase(next <= 0 ? 'gameover' : 'board');
  }

  function startCampaign() {
    setLives(MAX_LIVES);
    setCompleted([]);
    setResults([]);
    setCurrentId(null);
    setPhase('board');
  }

  function handleComplete(r: { success: boolean; score: number; label: string }) {
    if (timerRef.current) clearInterval(timerRef.current);
    if (r.success) {
      setCompleted((d) => (d.includes(currentId!) ? d : [...d, currentId!]));
      setResults((p) => [...p, r]);
      setCurrentId(null);
      setPhase('board');
    } else {
      const next = lives - 1;
      setLives(next);
      setResults((p) => [...p, r]);
      setCurrentId(null);
      setPhase(next <= 0 ? 'gameover' : 'board');
    }
  }

  const nowComp = CAMPAIGN.find((m) => m.id === currentId)?.Comp;

  return (
    <div className="min-h-screen bg-[#12100e] text-[#f5e9d0] font-crimson">
      <header className="sticky top-0 z-20 border-b border-war-gold/20 bg-[#12100e]/90 backdrop-blur px-4 py-3">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-lg sm:text-xl text-war-gold">La Gran Guerra: Misión Secreta</h1>
            {roleMeta && <p className="text-xs text-war-gold/60">{roleMeta.icon} {roleMeta.name} · {name}</p>}
          </div>
          {(phase === 'board' || phase === 'play') && (
            <div className="flex items-center gap-3 text-sm" title={`Vidas: ${lives}/${MAX_LIVES}`}>
              <span>
                {'❤️'.repeat(Math.max(0, lives))}{'🖤'.repeat(Math.max(0, MAX_LIVES - lives))}
                <span className="ml-1 text-war-gold/70">×{MAX_LIVES}</span>
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 pb-24">
        {phase === 'start' && (
          <div className="text-center space-y-6">
            <div className="text-6xl">🎖️</div>
            <h2 className="font-display text-3xl text-war-gold">1914 · La Gran Guerra</h2>
            <p className="text-war-gold/70 max-w-xl mx-auto">
              Asume un rol, supera la campaña misión a misión y llega hasta el final con tu Reporte de Agente.
              Tienes <b className="text-war-gold">3 vidas ❤️</b> y cada misión tiene un <b className="text-war-gold">tiempo límite ⏱️</b>.
              Si pierdes las vidas o agotas el tiempo, tendrás que volver a empezar.
            </p>
            <div className="max-w-xs mx-auto">
              <label className="block text-left text-sm text-war-gold/70 mb-1">Nombre de tu agente</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre"
                className="w-full rounded-lg border border-war-gold/40 bg-black/30 px-4 py-3 text-center text-lg focus:outline-none"
              />
            </div>
            <button
              disabled={!name.trim()}
              onClick={() => setPhase('role')}
              className="war-button text-lg px-8 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Elegir mi rol →
            </button>
          </div>
        )}

        {phase === 'role' && (
          <div className="space-y-5">
            <h2 className="font-display text-2xl text-war-gold text-center">Elige tu rol en la guerra</h2>
            <p className="text-war-gold/60 text-center text-sm">Tu rol marca tu función, pero la campaña siempre comienza en Sarajevo 1914 y avanza en orden.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {ROLES.map((r) => (
                <button key={r.id} onClick={() => { setRole(r.id); startCampaign(); }}
                  className="rounded-xl border-2 border-war-gold/30 bg-black/20 p-4 text-center hover:border-war-gold hover:bg-war-gold/10 transition">
                  <div className="text-4xl mb-2">{r.icon}</div>
                  <div className="font-display text-war-gold">{r.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {(phase === 'board' || phase === 'gameover') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-war-gold">🗂️ Tablón de Misiones</h2>
              <span className="text-xs text-war-gold/60">Completadas {completed.length}/{CAMPAIGN.length}</span>
            </div>
            <p className="text-sm text-war-gold/60">
              La campaña avanza <b className="text-war-gold">en orden</b>: supera una misión para desbloquear la siguiente. Vidas restantes: <b className="text-war-gold">{lives}</b>.
            </p>

            {phase === 'gameover' && (
              <div className="rounded-2xl border-2 border-red-500/60 bg-red-950/30 p-6 text-center space-y-3 animate-pulse">
                <div className="text-5xl">💀</div>
                <h3 className="font-display text-2xl text-red-300">Sin vidas · Misión fallida</h3>
                <p className="text-red-200/80">Has agotado tus vidas o el tiempo. Deberás comenzar la campaña de nuevo desde Sarajevo.</p>
                <button onClick={startCampaign} className="war-button text-lg px-8 py-3 mt-2">🔁 Volver a empezar</button>
              </div>
            )}

            <div className="space-y-2">
              {CAMPAIGN.map((m, i) => {
                const done = completed.includes(m.id);
                const active = i === unlocked && !done;
                const locked = !done && !active;
                return (
                  <div key={m.id}
                    className={`flex items-center gap-3 rounded-xl border-2 p-3 sm:p-4 transition
                      ${done ? 'border-green-500/50 bg-green-950/20'
                        : active ? 'border-war-gold/70 bg-war-gold/10'
                        : 'border-white/10 bg-black/20 opacity-70'}`}>
                    <div className="text-3xl">{done ? '✅' : locked ? '🔒' : '▶️'}</div>
                    <div className="flex-1">
                      <div className="font-display text-war-gold flex items-center gap-2 flex-wrap">
                        {m.icon} {m.title}
                        {done && <span className="text-xs text-green-400 normal-case font-sans">· Completada</span>}
                        {locked && <span className="text-xs text-white/40 normal-case font-sans">· Bloqueada</span>}
                      </div>
                      <p className="text-xs text-war-gold/60">{m.desc}</p>
                      <p className="text-[11px] text-white/40">⏱️ {fmtTime(m.time)}</p>
                    </div>
                    {active && (
                      <button onClick={() => { setCurrentId(m.id); setRemaining(m.time); setPhase('play'); }}
                        className="war-button text-sm px-4 py-2">Jugar ▶</button>
                    )}
                    {locked && <span className="text-white/30 text-sm">🔒</span>}
                  </div>
                );
              })}
            </div>

            {allDone && (
              <button onClick={() => setPhase('final')} className="w-full war-button text-xl px-6 py-4 mt-4 battlefield-glow">
                🏁 Ver Reporte de Agente
              </button>
            )}
          </div>
        )}

        {phase === 'play' && currentId && nowComp && (() => {
          const m = CAMPAIGN.find((x) => x.id === currentId)!;
          const Comp = m.Comp;
          return (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 rounded-xl border border-war-gold/30 bg-black/30 px-4 py-3">
                <div className="font-display text-war-gold">{m.icon} {m.title}</div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={remaining <= 20 ? 'text-red-400 font-bold' : 'text-war-gold/80'}>⏱️ {fmtTime(remaining)}</span>
                  <span>❤️{Math.max(0, lives)}/{MAX_LIVES}</span>
                  <button onClick={() => setPhase('board')} className="text-xs text-war-gold/60 underline">← Salir</button>
                </div>
              </div>
              <Comp onComplete={handleComplete} />
            </div>
          );
        })()}

        {phase === 'final' && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="text-5xl">🏆</div>
              <h2 className="font-display text-3xl text-war-gold">Reporte de Agente</h2>
              <p className="text-war-gold/70">{roleMeta?.icon} {roleMeta?.name} · {name}</p>
            </div>

            <div className="rounded-2xl border-2 border-war-gold/40 bg-black/30 p-5 space-y-3">
              <h3 className="font-display text-lg text-war-gold">📋 Resultado de la campaña</h3>
              <ul className="space-y-1 text-sm">
                {results.map((r, i) => (
                  <li key={i} className="flex justify-between border-b border-white/10 py-1">
                    <span>{r.success ? '✅' : '❌'} {r.label}</span>
                    <span className="text-war-gold/70">{r.score} pts</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-green-400">Misiones superadas: {completed.length}/{CAMPAIGN.length} · Vidas restantes: {lives}</p>
            </div>

            <div className="rounded-2xl border-2 border-blue-500/40 bg-blue-950/20 p-5 space-y-3">
              <h3 className="font-display text-lg text-blue-200">📚 Reflexión en Google Classroom</h3>
              <p className="text-sm text-blue-100/80">Con base en tu recorrido, responde en tu grupo de Ciencias Sociales:</p>
              <ol className="list-decimal list-inside text-sm text-blue-100/90 space-y-1">
                <li>La decisión que tomaste en el juego y si resultó acertada.</li>
                <li>Cómo se relaciona tu decisión con lo que ocurrió realmente en la Primera Guerra Mundial.</li>
                <li>Qué lección sobre la guerra, la paz y el valor de la vida puedes aplicar a tu contexto o a Colombia.</li>
              </ol>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a href="https://classroom.google.com/c/842003150589/a/886984111194" target="_blank" rel="noreferrer"
                  className="war-button text-center px-4 py-3">9°-1 · Responder en Classroom</a>
                <a href="https://classroom.google.com/c/793492637905/a/886984160724" target="_blank" rel="noreferrer"
                  className="war-button text-center px-4 py-3">9°-2 · Responder en Classroom</a>
              </div>
            </div>

            <button onClick={startCampaign} className="w-full war-button px-6 py-3">🔁 Jugar de nuevo</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
