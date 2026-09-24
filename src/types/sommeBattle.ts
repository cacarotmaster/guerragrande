
export interface SurvivalChallenge {
  id: string;
  type: 'artillery' | 'gas-attack' | 'raid' | 'weather' | 'supply';
  title: string;
  description: string;
  options: ChallengeOption[];
  timeLimit: number;
}

export interface ChallengeOption {
  id: string;
  text: string;
  icon: string;
  consequences: {
    health?: number;
    morale?: number;
    supplies?: number;
    time?: number;
  };
}

export interface SommeGameState {
  gamePhase: 'intro' | 'survival' | 'challenge' | 'victory' | 'defeat';
  currentDay: number;
  playerHealth: number;
  morale: number;
  supplies: number;
  timeRemaining: number;
  currentChallenge: SurvivalChallenge | null;
  challengesCompleted: number;
  gameLog: string[];
  isTimerActive: boolean;
}
