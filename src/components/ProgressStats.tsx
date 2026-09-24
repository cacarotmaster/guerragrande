
import React from 'react';
import { Star, Book, Clock } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  experience: number;
  maxExperience: number;
  description: string;
}

interface ProgressStatsProps {
  skills: Skill[];
  totalMissions: number;
  completedMissions: number;
  totalPlayTime: number;
  currentRank: string;
}

const ProgressStats: React.FC<ProgressStatsProps> = ({
  skills,
  totalMissions,
  completedMissions,
  totalPlayTime,
  currentRank
}) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getProgressPercentage = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  return (
    <div className="bg-gradient-to-br from-war-field/60 to-war-trench/60 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm">
      <h3 className="text-3xl font-cinzel font-bold text-war-gold mb-6 text-center">
        Progreso del Comandante
      </h3>

      {/* Estadísticas generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stat-display text-center">
          <Star className="w-8 h-8 text-war-gold mx-auto mb-2" />
          <p className="text-war-gold/60 font-crimson text-sm">Rango Actual</p>
          <p className="text-war-gold font-cinzel font-semibold text-xl">{currentRank}</p>
        </div>

        <div className="stat-display text-center">
          <Book className="w-8 h-8 text-war-gold mx-auto mb-2" />
          <p className="text-war-gold/60 font-crimson text-sm">Misiones</p>
          <p className="text-war-gold font-cinzel font-semibold text-xl">
            {completedMissions}/{totalMissions}
          </p>
          <div className="progress-bar h-2 w-full mt-2">
            <div 
              className="progress-fill h-full"
              style={{ width: `${getProgressPercentage(completedMissions, totalMissions)}%` }}
            />
          </div>
        </div>

        <div className="stat-display text-center">
          <Clock className="w-8 h-8 text-war-gold mx-auto mb-2" />
          <p className="text-war-gold/60 font-crimson text-sm">Tiempo en Servicio</p>
          <p className="text-war-gold font-cinzel font-semibold text-xl">
            {formatTime(totalPlayTime)}
          </p>
        </div>
      </div>

      {/* Habilidades detalladas */}
      <div className="space-y-6">
        <h4 className="text-2xl font-cinzel font-semibold text-war-gold text-center mb-4">
          Habilidades de Combate
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="bg-war-trench/40 border border-war-gold/10 rounded-lg p-4 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-cinzel font-semibold text-war-gold text-lg">
                  {skill.name}
                </h5>
                <div className="flex items-center space-x-2">
                  <span className="text-war-gold/80 font-crimson text-sm">Nivel</span>
                  <span className="text-war-gold font-cinzel font-bold text-lg">
                    {skill.level}
                  </span>
                </div>
              </div>

              <p className="text-war-gold/70 font-crimson text-sm mb-3 leading-relaxed">
                {skill.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-war-gold/60 font-crimson">Progreso</span>
                  <span className="text-war-gold/80 font-crimson">
                    {skill.experience}/{skill.maxExperience} XP
                  </span>
                </div>
                <div className="progress-bar h-3">
                  <div 
                    className="progress-fill h-full"
                    style={{ width: `${getProgressPercentage(skill.experience, skill.maxExperience)}%` }}
                  />
                </div>
              </div>

              {/* Indicador de mejora próxima */}
              {skill.experience >= skill.maxExperience * 0.8 && (
                <div className="mt-3 text-center">
                  <span className="mission-badge text-xs animate-pulse">
                    ¡Próximo a subir de nivel!
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;
