
import { useState, useEffect } from 'react';
import { CodeChallenge, SpyObjective, PlayerStats, GamePhase, InfiltrationChoice, ExtractionChoice } from '../types/espionage';

export const useEspionageGame = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('briefing');
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    stealth: 100,
    intelligence: 85,
    time: 3600, // 60 minutos en segundos
    codesDeciphered: 0,
    cover: 'intact'
  });
  
  const [currentChallenge, setCurrentChallenge] = useState<CodeChallenge | null>(null);
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [objectives, setObjectives] = useState<SpyObjective[]>([
    {
      id: 'infiltrate-hq',
      title: 'Infiltrar el Cuartel General Enemigo',
      description: 'Accede sin ser detectado al edificio de comando enemigo',
      completed: false,
      required: true
    },
    {
      id: 'decode-cipher',
      title: 'Decodificar Mensajes Secretos',
      description: 'Descifra al menos 3 códigos enemigos interceptados',
      completed: false,
      required: true
    },
    {
      id: 'steal-plans',
      title: 'Obtener Planes de Batalla',
      description: 'Localiza y fotografía los planes estratégicos enemigos',
      completed: false,
      required: true
    },
    {
      id: 'plant-device',
      title: 'Instalar Dispositivo de Escucha',
      description: 'Coloca un micrófono en la sala de comunicaciones',
      completed: false,
      required: false
    }
  ]);

  const codeChallenges: CodeChallenge[] = [
    {
      id: 'caesar-1',
      type: 'cipher',
      question: 'Descifra este mensaje usando el cifrado César (desplazamiento +3):',
      code: 'DWDTXH DO DPPDQHFHU',
      answer: 'ATAQUE AL AMANECER',
      hint: 'Cada letra está desplazada 3 posiciones hacia adelante en el alfabeto',
      difficulty: 1
    },
    {
      id: 'coordinates-1',
      type: 'coordinates',
      question: 'Estas coordenadas marcan la ubicación de un arsenal secreto:',
      code: '4.15.20.18.5.14.3.8.5.18.1.19',
      answer: 'DETRENCHES',
      hint: 'Cada número corresponde a la posición de una letra en el alfabeto',
      difficulty: 2
    },
    {
      id: 'pattern-1',
      type: 'pattern',
      question: 'Completa el patrón de esta secuencia de números de códigos enemigos:',
      code: '2, 4, 8, 16, ?, 64',
      answer: '32',
      hint: 'Cada número es el doble del anterior',
      difficulty: 1
    },
    {
      id: 'cipher-2',
      type: 'cipher',
      question: 'Mensaje interceptado en código Morse convertido a texto:',
      code: '--- .--. . .-. .- - .. --- -.   -. --- -.-. - ..- .-. -. .-',
      answer: 'OPERACION NOCTURNA',
      hint: 'Este es código Morse: --- = O, .--. = P, . = E, etc.',
      difficulty: 3
    }
  ];

  const [availableChallenges] = useState(codeChallenges);

  // Timer effect
  useEffect(() => {
    if (gamePhase === 'infiltration' || gamePhase === 'decoding' || gamePhase === 'extraction') {
      const timer = setInterval(() => {
        setPlayerStats(prev => {
          if (prev.time <= 0) {
            setGamePhase('complete');
            return prev;
          }
          return { ...prev, time: prev.time - 1 };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gamePhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startInfiltration = () => {
    setGamePhase('infiltration');
  };

  const handleInfiltrationChoice = (choice: InfiltrationChoice) => {
    let stealthChange = 0;
    let timeChange = 0;

    switch (choice) {
      case 'stealth':
        stealthChange = -10;
        timeChange = -300; // 5 minutos
        break;
      case 'distraction':
        stealthChange = -25;
        timeChange = -180; // 3 minutos
        break;
      case 'disguise':
        stealthChange = -5;
        timeChange = -600; // 10 minutos
        break;
    }

    setPlayerStats(prev => ({
      ...prev,
      stealth: Math.max(0, prev.stealth + stealthChange),
      time: Math.max(0, prev.time + timeChange)
    }));

    // Completar primer objetivo
    setObjectives(prev => prev.map(obj => 
      obj.id === 'infiltrate-hq' ? { ...obj, completed: true } : obj
    ));

    setGamePhase('decoding');
    setCurrentChallenge(availableChallenges[0]);
  };

  const submitAnswer = () => {
    if (!currentChallenge) return;

    const isCorrect = playerAnswer.toUpperCase().trim() === currentChallenge.answer.toUpperCase();
    
    if (isCorrect) {
      setPlayerStats(prev => ({
        ...prev,
        codesDeciphered: prev.codesDeciphered + 1,
        intelligence: Math.min(100, prev.intelligence + 5)
      }));

      // Si ha decodificado 3 códigos, completar objetivo
      if (playerStats.codesDeciphered + 1 >= 3) {
        setObjectives(prev => prev.map(obj => 
          obj.id === 'decode-cipher' ? { ...obj, completed: true } : obj
        ));
      }

      // Avanzar al siguiente desafío o fase
      if (challengeIndex < availableChallenges.length - 1) {
        setChallengeIndex(challengeIndex + 1);
        setCurrentChallenge(availableChallenges[challengeIndex + 1]);
        setPlayerAnswer('');
        setShowHint(false);
      } else {
        setGamePhase('extraction');
      }
    } else {
      setPlayerStats(prev => ({
        ...prev,
        stealth: Math.max(0, prev.stealth - 15),
        intelligence: Math.max(0, prev.intelligence - 3)
      }));
    }
    
    setPlayerAnswer('');
  };

  const handleExtraction = (choice: ExtractionChoice) => {
    switch (choice) {
      case 'plans':
        setObjectives(prev => prev.map(obj => 
          obj.id === 'steal-plans' ? { ...obj, completed: true } : obj
        ));
        setPlayerStats(prev => ({ ...prev, stealth: prev.stealth - 20 }));
        break;
      case 'device':
        setObjectives(prev => prev.map(obj => 
          obj.id === 'plant-device' ? { ...obj, completed: true } : obj
        ));
        setPlayerStats(prev => ({ ...prev, stealth: prev.stealth - 15 }));
        break;
      case 'escape':
        setGamePhase('complete');
        break;
    }
  };

  return {
    gamePhase,
    playerStats,
    currentChallenge,
    playerAnswer,
    showHint,
    objectives,
    availableChallenges,
    challengeIndex,
    formatTime,
    startInfiltration,
    handleInfiltrationChoice,
    submitAnswer,
    handleExtraction,
    setPlayerAnswer,
    setShowHint
  };
};
