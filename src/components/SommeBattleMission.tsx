
import React from 'react';
import { useSommeBattle } from '../hooks/useSommeBattle';
import MissionIntro from './sommeBattle/MissionIntro';
import GameStatusBar from './sommeBattle/GameStatusBar';
import ChallengeDisplay from './sommeBattle/ChallengeDisplay';
import GameEndScreens from './sommeBattle/GameEndScreens';

interface SommeBattleMissionProps {
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const SommeBattleMission = ({ onComplete }: SommeBattleMissionProps) => {
  const {
    gameState,
    startMission,
    handleChallengeAction,
    resetMission,
    getStatusColor,
    getActionResultText
  } = useSommeBattle();

  if (gameState.gamePhase === 'intro') {
    return <MissionIntro onStartMission={startMission} />;
  }

  if (gameState.gamePhase === 'challenge' && gameState.currentChallenge) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <GameStatusBar
          currentDay={gameState.currentDay}
          timeRemaining={gameState.timeRemaining}
          playerHealth={gameState.playerHealth}
          morale={gameState.morale}
          supplies={gameState.supplies}
          getStatusColor={getStatusColor}
        />
        
        <ChallengeDisplay
          challenge={gameState.currentChallenge}
          onAction={handleChallengeAction}
          getActionResultText={getActionResultText}
          gameLog={gameState.gameLog}
        />
      </div>
    );
  }

  if (gameState.gamePhase === 'victory' || gameState.gamePhase === 'defeat') {
    return (
      <GameEndScreens
        gamePhase={gameState.gamePhase}
        currentDay={gameState.currentDay}
        playerHealth={gameState.playerHealth}
        morale={gameState.morale}
        challengesCompleted={gameState.challengesCompleted}
        onReset={resetMission}
        onComplete={onComplete}
      />
    );
  }

  return null;
};

export default SommeBattleMission;
