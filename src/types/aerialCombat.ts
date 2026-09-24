
export interface AerialStats {
  altitude: number;
  fuel: number;
  ammunition: number;
  health: number;
  score: number;
}

export interface Enemy {
  id: number;
  name: string;
  position: { x: number; y: number };
  health: number;
  isActive: boolean;
}

export type GamePhase = 'briefing' | 'combat' | 'victory' | 'defeat';

export type ManeuverType = 'attack' | 'evasive' | 'dive' | 'reload';
