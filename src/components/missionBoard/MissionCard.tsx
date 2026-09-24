
import React from 'react';
import { Clock, Star, Calendar } from 'lucide-react';
import { Mission } from '../../types/mission';

interface MissionCardProps {
  mission: Mission;
  index: number;
  isSelected: boolean;
  onMissionClick: (mission: Mission) => void;
}

const MissionCard: React.FC<MissionCardProps> = ({ 
  mission, 
  index, 
  isSelected, 
  onMissionClick 
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'Medio': return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'Difícil': return 'text-orange-400 border-orange-400/30 bg-orange-400/10';
      case 'Extremo': return 'text-red-400 border-red-400/30 bg-red-400/10';
      default: return 'text-war-gold border-war-gold/30 bg-war-gold/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400';
      case 'locked': return 'text-red-400';
      case 'completed': return 'text-war-gold';
      case 'in-progress': return 'text-blue-400';
      default: return 'text-war-gold/60';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'locked': return 'Bloqueada';
      case 'completed': return 'Completada';
      case 'in-progress': return 'En Progreso';
      default: return 'Desconocida';
    }
  };

  return (
    <div
      className={`role-card animate-fade-in ${
        mission.status === 'locked' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${
        isSelected ? 'border-war-gold shadow-lg shadow-war-gold/30 scale-105' : ''
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onMissionClick(mission)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-2 leading-tight">
            {mission.title}
          </h3>
          <div className="flex items-center space-x-3 mb-2">
            <span className={`mission-badge ${getDifficultyColor(mission.difficulty)}`}>
              {mission.difficulty}
            </span>
            <span className={`mission-badge ${getStatusColor(mission.status)}`}>
              {getStatusText(mission.status)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 mb-4 text-war-gold/60 text-sm">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span className="font-crimson">{mission.historicalDate}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="font-crimson">{mission.duration}</span>
        </div>
      </div>

      <p className="text-war-gold/80 font-crimson text-sm mb-4 leading-relaxed">
        {mission.description}
      </p>

      <p className="text-war-gold/60 font-crimson text-sm mb-4">
        <strong>Ubicación:</strong> {mission.location}
      </p>

      {mission.requirements && (
        <div className="mb-4">
          <p className="text-war-gold/60 font-crimson text-sm mb-2">Requisitos:</p>
          <ul className="space-y-1">
            {mission.requirements.map((req, idx) => (
              <li key={idx} className="text-war-gold/70 font-crimson text-xs">
                • {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="border-t border-war-gold/20 pt-4">
        <p className="text-war-gold/60 font-crimson text-sm mb-2">Recompensas:</p>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-war-gold" />
            <span className="text-war-gold font-crimson text-sm">
              {mission.rewards.experience} XP
            </span>
          </div>
          {mission.rewards.items && (
            <div className="text-war-gold/70 font-crimson text-xs">
              +{mission.rewards.items.length} objetos
            </div>
          )}
        </div>
      </div>

      {isSelected && mission.status === 'available' && (
        <div className="mt-4 text-center">
          <div className="w-full h-1 bg-war-gold rounded-full animate-pulse" />
          <p className="text-war-gold font-cinzel text-sm mt-2">
            ¡Misión Seleccionada!
          </p>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
