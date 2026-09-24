
import React from 'react';
import { Heart, Clock, AlertTriangle, Package } from 'lucide-react';
import { GameStats as GameStatsType } from '../../types/warNurse';

interface GameStatsProps {
  stats: GameStatsType;
}

const GameStats: React.FC<GameStatsProps> = ({ stats }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStressColor = (stress: number) => {
    if (stress < 30) return 'text-green-400';
    if (stress < 60) return 'text-yellow-400';
    if (stress < 80) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Time */}
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-war-gold" />
          <div>
            <p className="text-war-gold/60 text-xs">Tiempo</p>
            <p className="text-war-gold font-bold">{formatTime(stats.timeRemaining)}</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-green-400" />
          <div>
            <p className="text-war-gold/60 text-xs">Pacientes</p>
            <p className="text-war-gold font-bold">
              {stats.patientsSaved}/{stats.totalPatients}
            </p>
          </div>
        </div>

        {/* Stress */}
        <div className="flex items-center space-x-2">
          <AlertTriangle className={`w-5 h-5 ${getStressColor(stats.stress)}`} />
          <div>
            <p className="text-war-gold/60 text-xs">Estrés</p>
            <p className={`font-bold ${getStressColor(stats.stress)}`}>
              {stats.stress}%
            </p>
          </div>
        </div>

        {/* Resources */}
        <div className="flex items-center space-x-2">
          <Package className="w-5 h-5 text-blue-400" />
          <div>
            <p className="text-war-gold/60 text-xs">Recursos</p>
            <div className="text-xs text-war-gold">
              M:{stats.resources.medicine} V:{stats.resources.bandages}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
