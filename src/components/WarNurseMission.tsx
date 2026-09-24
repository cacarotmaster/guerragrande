
import React from 'react';
import { useWarNurseGame } from '../hooks/useWarNurseGame';
import GameStats from './warNurse/GameStats';
import PatientCard from './warNurse/PatientCard';
import { Heart, Award } from 'lucide-react';

interface WarNurseMissionProps {
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const WarNurseMission: React.FC<WarNurseMissionProps> = ({ onComplete }) => {
  const {
    gameStats,
    patients,
    gamePhase,
    gameStarted,
    startGame,
    treatPatient
  } = useWarNurseGame();

  if (gamePhase === 'intro') {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">⚕️</div>
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-4">
            Ángeles de Misericordia
          </h2>
          <p className="text-xl text-war-gold/70 font-crimson mb-8 max-w-3xl mx-auto">
            Hospital de Campaña - Frente Occidental, 1917
          </p>
        </div>

        <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-6">
            Tu Misión
          </h3>
          <div className="space-y-4 text-war-gold/80 font-crimson">
            <p>
              Como enfermera jefe del hospital de campaña, debes gestionar los recursos médicos limitados 
              y tomar decisiones cruciales para salvar tantas vidas como sea posible.
            </p>
            <p>
              Las oleadas de heridos llegan constantemente desde el frente. Cada decisión cuenta, 
              cada segundo es vital, y cada vida perdida pesa en tu conciencia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-war-field/30 border border-war-gold/20 rounded-lg p-6">
              <h4 className="font-cinzel font-semibold text-war-gold mb-4">Objetivos</h4>
              <ul className="space-y-2 text-war-gold/70 font-crimson text-sm">
                <li>• Salvar al mayor número de pacientes posible</li>
                <li>• Gestionar recursos médicos limitados</li>
                <li>• Mantener el hospital funcionando bajo presión</li>
                <li>• Tomar decisiones éticas difíciles</li>
              </ul>
            </div>

            <div className="bg-war-field/30 border border-war-gold/20 rounded-lg p-6">
              <h4 className="font-cinzel font-semibold text-war-gold mb-4">Recursos Iniciales</h4>
              <div className="grid grid-cols-2 gap-3 text-war-gold/70 font-crimson text-sm">
                <div>Medicina: 10</div>
                <div>Vendas: 15</div>
                <div>Morfina: 5</div>
                <div>Sangre: 8</div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={startGame}
            className="war-button text-xl px-12 py-4 battlefield-glow"
          >
            Comenzar Misión
          </button>
          <p className="text-war-gold/60 font-crimson text-sm mt-3">
            El hospital te necesita, cada vida cuenta
          </p>
        </div>
      </div>
    );
  }

  if (gamePhase === 'completed') {
    const successRate = gameStats.totalPatients > 0 ? 
      Math.round((gameStats.patientsSaved / gameStats.totalPatients) * 100) : 0;

    return (
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-12">
          <div className="text-6xl mb-6">
            {successRate >= 80 ? '🏆' : successRate >= 60 ? '⚕️' : '💔'}
          </div>
          
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-6">
            Misión Completada
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-war-field/30 border border-war-gold/20 rounded-lg p-6">
              <Heart className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-400">{gameStats.patientsSaved}</p>
              <p className="text-war-gold/60 text-sm">Vidas Salvadas</p>
            </div>
            
            <div className="bg-war-field/30 border border-war-gold/20 rounded-lg p-6">
              <Award className="w-8 h-8 text-war-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-war-gold">{successRate}%</p>
              <p className="text-war-gold/60 text-sm">Tasa de Éxito</p>
            </div>
            
            <div className="bg-war-field/30 border border-war-gold/20 rounded-lg p-6">
              <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center text-war-gold text-lg">
                ⚕️
              </div>
              <p className="text-2xl font-bold text-war-gold">{gameStats.totalPatients}</p>
              <p className="text-war-gold/60 text-sm">Total Pacientes</p>
            </div>
          </div>

          <div className="text-war-gold/80 font-crimson mb-6">
            {successRate >= 80 && (
              <p className="text-lg">
                ¡Extraordinario! Tu dedicación y habilidad salvaron muchas vidas. 
                Eres un verdadero ángel de misericordia en este infierno de guerra.
              </p>
            )}
            {successRate >= 60 && successRate < 80 && (
              <p className="text-lg">
                Buen trabajo bajo presión extrema. Aunque no pudiste salvar a todos, 
                tu esfuerzo marcó la diferencia en muchas vidas.
              </p>
            )}
            {successRate < 60 && (
              <p className="text-lg">
                Los horrores de la guerra cobraron su precio. Aunque el resultado fue difícil, 
                tu valor para enfrentar lo imposible es admirable.
              </p>
            )}
          </div>

          <div className="bg-war-gold/10 border border-war-gold/30 rounded-lg p-6">
            <h3 className="font-cinzel font-semibold text-war-gold mb-3">Experiencia Ganada</h3>
            <p className="text-war-gold/70 font-crimson">
              +{Math.max(500, gameStats.patientsSaved * 100)} puntos de experiencia en Medicina de Campo
            </p>
          </div>

          <button
            onClick={() => onComplete?.({ success: true, score: gameStats.patientsSaved, label: 'Hospital de Campaña' })}
            className="war-button text-xl px-10 py-4 battlefield-glow mt-8"
          >
            ✅ Continuar ▶
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-2">
          Hospital de Campaña
        </h2>
        <p className="text-war-gold/70 font-crimson">
          Frente Occidental - Sector de Emergencias
        </p>
      </div>

      <GameStats stats={gameStats} />

      {patients.length > 0 ? (
        <div>
          <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-4">
            Pacientes en Espera ({patients.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onTreat={treatPatient}
                canTreat={
                  gameStats.resources.medicine > 0 || 
                  gameStats.resources.bandages > 0
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">⚕️</div>
          <p className="text-war-gold/70 font-crimson text-lg">
            Preparándose para la siguiente oleada de heridos...
          </p>
        </div>
      )}
    </div>
  );
};

export default WarNurseMission;
