
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SurvivalChallenge } from '../../types/sommeBattle';

interface ChallengeDisplayProps {
  challenge: SurvivalChallenge;
  onAction: (optionId: string) => void;
  getActionResultText: (consequences: any) => string;
  gameLog: string[];
}

const ChallengeDisplay: React.FC<ChallengeDisplayProps> = ({
  challenge,
  onAction,
  getActionResultText,
  gameLog
}) => {
  return (
    <>
      <div className="bg-gradient-to-br from-war-field/60 to-war-trench/60 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm mb-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-2xl font-cinzel font-bold text-war-gold">
              {challenge.title}
            </h3>
          </div>
          <p className="text-war-gold/80 font-crimson text-lg leading-relaxed">
            {challenge.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {challenge.options.map((option) => (
            <button
              key={option.id}
              onClick={() => onAction(option.id)}
              className="bg-war-trench/40 border border-war-gold/30 rounded-lg p-4 hover:border-war-gold hover:bg-war-trench/60 transition-all duration-200 text-left"
            >
              <div className="text-center mb-3">
                <span className="text-3xl mb-2 block">{option.icon}</span>
              </div>
              <div className="text-war-gold font-cinzel font-semibold mb-2 text-center">
                {option.text}
              </div>
              <div className="text-war-gold/70 font-crimson text-xs text-center">
                {getActionResultText(option.consequences)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Game Log */}
      {gameLog.length > 0 && (
        <div className="bg-war-trench/40 border border-war-gold/20 rounded-lg p-4">
          <h4 className="text-war-gold font-cinzel font-semibold mb-3">Registro de Batalla</h4>
          <div className="space-y-2">
            {gameLog.map((log, index) => (
              <div key={index} className="text-war-gold/70 font-crimson text-sm">
                • {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeDisplay;
