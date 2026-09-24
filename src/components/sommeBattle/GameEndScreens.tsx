
import React from 'react';

interface GameEndScreensProps {
  gamePhase: 'victory' | 'defeat';
  currentDay: number;
  playerHealth: number;
  morale: number;
  challengesCompleted: number;
  onReset: () => void;
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const GameEndScreens: React.FC<GameEndScreensProps> = ({
  gamePhase,
  currentDay,
  playerHealth,
  morale,
  challengesCompleted,
  onReset,
  onComplete
}) => {
  const score = challengesCompleted * 100;
  if (gamePhase === 'victory') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-br from-green-900/60 to-war-trench/60 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm text-center">
          <div className="text-6xl mb-6">🏆</div>
          <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            ¡Victoria! Has Sobrevivido a la Batalla de Somme
          </h2>
          
          <p className="text-war-gold/80 font-crimson text-lg leading-relaxed mb-6">
            Después de {currentDay} días en las trincheras más peligrosas de la guerra, 
            has demostrado valor, liderazgo y la capacidad de tomar decisiones difíciles 
            bajo presión extrema. Tu escuadrón ha sobrevivido gracias a tu liderazgo.
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="text-2xl font-cinzel font-bold text-green-400">{playerHealth}%</div>
              <div className="text-war-gold/70 font-crimson text-sm">Salud Final</div>
            </div>
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="text-2xl font-cinzel font-bold text-blue-400">{morale}%</div>
              <div className="text-war-gold/70 font-crimson text-sm">Moral Final</div>
            </div>
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="text-2xl font-cinzel font-bold text-yellow-400">{challengesCompleted}</div>
              <div className="text-war-gold/70 font-crimson text-sm">Desafíos Superados</div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="war-button text-xl px-8 py-3 battlefield-glow"
          >
            Jugar Nuevamente
          </button>

          <div className="mt-4">
            <button
              onClick={() => onComplete?.({ success: true, score, label: 'Batalla de Somme' })}
              className="war-button text-xl px-10 py-4 battlefield-glow"
            >
              ✅ Continuar ▶
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-red-900/60 to-war-trench/60 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm text-center">
        <div className="text-6xl mb-6">💀</div>
        <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
          Misión Fallida
        </h2>
        
        <p className="text-war-gold/80 font-crimson text-lg leading-relaxed mb-6">
          Las duras condiciones de la Batalla de Somme han cobrado su precio. 
          Sin salud, moral o suministros suficientes, no pudiste mantener a tu escuadrón. 
          La Gran Guerra no perdona, pero cada batalla es una lección aprendida.
        </p>

        <div className="mb-8">
          <div className="text-war-gold/60 font-crimson text-base">
            Sobreviviste {currentDay} días y completaste {challengesCompleted} desafíos.
          </div>
        </div>

        <button
          onClick={onReset}
          className="war-button text-xl px-8 py-3 battlefield-glow"
        >
          Intentar Nuevamente
        </button>

        <div className="mt-4">
          <button
            onClick={() => onComplete?.({ success: false, score, label: 'Batalla de Somme' })}
            className="war-button text-xl px-10 py-4 battlefield-glow"
          >
            ✅ Continuar ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameEndScreens;
