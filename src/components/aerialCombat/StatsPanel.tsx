
import React from 'react';
import { Plane, Target, Heart, Clock } from 'lucide-react';
import { AerialStats } from '../../types/aerialCombat';

interface StatsPanelProps {
  playerStats: AerialStats;
  timeRemaining: number;
  formatTime: (seconds: number) => string;
}

const StatsPanel = ({ playerStats, timeRemaining, formatTime }: StatsPanelProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div className="stat-display text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Plane className="w-5 h-5 text-blue-400" />
          <span className="font-cinzel text-blue-400">Altitud</span>
        </div>
        <div className="text-xl font-bold text-war-gold">{playerStats.altitude}m</div>
      </div>
      
      <div className="stat-display text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-5 h-5 bg-orange-400 rounded-full"></div>
          <span className="font-cinzel text-orange-400">Combustible</span>
        </div>
        <div className="text-xl font-bold text-war-gold">{playerStats.fuel}%</div>
      </div>
      
      <div className="stat-display text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Target className="w-5 h-5 text-red-400" />
          <span className="font-cinzel text-red-400">Munición</span>
        </div>
        <div className="text-xl font-bold text-war-gold">{playerStats.ammunition}</div>
      </div>
      
      <div className="stat-display text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Heart className="w-5 h-5 text-green-400" />
          <span className="font-cinzel text-green-400">Integridad</span>
        </div>
        <div className="text-xl font-bold text-war-gold">{playerStats.health}%</div>
      </div>
      
      <div className="stat-display text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Clock className="w-5 h-5 text-yellow-400" />
          <span className="font-cinzel text-yellow-400">Tiempo</span>
        </div>
        <div className="text-xl font-bold text-war-gold">{formatTime(timeRemaining)}</div>
      </div>
    </div>
  );
};

export default StatsPanel;
