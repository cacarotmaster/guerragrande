
import React from 'react';
import { InfiltrationChoice, PlayerStats } from '../../types/espionage';
import StatusPanel from './StatusPanel';

interface InfiltrationPhaseProps {
  playerStats: PlayerStats;
  formatTime: (seconds: number) => string;
  onInfiltrationChoice: (choice: InfiltrationChoice) => void;
}

const InfiltrationPhase: React.FC<InfiltrationPhaseProps> = ({ 
  playerStats, 
  formatTime, 
  onInfiltrationChoice 
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-war-gold/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
        <StatusPanel 
          playerStats={playerStats} 
          formatTime={formatTime} 
          phase="Infiltración" 
        />

        <div className="text-center mb-8">
          <h3 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            Infiltrando el Cuartel General
          </h3>
          <p className="text-war-gold/80 font-crimson text-lg mb-6">
            Te acercas al edificio enemigo bajo la cobertura de la noche. Observas tres posibles rutas de entrada:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => onInfiltrationChoice('stealth')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">🌙</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Infiltración Sigilosa
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Escala la pared trasera y entra por una ventana del segundo piso.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-red-400">-10% Sigilo</div>
              <div className="text-orange-400">-5 minutos</div>
            </div>
          </button>

          <button
            onClick={() => onInfiltrationChoice('distraction')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">💥</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Crear Distracción
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Provoca una pequeña explosión en el almacén para distraer a los guardias.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-red-400">-25% Sigilo</div>
              <div className="text-green-400">-3 minutos</div>
            </div>
          </button>

          <button
            onClick={() => onInfiltrationChoice('disguise')}
            className="bg-slate-700/40 hover:bg-slate-600/40 border border-war-gold/30 rounded-lg p-6 transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">🎭</div>
            <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
              Usar Disfraz
            </h4>
            <p className="text-war-gold/70 font-crimson text-sm mb-4">
              Disfrázate como un soldado enemigo y entra por la puerta principal.
            </p>
            <div className="text-xs text-war-gold/60">
              <div className="text-green-400">-5% Sigilo</div>
              <div className="text-red-400">-10 minutos</div>
            </div>
          </button>
        </div>

        <div className="text-center text-war-gold/60 font-crimson text-sm">
          Elige sabiamente: cada decisión afectará tu capacidad de completar la misión
        </div>
      </div>
    </div>
  );
};

export default InfiltrationPhase;
