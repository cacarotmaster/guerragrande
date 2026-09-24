
import { useState, useEffect, useCallback } from 'react';
import { Patient, Resource, GameStats, Scenario } from '../types/warNurse';

const initialResources: Resource = {
  medicine: 10,
  bandages: 15,
  morphine: 5,
  blood: 8
};

const initialStats: GameStats = {
  patientsHealed: 0,
  patientsSaved: 0,
  patientsLost: 0,
  totalPatients: 0,
  resources: initialResources,
  timeRemaining: 100,
  currentWave: 1,
  stress: 0
};

export const useWarNurseGame = () => {
  const [gameStats, setGameStats] = useState<GameStats>(initialStats);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'scenario' | 'completed'>('intro');
  const [gameStarted, setGameStarted] = useState(false);

  const generatePatients = useCallback((wave: number) => {
    const patientCount = Math.min(3 + wave, 8);
    const newPatients: Patient[] = [];

    const names = ['Henri Dubois', 'Pierre Martin', 'Jacques Moreau', 'Antoine Rousseau', 'Louis Bernard'];
    const conditions = ['Herida de bala', 'Quemaduras por gas', 'Fractura múltiple', 'Herida de metralla', 'Shock de guerra'];

    for (let i = 0; i < patientCount; i++) {
      const severity: 'critical' | 'serious' | 'stable' = 
        Math.random() < 0.3 ? 'critical' : 
        Math.random() < 0.6 ? 'serious' : 'stable';

      newPatients.push({
        id: Date.now() + i,
        name: names[Math.floor(Math.random() * names.length)],
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        severity,
        timeLeft: severity === 'critical' ? 60 : severity === 'serious' ? 120 : 180,
        location: `Sector ${String.fromCharCode(65 + i)}`
      });
    }

    return newPatients;
  }, []);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGamePhase('playing');
    const initialPatients = generatePatients(1);
    setPatients(initialPatients);
    setGameStats(prev => ({ ...prev, totalPatients: initialPatients.length }));
  }, [generatePatients]);

  const treatPatient = useCallback((patientId: number, treatment: 'medicine' | 'bandages' | 'morphine' | 'blood') => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    
    setGameStats(prev => ({
      ...prev,
      patientsHealed: prev.patientsHealed + 1,
      patientsSaved: prev.patientsSaved + 1,
      resources: {
        ...prev.resources,
        [treatment]: Math.max(0, prev.resources[treatment] - 1)
      }
    }));
  }, []);

  const handleScenarioChoice = useCallback((choice: any) => {
    const consequences = choice.consequences;
    
    setGameStats(prev => ({
      ...prev,
      stress: Math.min(100, prev.stress + (consequences.stress || 0)),
      resources: {
        ...prev.resources,
        ...consequences.resources
      }
    }));

    setGamePhase('playing');
    setCurrentScenario(null);
  }, []);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gamePhase !== 'playing') return;

    const timer = setInterval(() => {
      setGameStats(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1)
      }));

      // Update patient conditions
      setPatients(prev => prev.map(patient => {
        const newTimeLeft = patient.timeLeft - 1;
        if (newTimeLeft <= 0) {
          setGameStats(current => ({
            ...current,
            patientsLost: current.patientsLost + 1
          }));
          return null;
        }
        return { ...patient, timeLeft: newTimeLeft };
      }).filter(Boolean) as Patient[]);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gamePhase]);

  // Cuando el tiempo llega a 0 se completa la misión
  useEffect(() => {
    if (gamePhase === 'playing' && gameStats.timeRemaining === 0) {
      setGamePhase('completed');
    }
  }, [gameStats.timeRemaining, gamePhase]);

  // Nueva oleada cuando no quedan pacientes (evita que el hospital se quede 'congelado')
  useEffect(() => {
    if (gamePhase !== 'playing' || !gameStarted) return;
    if (patients.length === 0) {
      const t = setTimeout(() => {
        const nextWave = gameStats.currentWave + 1;
        const np = generatePatients(nextWave);
        setPatients(np);
        setGameStats(prev => ({
          ...prev,
          currentWave: nextWave,
          totalPatients: prev.totalPatients + np.length
        }));
      }, 3500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients.length, gamePhase, gameStarted]);

  return {
    gameStats,
    patients,
    currentScenario,
    gamePhase,
    gameStarted,
    startGame,
    treatPatient,
    handleScenarioChoice,
    setGamePhase,
    setCurrentScenario
  };
};
