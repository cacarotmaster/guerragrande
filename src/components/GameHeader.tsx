
import React from 'react';
import { Star, Clock, Calendar } from 'lucide-react';

interface GameHeaderProps {
  playerName?: string;
  currentLevel: number;
  experience: number;
  lives: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({ 
  playerName = "Soldado", 
  currentLevel, 
  experience, 
  lives 
}) => {
  return (
    <header className="relative bg-gradient-to-r from-war-trench via-war-field to-war-trench border-b-2 border-war-gold/30 p-6 smoke-effect">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Título del juego */}
          <div className="flex-1">
            <h1 className="text-4xl font-cinzel font-bold text-war-gold mb-2 animate-fade-in">
              LA GRAN GUERRA
            </h1>
            <p className="text-war-gold/70 font-crimson text-lg">1914 - 1918</p>
          </div>

          {/* Estadísticas del jugador */}
          <div className="flex items-center space-x-8">
            {/* Nombre del jugador */}
            <div className="text-center">
              <p className="text-war-gold/60 text-sm font-crimson">Comandante</p>
              <p className="text-war-gold font-cinzel font-semibold text-lg">{playerName}</p>
            </div>

            {/* Nivel */}
            <div className="text-center">
              <p className="text-war-gold/60 text-sm font-crimson">Rango</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-war-gold" />
                <span className="text-war-gold font-cinzel font-semibold text-lg">{currentLevel}</span>
              </div>
            </div>

            {/* Experiencia */}
            <div className="text-center min-w-[120px]">
              <p className="text-war-gold/60 text-sm font-crimson mb-1">Experiencia</p>
              <div className="progress-bar h-3 w-full">
                <div 
                  className="progress-fill h-full"
                  style={{ width: `${Math.min((experience % 1000) / 10, 100)}%` }}
                />
              </div>
              <p className="text-war-gold/80 text-xs mt-1">{experience} XP</p>
            </div>

            {/* Vidas */}
            <div className="text-center">
              <p className="text-war-gold/60 text-sm font-crimson">Vidas</p>
              <div className="flex items-center justify-center space-x-1 mt-1">
                {Array.from({ length: lives }, (_, i) => (
                  <div key={i} className="w-3 h-3 bg-red-500 rounded-full shadow-sm" />
                ))}
                {Array.from({ length: Math.max(0, 5 - lives) }, (_, i) => (
                  <div key={i + lives} className="w-3 h-3 bg-war-smoke/30 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fecha histórica */}
        <div className="mt-4 flex items-center space-x-2 text-war-gold/60">
          <Calendar className="w-4 h-4" />
          <span className="font-crimson text-sm">28 de Junio, 1914 - Sarajevo</span>
          <Clock className="w-4 h-4 ml-4" />
          <span className="font-crimson text-sm">El conflicto comienza...</span>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;
