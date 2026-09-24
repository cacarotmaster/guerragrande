
import React from 'react';
import { Heart, Shield, Zap } from 'lucide-react';

interface MissionIntroProps {
  onStartMission: () => void;
}

const MissionIntro: React.FC<MissionIntroProps> = ({ onStartMission }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-war-field/60 to-war-trench/60 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            Sobreviviendo a la Trinchera: Batalla de Somme
          </h2>
          <div className="text-war-gold/60 font-crimson text-sm mb-6">
            1 de Julio, 1916 - Río Somme, Francia
          </div>
        </div>

        <div className="mb-8">
          <p className="text-war-gold/80 font-crimson text-lg leading-relaxed mb-6">
            Estás en las trincheras del Somme, una de las batallas más sangrientas de la Gran Guerra. 
            Tu objetivo es sobrevivir 7 días en estas condiciones infernales, enfrentando bombardeos, 
            ataques de gas, asaltos nocturnos y las terribles condiciones de vida en las trincheras.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-war-gold font-cinzel font-semibold">Salud</span>
              </div>
              <p className="text-war-gold/70 font-crimson text-sm">
                Mantén tu salud física para sobrevivir a los peligros.
              </p>
            </div>
            
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-war-gold font-cinzel font-semibold">Moral</span>
              </div>
              <p className="text-war-gold/70 font-crimson text-sm">
                La moral del escuadrón afecta la efectividad en combate.
              </p>
            </div>
            
            <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-war-gold font-cinzel font-semibold">Suministros</span>
              </div>
              <p className="text-war-gold/70 font-crimson text-sm">
                Administra comida, munición y suministros médicos.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartMission}
            className="war-button text-xl px-8 py-3 battlefield-glow"
          >
            Entrar a las Trincheras
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionIntro;
