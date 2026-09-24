
import React from 'react';

interface MissionActionButtonProps {
  selectedMission: string | null;
  onStartMission: () => void;
}

const MissionActionButton: React.FC<MissionActionButtonProps> = ({ 
  selectedMission, 
  onStartMission 
}) => {
  if (!selectedMission) return null;

  return (
    <div className="text-center mt-12 animate-fade-in">
      <button
        onClick={onStartMission}
        className="war-button text-xl px-12 py-4 battlefield-glow"
      >
        Iniciar Misión
      </button>
      <p className="text-war-gold/60 font-crimson text-sm mt-3">
        El destino de la guerra está en tus manos
      </p>
    </div>
  );
};

export default MissionActionButton;
