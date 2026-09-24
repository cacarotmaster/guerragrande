
import React from 'react';
import { Star } from 'lucide-react';
import { GamePhase, AerialStats } from '../../types/aerialCombat';

interface GameEndScreensProps {
  gamePhase: GamePhase;
  playerStats: AerialStats;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const GameEndScreens = ({ gamePhase, playerStats, timeRemaining, formatTime, onComplete }: GameEndScreensProps) => {
  if (gamePhase === 'victory') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-green-900/80 to-blue-900/80 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm text-center animate-fade-in">
          <div className="text-8xl mb-6">🏆</div>
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-4">
            ¡Victoria Aérea!
          </h2>
          <p className="text-xl text-war-gold/80 font-crimson mb-6">
            Has demostrado ser un verdadero as de la aviación. Todos los enemigos han sido derribados.
          </p>
          
          <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-cinzel text-war-gold mb-4">Estadísticas Finales</h3>
            <div className="grid grid-cols-2 gap-4 text-war-gold/70 font-crimson">
              <div>• Puntuación Final: <strong>{playerStats.score}</strong></div>
              <div>• Combustible Restante: <strong>{playerStats.fuel}%</strong></div>
              <div>• Integridad Final: <strong>{playerStats.health}%</strong></div>
              <div>• Tiempo Usado: <strong>{formatTime(300 - timeRemaining)}</strong></div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-war-gold font-cinzel text-lg">
              Recompensas Obtenidas:
            </div>
            <div className="flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-war-gold" />
                <span className="text-war-gold font-crimson">1500 XP</span>
              </div>
              <div className="text-war-gold/70 font-crimson">
                + Alas de Piloto, Gafas de Aviador, Hélice Conmemorativa
              </div>
            </div>
          </div>

          <button
            onClick={() => onComplete?.({ success: true, score: playerStats.score, label: 'Combate Aéreo' })}
            className="war-button text-xl px-10 py-4 battlefield-glow"
          >
            ✅ Continuar ▶
          </button>
        </div>
      </div>
    );
  }

  if (gamePhase === 'defeat') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-red-900/80 to-gray-900/80 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm text-center animate-fade-in">
          <div className="text-8xl mb-6">💥</div>
          <h2 className="text-4xl font-cinzel font-bold text-red-400 mb-4">
            Aeronave Derribada
          </h2>
          <p className="text-xl text-war-gold/80 font-crimson mb-6">
            {playerStats.health <= 0 
              ? "Tu aeronave ha sufrido daños críticos y se ha estrellado."
              : playerStats.fuel <= 0 
                ? "Te has quedado sin combustible y has tenido que realizar un aterrizaje forzoso."
                : "El tiempo se ha agotado y los enemigos mantienen el control del espacio aéreo."
            }
          </p>
          
          <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-cinzel text-war-gold mb-4">Informe Final</h3>
            <div className="text-war-gold/70 font-crimson">
              <p>Aunque la misión no fue exitosa, tu valor en combate será recordado.</p>
              <p className="mt-2">Puntuación obtenida: <strong>{playerStats.score}</strong></p>
            </div>
          </div>

          <p className="text-war-gold/60 font-crimson italic">
            "No hay vergüenza en caer cuando se lucha con honor en los cielos."
          </p>

          <button
            onClick={() => onComplete?.({ success: false, score: playerStats.score, label: 'Combate Aéreo' })}
            className="war-button text-xl px-10 py-4 battlefield-glow mt-6"
          >
            ✅ Continuar ▶
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GameEndScreens;
