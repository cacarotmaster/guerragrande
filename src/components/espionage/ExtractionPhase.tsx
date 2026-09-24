
import React from 'react';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { ExtractionChoice, PlayerStats, SpyObjective } from '../../types/espionage';
import StatusPanel from './StatusPanel';

interface ExtractionPhaseProps {
  playerStats: PlayerStats;
  objectives: SpyObjective[];
  formatTime: (seconds: number) => string;
  onExtractionChoice: (choice: ExtractionChoice) => void;
}

const ExtractionPhase: React.FC<ExtractionPhaseProps> = ({
  playerStats,
  objectives,
  formatTime,
  onExtractionChoice
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-war-gold/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
        <StatusPanel 
          playerStats={playerStats} 
          formatTime={formatTime} 
          phase="Extracción" 
        />

        <div className="text-center mb-8">
          <h3 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            Misión Final
          </h3>
          <p className="text-war-gold/80 font-crimson text-lg mb-6">
            Has decodificado exitosamente los mensajes enemigos. Ahora debes completar los objetivos finales 
            antes de escapar. ¿Qué harás primero?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => onExtractionChoice('plans')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
            disabled={objectives.find(obj => obj.id === 'steal-plans')?.completed}
          >
            <div className="text-4xl mb-4">📋</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Robar Planes de Batalla
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Fotografía los documentos estratégicos enemigos en el despacho del comandante.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-red-400">-20% Sigilo</div>
              <div className="text-green-400">+Información Crítica</div>
            </div>
          </button>

          <button
            onClick={() => onExtractionChoice('device')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
            disabled={objectives.find(obj => obj.id === 'plant-device')?.completed}
          >
            <div className="text-4xl mb-4">🎧</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Instalar Dispositivo
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Coloca un micrófono en la sala de comunicaciones para futuras operaciones.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-red-400">-15% Sigilo</div>
              <div className="text-blue-400">+Vigilancia Continua</div>
            </div>
          </button>

          <button
            onClick={() => onExtractionChoice('escape')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">🏃</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Escapar Inmediatamente
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Abandona la base enemiga antes de que aumenten las patrullas.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-green-400">Seguridad Garantizada</div>
              <div className="text-yellow-400">Misión Completada</div>
            </div>
          </button>
        </div>

        {/* Objetivos Progress */}
        <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-4">
          <h4 className="text-lg font-cinzel font-semibold text-war-gold mb-3">Estado de la Misión</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {objectives.map((objective) => (
              <div key={objective.id} className="flex items-center justify-between">
                <span className={`font-crimson text-sm ${objective.completed ? 'text-green-400' : 'text-war-gold/70'}`}>
                  {objective.title}
                </span>
                <div className="flex items-center">
                  {objective.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : objective.required ? (
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                  ) : (
                    <div className="w-4 h-4 border border-war-gold/30 rounded-full" />
                  )}  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractionPhase;
