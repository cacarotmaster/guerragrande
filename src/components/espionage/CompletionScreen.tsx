
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { PlayerStats, SpyObjective } from '../../types/espionage';

interface CompletionScreenProps {
  playerStats: PlayerStats;
  objectives: SpyObjective[];
  formatTime: (seconds: number) => string;
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({
  playerStats,
  objectives,
  formatTime,
  onComplete
}) => {
  const completedRequiredObjectives = objectives.filter(obj => obj.required && obj.completed).length;
  const totalRequiredObjectives = objectives.filter(obj => obj.required).length;
  const success = completedRequiredObjectives === totalRequiredObjectives;
  const totalObjectivesCompleted = objectives.filter(obj => obj.completed).length;
  const score = playerStats.codesDeciphered * 100 + playerStats.stealth;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-war-gold/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in text-center">
        <div className="text-8xl mb-6">
          {success ? '🎯' : '💥'}
        </div>
        
        <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-6">
          {success ? '¡Misión Exitosa!' : '¡Misión Comprometida!'}
        </h2>
        
        <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-4">
            Reporte de Misión
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-cinzel text-war-gold mb-3">Estadísticas Finales</h4>
              <div className="space-y-2 text-war-gold/70 font-crimson">
                <div>Sigilo Final: {playerStats.stealth}%</div>
                <div>Inteligencia: {playerStats.intelligence}%</div>
                <div>Códigos Descifrados: {playerStats.codesDeciphered}</div>
                <div>Tiempo Restante: {formatTime(playerStats.time)}</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-cinzel text-war-gold mb-3">Objetivos Completados</h4>
              <div className="space-y-2">
                {objectives.map((objective) => (
                  <div key={objective.id} className="flex items-center justify-between text-sm">
                    <span className={`font-crimson ${objective.completed ? 'text-green-400' : 'text-red-400'}`}>
                      {objective.title}
                    </span>
                    {objective.completed ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <div className="w-4 h-4 text-red-400">✗</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-war-gold/80 font-crimson">
            <p className="mb-4">
              {success 
                ? `Excelente trabajo, agente. Has completado ${totalObjectivesCompleted} de ${objectives.length} objetivos y has obtenido información crucial para el esfuerzo de guerra. Tus habilidades de decodificación han sido excepcionales.`
                : `La misión ha sido comprometida, pero has logrado completar ${totalObjectivesCompleted} de ${objectives.length} objetivos. Aunque no fue un éxito total, la información obtenida será valiosa para futuras operaciones.`
              }
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-war-gold font-cinzel text-xl">
            {success ? '🏆 Rango: Espía Maestro' : '📊 Rango: Agente en Entrenamiento'}
          </div>
          
          <p className="text-war-gold/60 font-crimson text-sm">
            "En las sombras de la guerra, la información es el arma más poderosa"
          </p>
        </div>

        <button
          onClick={() => onComplete?.({ success: true, score, label: 'Espionaje' })}
          className="war-button text-xl px-10 py-4 battlefield-glow mt-8"
        >
          ✅ Continuar ▶
        </button>
      </div>
    </div>
  );
};

export default CompletionScreen;
