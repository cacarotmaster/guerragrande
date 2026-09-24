
import React from 'react';
import { BookOpen, Target, Shield } from 'lucide-react';
import { SpyObjective } from '../../types/espionage';

interface MissionBriefingProps {
  objectives: SpyObjective[];
  onStartInfiltration: () => void;
}

const MissionBriefing: React.FC<MissionBriefingProps> = ({ objectives, onStartInfiltration }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-war-gold/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🕵️</div>
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-4">
            Los Secretos del Espionaje
          </h2>
          <p className="text-xl text-war-gold/70 font-crimson">
            Decodificando Enigmas - Misión de Inteligencia
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-6">
            <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-3" />
              Briefing de Misión
            </h3>
            <p className="text-war-gold/80 font-crimson text-lg leading-relaxed mb-4">
              El alto mando ha interceptado comunicaciones enemigas que sugieren un ataque inminente. 
              Tu misión es infiltrarte en el cuartel general enemigo, decodificar sus mensajes secretos 
              y obtener información crucial sobre sus planes.
            </p>
            <p className="text-war-gold/70 font-crimson">
              <strong>Fecha:</strong> 15 de Septiembre, 1917<br />
              <strong>Ubicación:</strong> Territorio Enemigo, Sector 7<br />
              <strong>Tiempo Límite:</strong> 60 minutos antes del cambio de guardia
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-6">
              <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Objetivos de Misión
              </h4>
              <ul className="space-y-2">
                {objectives.map((objective) => (
                  <li key={objective.id} className="text-war-gold/70 font-crimson text-sm flex items-start">
                    <span className="text-war-gold mr-2">
                      {objective.required ? '●' : '○'}
                    </span>
                    <div>
                      <strong className={objective.required ? 'text-orange-400' : 'text-blue-400'}>
                        {objective.title}
                      </strong>
                      <br />
                      <span className="text-xs">{objective.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-6">
              <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Equipo de Espía
              </h4>
              <ul className="space-y-2 text-war-gold/70 font-crimson text-sm">
                <li>🔍 Lupa de decodificación</li>
                <li>📷 Cámara miniatura</li>
                <li>🎧 Dispositivo de escucha</li>
                <li>📚 Libro de códigos básico</li>
                <li>🥸 Kit de disfraces</li>
                <li>💊 Píldora de cianuro (emergencia)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartInfiltration}
            className="war-button text-xl px-12 py-4 battlefield-glow"
          >
            Iniciar Infiltración
          </button>
          <p className="text-war-gold/60 font-crimson text-sm mt-3">
            El destino de la operación está en tus manos, agente
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefing;
