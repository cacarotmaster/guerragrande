
import React from 'react';
import InfantryMission from './InfantryMission';
import SarajevoMission from './SarajevoMission';
import SommeBattleMission from './SommeBattleMission';
import AerialCombatMission from './AerialCombatMission';
import EspionageMission from './EspionageMission';
import WarNurseMission from './WarNurseMission';
import MissionHeader from './missionBoard/MissionHeader';
import MissionCard from './missionBoard/MissionCard';
import MissionActionButton from './missionBoard/MissionActionButton';
import { useMissionBoard } from '../hooks/useMissionBoard';
import { MissionBoardProps } from '../types/mission';

const MissionBoard: React.FC<MissionBoardProps> = ({ onMissionSelect }) => {
  const {
    missions,
    selectedMission,
    playingMission,
    handleMissionClick,
    handleStartMission,
    handleBackToMissions
  } = useMissionBoard();

  if (playingMission === 'infantry-mission') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <InfantryMission />
      </div>
    );
  }

  if (playingMission === 'sarajevo-1914') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <SarajevoMission />
      </div>
    );
  }

  if (playingMission === 'somme-battle') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <SommeBattleMission />
      </div>
    );
  }

  if (playingMission === 'aerial-combat') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <AerialCombatMission />
      </div>
    );
  }

  if (playingMission === 'espionage-mission') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <EspionageMission />
      </div>
    );
  }

  if (playingMission === 'war-nurse-mission') {
    return (
      <div>
        <div className="mb-4 p-4 bg-war-trench/60 border border-war-gold/30 rounded-lg">
          <button
            onClick={handleBackToMissions}
            className="text-war-gold/70 hover:text-war-gold font-crimson text-sm transition-colors duration-200"
          >
            ← Volver al Tablón de Misiones
          </button>
        </div>
        <WarNurseMission />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <MissionHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {missions.map((mission, index) => (
          <MissionCard
            key={mission.id}
            mission={mission}
            index={index}
            isSelected={selectedMission === mission.id}
            onMissionClick={handleMissionClick}
          />
        ))}
      </div>

      <MissionActionButton
        selectedMission={selectedMission}
        onStartMission={handleStartMission}
      />
    </div>
  );
};

export default MissionBoard;
