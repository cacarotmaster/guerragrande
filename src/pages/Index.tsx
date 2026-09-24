import React, { useState } from 'react';
// Misiones (cada una acepta onComplete)
import InfantryMission from '../components/InfantryMission';
import SarajevoMission from '../components/SarajevoMission';
import SommeBattleMission from '../components/SommeBattleMission';
import AerialCombatMission from '../components/AerialCombatMission';
import EspionageMission from '../components/EspionageMission';
import WarNurseMission from '../components/WarNurseMission';

interface RoleDef {
  id: string;
  name: string;
  icon: string;
  desc: string;
  path: string[]; // ids de misiones requeridas para llegar al final
}

type Phase = 'start' | 'role' | 'board' | 'play' | 'final';

interface MissionDef {
  id: string;
  title: string;
  icon: string;
  historical: string;
  desc: string;
}

const ROLES: RoleDef[] = [
  { id: 'infantry', name: 'Soldado de Infantería', icon: '🪖', desc: 'Lucha en las trincheras y vive las campañas.', path: ['sarajevo-1914', 'infantry-mission', 'somme-battle'] },
  { id: 'pilot', name: 'Piloto de Combate', icon: '✈️', desc: 'Enfrenta dogfights sobre Flandes.', path: ['sarajevo-1914', 'aerial-combat'] },
  { id: 'intelligence', name: 'Oficial de Inteligencia', icon: '🕵️', desc: 'Espionaje y decodificación enemiga.', path: ['sarajevo-1914', 'espionage-mission'] },
  { id: 'nurse', name: 'Enfermera de Guerra', icon: '⚕️', desc: 'Salva vidas en el hospital de campaña.', path: ['sarajevo-1914', 'war-nurse-mission'] },
  { id: 'factory', name: 'Trabajador de Fábrica', icon: '🏭', desc: 'El esfuerzo bélico desde la industria.', path: ['sarajevo-1914', 'somme-battle', 'war-nurse-mission'] },
  { id: 'diplomat', name: 'Diplomático', icon: '🎩', desc: 'Negocia y evita la escalada del conflicto.', path: ['sarajevo-1914', 'espionage-mission'] },
];

const MISSIONS: MissionDef[] = [
  { id: 'sarajevo-1914', title: 'Sarajevo, 1914', icon: '🚗', historical: '28 jun 1914 · Sarajevo', desc: 'Protege a la comitiva del Archiduque en el momento que cambió la historia.' },
  { id: 'infantry-mission', title: 'Asalto a las Trincheras', icon: '🪖', historical: '1 jul 1916 · Somme', desc: 'Lidera tu escuadrón en un asalto táctico bajo fuego enemigo.' },
  { id: 'somme-battle', title: 'Batalla de Somme', icon: '💥', historical: '1916 · Río Somme', desc: 'Sobrevive a la tierra de nadie y completa objetivos estratégicos.' },
  { id: 'espionage-mission', title: 'Espionaje y Códigos', icon: '🕵️', historical: '1915-1918 · Líneas enemigas', desc: 'Descifra mensajes secretos y extrae información crucial.' },
  { id: 'aerial-combat', title: 'Héroes del Aire', icon: '✈️', historical: '1917 · Flandes', desc: 'Duelos aéreos contra los mejores ases enemigos.' },
  { id: 'war-nurse-mission', title: 'Hospital de Campaña', icon: '⚕️', historical: '1917 · Frente Occidental', desc: 'Gestiona recursos y salva vidas bajo presión extrema.' },
];

const CLASSROOM = [
  { label: 'Reflexión · 9-1', url: 'https://classroom.google.com/c/842003150589/a/886984111194' },
  { label: 'Reflexión · 9-2', url: 'https://classroom.google.com/c/793492637905/a/886984160724' },
];

const REFLECTION_QUESTIONS = [
  'La decisión que tomaste en el juego y si resultó acertada.',
  'Cómo se relaciona tu decisión con lo que ocurrió realmente en la Primera Guerra Mundial.',
  'Qué lección sobre la guerra, la paz y el valor de la vida puedes aplicar a tu contexto o a Colombia.',
];

const MISSION_COMPONENTS: Record<string, React.FC<any>> = {
  'infantry-mission': InfantryMission,
  'sarajevo-1914': SarajevoMission,
  'somme-battle': SommeBattleMission,
  'aerial-combat': AerialCombatMission,
  'espionage-mission': EspionageMission,
  'war-nurse-mission': WarNurseMission,
};

export default function Index() {
  const [phase, setPhase] = useState<Phase>('start');
  const [playerName, setPlayerName] = useState('');
  const [role, setRole] = useState<RoleDef | null>(null);
  const [currentMission, setCurrentMission] = useState<MissionDef | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [results, setResults] = useState<{ missionId: string; label: string; score: number; success: boolean }[]>([]);

  const isPathComplete = (r: RoleDef) => r.path.every((id) => completed.includes(id));

  const handleCompleteMission = (result: { success: boolean; score: number; label: string }) => {
    if (!currentMission) return;
    setCompleted((prev) => (prev.includes(currentMission.id) ? prev : [...prev, currentMission.id]));
    setResults((prev) => [...prev, { missionId: currentMission.id, label: result.label, score: result.score, success: result.success }]);
    setCurrentMission(null);
    setPhase('board');
  };

  const startOver = () => {
    setPhase('start');
    setPlayerName('');
    setRole(null);
    setCurrentMission(null);
    setCompleted([]);
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-war-trench text-war-gold">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Encabezado */}
        {phase !== 'start' && (
          <header className="flex items-center justify-between border-b border-war-gold/30 pb-4 mb-6 flex-wrap gap-2">
            <div>
              <h1 className="font-cinzel text-2xl md:text-3xl font-bold text-war-gold">La Gran Guerra: Misión Secreta</h1>
              <p className="text-war-gold/60 font-crimson text-sm">1914 - 1918 · Una experiencia educativa interactiva</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="text-2xl">{role?.icon}</span>
              <span className="font-cinzel font-semibold">{role?.name}</span>
              <span className="text-war-gold/60">·</span>
              <span className="font-crimson">{playerName || 'Agente'}</span>
            </div>
          </header>
        )}

        {/* ===== INICIO: nombre ===== */}
        {phase === 'start' && (
          <div className="min-h-[70vh] flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center bg-war-field/40 border border-war-gold/30 rounded-xl p-8 md:p-12 backdrop-blur-sm animate-fade-in">
              <div className="text-6xl mb-6">🎖️</div>
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-war-gold mb-4">LA GRAN GUERRA</h2>
              <p className="text-war-gold/80 font-crimson text-lg leading-relaxed mb-6">
                1914-1918. El mundo se hundió en el primer conflicto global. Asume un rol, supera las misiones
                de tu camino y honra la memoria de quienes vivieron la guerra.
              </p>
              <div className="mb-6">
                <label className="block text-war-gold/70 font-crimson mb-2">🪪 Nombre de agente (aparece en tu Reporte)</label>
                <input
                  value={playerName}
                  maxLength={40}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Escribe tu nombre o apodo"
                  className="w-full max-w-sm mx-auto bg-war-trench border-2 border-war-gold/40 rounded-lg px-4 py-3 text-center text-war-gold placeholder:text-war-gold/40 focus:outline-none focus:border-war-gold"
                />
              </div>
              <button
                disabled={!playerName.trim()}
                onClick={() => setPhase('role')}
                className="war-button text-xl px-12 py-4 battlefield-glow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Comenzar la Guerra
              </button>
            </div>
          </div>
        )}

        {/* ===== SELECCIÓN DE ROL ===== */}
        {phase === 'role' && (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="font-cinzel text-4xl font-bold text-war-gold mb-2">Elige Tu Destino</h2>
              <p className="text-war-gold/70 font-crimson text-lg">Cada rol define tu camino de misiones hasta el final de la guerra.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {ROLES.map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setRole(r); setPhase('board'); }}
                  className="text-left bg-war-field/40 border-2 border-war-gold/25 hover:border-war-gold rounded-xl p-6 transition-all hover:scale-[1.02]"
                >
                  <div className="text-5xl mb-3">{r.icon}</div>
                  <h3 className="font-cinzel text-xl font-semibold text-war-gold mb-1">{r.name}</h3>
                  <p className="text-war-gold/70 font-crimson text-sm mb-3">{r.desc}</p>
                  <div className="text-xs text-war-gold/60">
                    Ruta: {r.path.map((id) => MISSIONS.find((m) => m.id === id)?.icon).join(' ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ===== TABLÓN DE MISIONES ===== */}
        {phase === 'board' && role && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="font-cinzel text-3xl font-bold text-war-gold">Tablón de Misiones</h2>
              <div className="flex gap-3">
                <button onClick={() => setRole(null)} className="text-war-gold/70 hover:text-war-gold font-crimson text-sm">
                  ← Cambiar Rol
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {MISSIONS.map((m) => {
                const done = completed.includes(m.id);
                const inPath = role.path.includes(m.id);
                const Comp = MISSION_COMPONENTS[m.id];
                return (
                  <div key={m.id} className={`bg-war-field/40 border rounded-xl p-5 flex flex-col ${done ? 'border-green-500/50' : 'border-war-gold/25'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{m.icon}</span>
                      {inPath ? (
                        <span className="text-[11px] bg-war-gold/20 text-war-gold border border-war-gold/40 rounded-full px-2 py-1">Tu ruta</span>
                      ) : done ? (
                        <span className="text-[11px] text-green-400">✓ Completada</span>
                      ) : null}
                    </div>
                    <h3 className="font-cinzel text-lg font-semibold text-war-gold mb-1">{m.title}</h3>
                    <p className="text-war-gold/60 font-crimson text-xs mb-2">{m.historical}</p>
                    <p className="text-war-gold/80 font-crimson text-sm mb-4 flex-1">{m.desc}</p>
                    {done ? (
                      <span className="text-green-400 font-crimson text-sm text-center border border-green-500/50 rounded-lg py-2">✓ Completada</span>
                    ) : (
                      <button
                        onClick={() => { setCurrentMission(m); setPhase('play'); }}
                        className="war-button py-3"
                      >
                        {inPath ? '▶ Jugar (tu ruta)' : '▶ Jugar'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-10">
              {isPathComplete(role) ? (
                <button onClick={() => setPhase('final')} className="war-button text-2xl px-14 py-5 battlefield-glow animate-pulse">
                  🏁 Ver Reporte de Agente y terminar
                </button>
              ) : (
                <p className="text-war-gold/60 font-crimson">
                  Completa tu ruta ({role.icon} {role.name}) para llegar al final de la guerra.
                  Misiones de tu ruta: {role.path.filter((id) => !completed.includes(id)).length} restante(s).
                </p>
              )}
            </div>
          </div>
        )}

        {/* ===== JUGANDO UNA MISIÓN ===== */}
        {phase === 'play' && currentMission && role && (() => {
          const Comp = MISSION_COMPONENTS[currentMission.id];
          if (!Comp) return <p>Misión no disponible.</p>;
          return (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <span className="font-cinzel text-xl text-war-gold">{currentMission.icon} {currentMission.title}</span>
                <button onClick={() => { setCurrentMission(null); setPhase('board'); }} className="text-war-gold/70 hover:text-war-gold font-crimson text-sm">
                  ← Salir de la misión
                </button>
              </div>
              <Comp onComplete={handleCompleteMission} />
            </div>
          );
        })()}

        {/* ===== FINAL: REPORTE DE AGENTE ===== */}
        {phase === 'final' && role && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="bg-war-field/40 border border-war-gold/30 rounded-xl p-8">
              <div className="text-center mb-6">
                <div className="text-5xl mb-2">🪪</div>
                <h2 className="font-cinzel text-3xl font-bold text-war-gold">REPORTE DE AGENTE</h2>
                <p className="text-war-gold/70 font-crimson text-sm mt-1">
                  📋 Muestra este reporte a tu docente (evaluación <b>SABER</b>).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-war-trench/60 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-widest text-war-gold/60">Agente</div>
                  <div className="text-lg font-crimson font-bold text-white truncate">{playerName}</div>
                </div>
                <div className="bg-war-trench/60 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-widest text-war-gold/60">Rol</div>
                  <div className="text-lg font-crimson font-bold">{role.icon} {role.name}</div>
                </div>
                <div className="bg-war-trench/60 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-widest text-war-gold/60">Misiones</div>
                  <div className="text-lg font-crimson font-bold">{completed.length}/6</div>
                </div>
                <div className="bg-war-trench/60 rounded-lg p-3">
                  <div className="text-xs uppercase tracking-widest text-war-gold/60">Resultado</div>
                  <div className="text-lg font-crimson font-bold">{results.filter((r) => r.success).length} victorias</div>
                </div>
              </div>

              {results.length > 0 && (
                <div className="bg-war-trench/60 rounded-lg p-4 mb-4">
                  <div className="text-xs uppercase tracking-widest text-war-gold/60 mb-2">Misiones completadas</div>
                  <div className="space-y-1">
                    {results.map((r) => (
                      <div key={r.missionId} className="flex justify-between text-sm font-crimson border-b border-war-gold/10 pb-1">
                        <span className="text-war-gold/90">{r.label}</span>
                        <span className={r.success ? 'text-green-400' : 'text-red-400'}>
                          {r.success ? '✓ ' : '✗ '}{r.score} pts
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reflexión en Classroom */}
              <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-4 mb-4">
                <div className="font-cinzel font-semibold text-war-gold mb-2">✍️ Reflexión en Google Classroom</div>
                <p className="text-war-gold/70 font-crimson text-sm mb-2">
                  Elige <b>UNA</b> de las experiencias del juego y responde en Classroom (4 puntos · PERIODO 3):
                </p>
                <ol className="text-sm text-war-gold/70 font-crimson list-decimal list-inside mb-3 space-y-1">
                  {REFLECTION_QUESTIONS.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
                <div className="flex flex-col gap-2">
                  {CLASSROOM.map((c) => (
                    <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer"
                      className="w-full bg-war-gold text-war-trench font-bold rounded-lg py-3 text-center transition hover:brightness-110">
                      📚 Abrir {c.label} ▶
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button onClick={startOver} className="war-button text-lg px-8 py-3">
                  🔄 Jugar de nuevo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pie */}
        <footer className="text-center mt-10 text-war-gold/50 font-crimson text-xs border-t border-war-gold/10 pt-4">
          «La Gran Guerra: 1914-1918» — honrando la memoria de quienes sirvieron en el conflicto que cambió el mundo.
        </footer>
      </div>
    </div>
  );
}
