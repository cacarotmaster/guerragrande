
import React from 'react';
import { Eye, Clock, BookOpen } from 'lucide-react';
import { PlayerStats } from '../../types/espionage';

interface StatusPanelProps {
  playerStats: PlayerStats;
  formatTime: (seconds: number) => string;
  phase: string;
  showCodesCounter?: boolean;
}

const StatusPanel: React.FC<StatusPanelProps> = ({ 
  playerStats, 
  formatTime, 
  phase,
  showCodesCounter = false 
}) => {
  return (
    <div className="flex justify-between items-center mb-8 p-4 bg-slate-700/30 rounded-lg border border-war-gold/20">
      <div className="flex items-center space-x-6">
        <div className="flex items-center">
          <Eye className="w-5 h-5 text-blue-400 mr-2" />
          <span className="text-war-gold font-crimson">Sigilo: {playerStats.stealth}%</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 text-orange-400 mr-2" />
          <span className="text-war-gold font-crimson">Tiempo: {formatTime(playerStats.time)}</span>
        </div>
        {showCodesCounter && (
          <div className="flex items-center">
            <BookOpen className="w-5 h-5 text-green-400 mr-2" />
            <span className="text-war-gold font-crimson">Códigos: {playerStats.codesDeciphered}/3</span>
          </div>
        )}
      </div>
      <div className="text-war-gold/70 font-crimson text-sm">
        Fase: {phase}
      </div>
    </div>
  );
};

export default StatusPanel;
