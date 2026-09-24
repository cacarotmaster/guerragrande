
export interface CodeChallenge {
  id: string;
  type: 'cipher' | 'pattern' | 'coordinates';
  question: string;
  code: string;
  answer: string;
  hint: string;
  difficulty: number;
}

export interface SpyObjective {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export interface PlayerStats {
  stealth: number;
  intelligence: number;
  time: number;
  codesDeciphered: number;
  cover: string;
}

export type GamePhase = 'briefing' | 'infiltration' | 'decoding' | 'extraction' | 'complete';
export type InfiltrationChoice = 'stealth' | 'distraction' | 'disguise';
export type ExtractionChoice = 'plans' | 'device' | 'escape';
