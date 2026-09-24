
import React from 'react';
import { Search, CheckCircle } from 'lucide-react';
import { CodeChallenge, SpyObjective, PlayerStats } from '../../types/espionage';
import StatusPanel from './StatusPanel';

interface DecodingPhaseProps {
  currentChallenge: CodeChallenge;
  challengeIndex: number;
  totalChallenges: number;
  playerAnswer: string;
  showHint: boolean;
  playerStats: PlayerStats;
  objectives: SpyObjective[];
  formatTime: (seconds: number) => string;
  onAnswerChange: (answer: string) => void;
  onSubmitAnswer: () => void;
  onToggleHint: () => void;
}

const DecodingPhase: React.FC<DecodingPhaseProps> = ({
  currentChallenge,
  challengeIndex,
  totalChallenges,
  playerAnswer,
  showHint,
  playerStats,
  objectives,
  formatTime,
  onAnswerChange,
  onSubmitAnswer,
  onToggleHint
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-war-gold/30 rounded-xl p-8 backdrop-blur-sm animate-fade-in">
        <StatusPanel 
          playerStats={playerStats} 
          formatTime={formatTime} 
          phase="Decodificación"
          showCodesCounter={true}
        />

        <div className="text-center mb-8">
          <h3 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            Decodificando Mensaje Secreto
          </h3>
          <p className="text-war-gold/80 font-crimson text-lg mb-2">
            Has encontrado un mensaje interceptado. Debes decodificarlo antes de ser descubierto.
          </p>
          <div className="text-war-gold/60 font-crimson text-sm">
            Desafío {challengeIndex + 1} de {totalChallenges} | Dificultad: {'★'.repeat(currentChallenge.difficulty)}
          </div>
        </div>

        <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-6 mb-6">
          <h4 className="text-xl font-cinzel font-semibold text-war-gold mb-4">
            {currentChallenge.question}
          </h4>
          <div className="bg-slate-800/50 border border-war-gold/30 rounded-lg p-4 mb-4 font-mono text-center">
            <div className="text-2xl text-war-gold tracking-wide">
              {currentChallenge.code}
            </div>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              value={playerAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder="Ingresa tu respuesta..."
              className="flex-1 bg-slate-800/50 border border-war-gold/30 rounded-lg px-4 py-2 text-war-gold font-crimson placeholder-war-gold/50 focus:outline-none focus:border-war-gold"
              onKeyPress={(e) => e.key === 'Enter' && onSubmitAnswer()}
            />
            <button
              onClick={onSubmitAnswer}
              className="bg-war-gold/20 hover:bg-war-gold/30 border border-war-gold/50 text-war-gold px-6 py-2 rounded-lg transition-colors duration-200 font-crimson"
            >
              Enviar
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onToggleHint}
              className="flex items-center text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
            >
              <Search className="w-4 h-4 mr-2" />
              {showHint ? 'Ocultar Pista' : 'Mostrar Pista'}
            </button>
            {showHint && (
              <div className="text-war-gold/60 font-crimson text-sm italic">
                💡 {currentChallenge.hint}
              </div>
            )}
          </div>
        </div>

        {/* Objetivos Progress */}
        <div className="bg-slate-700/30 border border-war-gold/20 rounded-lg p-4">
          <h4 className="text-lg font-cinzel font-semibold text-war-gold mb-3">Progreso de Objetivos</h4>
          <div className="space-y-2">
            {objectives.slice(0, 2).map((objective) => (
              <div key={objective.id} className="flex items-center justify-between">
                <span className="text-war-gold/70 font-crimson text-sm">{objective.title}</span>
                <div className="flex items-center">
                  {objective.completed ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <div className="w-4 h-4 border border-war-gold/30 rounded-full" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecodingPhase;
