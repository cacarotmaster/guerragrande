
import React from 'react';
import { useAerialCombat } from '../hooks/useAerialCombat';
import MissionBriefing from './aerialCombat/MissionBriefing';
import StatsPanel from './aerialCombat/StatsPanel';
import BattleField from './aerialCombat/BattleField';
import ControlPanel from './aerialCombat/ControlPanel';
import GameEndScreens from './aerialCombat/GameEndScreens';

interface AerialCombatMissionProps {
  onComplete?: (result: { success: boolean; score: number; label: string }) => void;
}

const AerialCombatMission = ({ onComplete }: AerialCombatMissionProps) => {
  const {
    gamePhase,
    playerStats,
    enemies,
    combatLog,
    currentAction,
    timeRemaining,
    handleAerialManeuver,
    formatTime,
    startCombat
  } = useAerialCombat();

  if (gamePhase === 'briefing') {
    return <MissionBriefing onStartCombat={startCombat} />;
  }

  if (gamePhase === 'combat') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-br from-sky-800/80 to-blue-900/80 border border-war-gold/20 rounded-xl p-6 backdrop-blur-sm">
          <StatsPanel 
            playerStats={playerStats}
            timeRemaining={timeRemaining}
            formatTime={formatTime}
          />
          
          <BattleField 
            enemies={enemies}
            currentAction={currentAction}
          />
          
          <ControlPanel
            onManeuver={handleAerialManeuver}
            ammunition={playerStats.ammunition}
            combatLog={combatLog}
          />
        </div>
      </div>
    );
  }

  if (gamePhase === 'victory' || gamePhase === 'defeat') {
    return (
      <GameEndScreens
        gamePhase={gamePhase}
        playerStats={playerStats}
        timeRemaining={timeRemaining}
        formatTime={formatTime}
        onComplete={onComplete}
      />
    );
  }

  return null;
};

export default AerialCombatMission;
