
export interface Patient {
  id: number;
  name: string;
  condition: string;
  severity: 'critical' | 'serious' | 'stable';
  timeLeft: number;
  location: string;
}

export interface Resource {
  medicine: number;
  bandages: number;
  morphine: number;
  blood: number;
}

export interface GameStats {
  patientsHealed: number;
  patientsSaved: number;
  patientsLost: number;
  totalPatients: number;
  resources: Resource;
  timeRemaining: number;
  currentWave: number;
  stress: number;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  options: ScenarioOption[];
  timeLimit?: number;
}

export interface ScenarioOption {
  id: string;
  text: string;
  consequences: {
    patients?: number;
    resources?: Partial<Resource>;
    stress?: number;
    success?: boolean;
  };
}
