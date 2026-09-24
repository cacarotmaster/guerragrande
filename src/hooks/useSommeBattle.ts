
import { useState, useEffect } from 'react';
import { SurvivalChallenge, SommeGameState } from '../types/sommeBattle';

const challenges: SurvivalChallenge[] = [
  {
    id: 'artillery-barrage',
    type: 'artillery',
    title: 'Bombardeo de Artillería',
    description: 'Los cañones alemanes están bombardeando tu trinchera. El suelo tiembla y los proyectiles caen peligrosamente cerca.',
    options: [
      {
        id: 'bunker',
        text: 'Refugiarse en el búnker',
        icon: '🏠',
        consequences: { health: -5, morale: 5, time: -5 }
      },
      {
        id: 'help-wounded',
        text: 'Ayudar a los heridos',
        icon: '🏥',
        consequences: { health: -15, morale: 15, supplies: -10 }
      },
      {
        id: 'reinforce',
        text: 'Reforzar las defensas',
        icon: '🔨',
        consequences: { health: -10, supplies: -15, time: -3 }
      }
    ],
    timeLimit: 15
  },
  {
    id: 'gas-attack',
    type: 'gas-attack',
    title: 'Ataque de Gas Venenoso',
    description: 'Una nube amarilla se acerca por tierra de nadie. ¡Gas mostaza! Debes actuar rápidamente.',
    options: [
      {
        id: 'mask',
        text: 'Ponerse la máscara de gas',
        icon: '😷',
        consequences: { health: 5, morale: -5 }
      },
      {
        id: 'alert-others',
        text: 'Alertar a otros soldados',
        icon: '📢',
        consequences: { health: -20, morale: 20, supplies: -5 }
      },
      {
        id: 'find-shelter',
        text: 'Buscar refugio elevado',
        icon: '⬆️',
        consequences: { health: -10, time: -10 }
      }
    ],
    timeLimit: 12
  },
  {
    id: 'night-raid',
    type: 'raid',
    title: 'Asalto Nocturno',
    description: 'Los alemanes están atacando tu trinchera bajo la oscuridad. Necesitas defender tu posición.',
    options: [
      {
        id: 'defend',
        text: 'Defender la trinchera',
        icon: '⚔️',
        consequences: { health: -25, morale: 10, supplies: -20 }
      },
      {
        id: 'flanking',
        text: 'Maniobra de flanqueo',
        icon: '🔄',
        consequences: { health: -15, morale: 15, time: -8 }
      },
      {
        id: 'retreat',
        text: 'Retirada táctica',
        icon: '🏃',
        consequences: { health: 5, morale: -20, supplies: 10 }
      }
    ],
    timeLimit: 20
  },
  {
    id: 'trench-foot',
    type: 'weather',
    title: 'Condiciones Insalubres',
    description: 'El barro, la humedad y las ratas están causando enfermedades. Varios soldados muestran síntomas de pie de trinchera.',
    options: [
      {
        id: 'medical-care',
        text: 'Proporcionar cuidados médicos',
        icon: '💊',
        consequences: { health: 10, supplies: -25, morale: 5 }
      },
      {
        id: 'improve-drainage',
        text: 'Mejorar el drenaje',
        icon: '🔧',
        consequences: { health: 5, supplies: -15, time: -12 }
      },
      {
        id: 'ignore',
        text: 'Ignorar y continuar',
        icon: '😤',
        consequences: { health: -30, morale: -15 }
      }
    ],
    timeLimit: 18
  },
  {
    id: 'supply-shortage',
    type: 'supply',
    title: 'Escasez de Suministros',
    description: 'Los suministros se están agotando. No hay suficiente comida ni munición para todos.',
    options: [
      {
        id: 'ration',
        text: 'Racionar los suministros',
        icon: '🍞',
        consequences: { health: -10, morale: -10, supplies: 20 }
      },
      {
        id: 'forage',
        text: 'Buscar en territorio enemigo',
        icon: '🔍',
        consequences: { health: -20, supplies: 30, time: -15 }
      },
      {
        id: 'trade',
        text: 'Intercambiar con otras unidades',
        icon: '🤝',
        consequences: { supplies: 15, morale: 5, time: -5 }
      }
    ],
    timeLimit: 25
  }
];

export const useSommeBattle = () => {
  const [gameState, setGameState] = useState<SommeGameState>({
    gamePhase: 'intro',
    currentDay: 1,
    playerHealth: 100,
    morale: 75,
    supplies: 100,
    timeRemaining: 30,
    currentChallenge: null,
    challengesCompleted: 0,
    gameLog: [],
    isTimerActive: false
  });

  // Timer para el desafío actual
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isTimerActive && gameState.timeRemaining > 0) {
      timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (gameState.timeRemaining <= 0 && gameState.isTimerActive) {
      handleTimeOut();
    }
    return () => clearInterval(timer);
  }, [gameState.isTimerActive, gameState.timeRemaining]);

  // Verificar condiciones de victoria/derrota
  useEffect(() => {
    if (gameState.playerHealth <= 0 || gameState.morale <= 0 || gameState.supplies <= 0) {
      setGameState(prev => ({ ...prev, gamePhase: 'defeat', isTimerActive: false }));
    } else if (gameState.challengesCompleted >= 5 && gameState.currentDay >= 7) {
      setGameState(prev => ({ ...prev, gamePhase: 'victory', isTimerActive: false }));
    }
  }, [gameState.playerHealth, gameState.morale, gameState.supplies, gameState.challengesCompleted, gameState.currentDay]);

  const startMission = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'survival' }));
    startNextChallenge();
  };

  const startNextChallenge = () => {
    if (gameState.challengesCompleted >= challenges.length) {
      setGameState(prev => ({ ...prev, gamePhase: 'victory' }));
      return;
    }

    const nextChallenge = challenges[gameState.challengesCompleted % challenges.length];
    setGameState(prev => ({
      ...prev,
      currentChallenge: nextChallenge,
      timeRemaining: nextChallenge.timeLimit,
      gamePhase: 'challenge',
      isTimerActive: true,
      gameLog: [...prev.gameLog.slice(-2), `Día ${prev.currentDay}: ${nextChallenge.title}`]
    }));
  };

  const handleChallengeAction = (optionId: string) => {
    if (!gameState.currentChallenge) return;

    const selectedOption = gameState.currentChallenge.options.find(opt => opt.id === optionId);
    if (!selectedOption) return;

    const consequences = selectedOption.consequences;
    
    setGameState(prev => {
      const newState = { ...prev, isTimerActive: false };
      
      // Aplicar consecuencias
      if (consequences.health) {
        newState.playerHealth = Math.max(0, Math.min(100, prev.playerHealth + consequences.health));
      }
      if (consequences.morale) {
        newState.morale = Math.max(0, Math.min(100, prev.morale + consequences.morale));
      }
      if (consequences.supplies) {
        newState.supplies = Math.max(0, Math.min(100, prev.supplies + consequences.supplies));
      }

      newState.challengesCompleted = prev.challengesCompleted + 1;
      
      // Log de la acción
      const actionResult = `${selectedOption.text} - ${getActionResultText(consequences)}`;
      newState.gameLog = [...prev.gameLog.slice(-2), actionResult];

      // Avanzar día cada 2 desafíos
      if ((prev.challengesCompleted + 1) % 2 === 0) {
        newState.currentDay = prev.currentDay + 1;
      }

      return newState;
    });

    // Continuar con el siguiente desafío después de un breve delay
    setTimeout(() => {
      startNextChallenge();
    }, 2500);
  };

  const handleTimeOut = () => {
    if (!gameState.currentChallenge) return;

    setGameState(prev => ({
      ...prev,
      isTimerActive: false,
      playerHealth: Math.max(0, prev.playerHealth - 20),
      morale: Math.max(0, prev.morale - 15),
      gameLog: [...prev.gameLog.slice(-2), '¡Tiempo agotado! Decisión forzada con consecuencias negativas.'],
      challengesCompleted: prev.challengesCompleted + 1
    }));
    
    setTimeout(() => {
      startNextChallenge();
    }, 2000);
  };

  const getActionResultText = (consequences: any) => {
    const effects = [];
    if (consequences.health > 0) effects.push('+Salud');
    if (consequences.health < 0) effects.push('-Salud');
    if (consequences.morale > 0) effects.push('+Moral');
    if (consequences.morale < 0) effects.push('-Moral');
    if (consequences.supplies > 0) effects.push('+Suministros');
    if (consequences.supplies < 0) effects.push('-Suministros');
    return effects.join(', ') || 'Sin cambios';
  };

  const resetMission = () => {
    setGameState({
      gamePhase: 'intro',
      currentDay: 1,
      playerHealth: 100,
      morale: 75,
      supplies: 100,
      timeRemaining: 30,
      currentChallenge: null,
      challengesCompleted: 0,
      gameLog: [],
      isTimerActive: false
    });
  };

  const getStatusColor = (value: number, type: 'health' | 'morale' | 'supplies') => {
    if (value >= 70) return 'text-green-400';
    if (value >= 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  return {
    gameState,
    startMission,
    handleChallengeAction,
    resetMission,
    getStatusColor,
    getActionResultText
  };
};
