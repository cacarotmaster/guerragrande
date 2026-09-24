
export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil' | 'Extremo';
  duration: string;
  rewards: {
    experience: number;
    items?: string[];
  };
  requirements?: string[];
  status: 'available' | 'locked' | 'completed' | 'in-progress';
  historicalDate: string;
  location: string;
}

export interface MissionBoardProps {
  onMissionSelect: (mission: Mission) => void;
}
