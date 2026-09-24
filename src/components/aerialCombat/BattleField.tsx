
import React from 'react';
import { Enemy } from '../../types/aerialCombat';

interface BattleFieldProps {
  enemies: Enemy[];
  currentAction: string;
}

const BattleField = ({ enemies, currentAction }: BattleFieldProps) => {
  return (
    <div className="bg-gradient-to-b from-sky-300/20 to-green-800/20 border border-war-gold/30 rounded-lg p-8 mb-6 min-h-64 relative">
      <h3 className="text-2xl font-cinzel text-war-gold mb-4 text-center">
        Espacio Aéreo sobre Flandes
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              enemy.isActive 
                ? 'bg-red-900/60 border-red-400/50' 
                : 'bg-gray-800/60 border-gray-600/50 opacity-50'
            }`}
          >
            <div className="text-center">
              <div className="text-3xl mb-2">
                {enemy.isActive ? '🛩️' : '💥'}
              </div>
              <div className="font-cinzel text-sm text-war-gold mb-1">
                {enemy.name}
              </div>
              <div className="w-full bg-war-trench/50 rounded-full h-2">
                <div 
                  className="bg-red-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${enemy.health}%` }}
                />
              </div>
              <div className="text-xs text-war-gold/60 mt-1">
                {enemy.isActive ? `${enemy.health}%` : 'Derribado'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentAction && (
        <div className="text-center animate-fade-in">
          <div className="inline-block bg-war-gold/90 text-war-trench px-6 py-2 rounded-full font-cinzel font-bold">
            {currentAction}
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleField;
