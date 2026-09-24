
import React from 'react';
import { Heart, Shield, Zap, Clock } from 'lucide-react';

interface GameStatusBarProps {
  currentDay: number;
  timeRemaining: number;
  playerHealth: number;
  morale: number;
  supplies: number;
  getStatusColor: (value: number, type: 'health' | 'morale' | 'supplies') => string;
}

const GameStatusBar: React.FC<GameStatusBarProps> = ({
  currentDay,
  timeRemaining,
  playerHealth,
  morale,
  supplies,
  getStatusColor
}) => {
  return (
    <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-war-gold font-cinzel font-semibold">
          Día {currentDay} - Trincheras del Somme
        </div>
        <div className="flex items-center space-x-2 text-war-gold/70">
          <Clock className="w-4 h-4" />
          <span className={`font-crimson ${timeRemaining <= 5 ? 'text-red-400 animate-pulse' : ''}`}>
            {timeRemaining}s
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Heart className="w-4 h-4 text-red-400" />
          <span className={`font-crimson ${getStatusColor(playerHealth, 'health')}`}>
            Salud: {playerHealth}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-blue-400" />
          <span className={`font-crimson ${getStatusColor(morale, 'morale')}`}>
            Moral: {morale}%
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className={`font-crimson ${getStatusColor(supplies, 'supplies')}`}>
            Suministros: {supplies}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default GameStatusBar;
