
import React from 'react';
import { useEspionageGame } from '../hooks/useEspionageGame';
import MissionBriefing from './espionage/MissionBriefing';
import InfiltrationPhase from './espionage/InfiltrationPhase';
import DecodingPhase from './espionage/DecodingPhase';
import ExtractionPhase from './espionage/ExtractionPhase';
import CompletionScreen from './espionage/CompletionScreen';

interface EspionageMissionProps {
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const EspionageMission: React.FC<EspionageMissionProps> = ({ onComplete }) => {
  const {
    gamePhase,
    playerStats,
    currentChallenge,
    playerAnswer,
    showHint,
    objectives,
    availableChallenges,
    challengeIndex,
    formatTime,
    startInfiltration,
    handleInfiltrationChoice,
    submitAnswer,
    handleExtraction,
    setPlayerAnswer,
    setShowHint
  } = useEspionageGame();

  if (gamePhase === 'briefing') {
    return (
      <MissionBriefing 
        objectives={objectives}
        onStartInfiltration={startInfiltration}
      />
    );
  }

  if (gamePhase === 'infiltration') {
    return (
      <InfiltrationPhase
        playerStats={playerStats}
        formatTime={formatTime}
        onInfiltrationChoice={handleInfiltrationChoice}
      />
    );
  }

  if (gamePhase === 'decoding' && currentChallenge) {
    return (
      <DecodingPhase
        currentChallenge={currentChallenge}
        challengeIndex={challengeIndex}
        totalChallenges={availableChallenges.length}
        playerAnswer={playerAnswer}
        showHint={showHint}
        playerStats={playerStats}
        objectives={objectives}
        formatTime={formatTime}
        onAnswerChange={setPlayerAnswer}
        onSubmitAnswer={submitAnswer}
        onToggleHint={() => setShowHint(!showHint)}
      />
    );
  }

  if (gamePhase === 'extraction') {
    return (
      <ExtractionPhase
        playerStats={playerStats}
        objectives={objectives}
        formatTime={formatTime}
        onExtractionChoice={handleExtraction}
      />
    );
  }

  if (gamePhase === 'complete') {
    return (
      <CompletionScreen
        playerStats={playerStats}
        objectives={objectives}
        formatTime={formatTime}
        onComplete={onComplete}
      />
    );
  }

  return null;
};

export default EspionageMission;
