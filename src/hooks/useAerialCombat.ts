
import { useState, useEffect } from 'react';
import { AerialStats, Enemy, GamePhase, ManeuverType } from '../types/aerialCombat';

export const useAerialCombat = () => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('briefing');
  const [playerStats, setPlayerStats] = useState<AerialStats>({
    altitude: 1000,
    fuel: 100,
    ammunition: 50,
    health: 100,
    score: 0
  });
  
  const [enemies, setEnemies] = useState<Enemy[]>([
    { id: 1, name: 'Albatros D.III', position: { x: 20, y: 30 }, health: 100, isActive: true },
    { id: 2, name: 'Fokker Dr.I', position: { x: 70, y: 50 }, health: 100, isActive: true },
    { id: 3, name: 'Pfalz D.III', position: { x: 45, y: 20 }, health: 100, isActive: true }
  ]);

  const [combatLog, setCombatLog] = useState<string[]>([]);
  const [currentAction, setCurrentAction] = useState<string>('');
  const [timeRemaining, setTimeRemaining] = useState(300);

  useEffect(() => {
    if (gamePhase === 'combat' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && gamePhase === 'combat') {
      setGamePhase('defeat');
    }
  }, [gamePhase, timeRemaining]);

  const addToCombatLog = (message: string) => {
    setCombatLog(prev => [message, ...prev.slice(0, 4)]);
  };

  const handleAerialManeuver = (maneuver: ManeuverType) => {
    setCurrentAction(maneuver);
    
    const fuelCost = Math.floor(Math.random() * 10) + 5;
    const newStats = { ...playerStats };
    let allEnemiesDown = false;
    
    switch (maneuver) {
      case 'attack':
        if (newStats.ammunition > 0) {
          newStats.ammunition -= Math.floor(Math.random() * 5) + 3;
          newStats.fuel -= fuelCost;
          
          const activeEnemies = enemies.filter(e => e.isActive);
          if (activeEnemies.length > 0) {
            const targetIndex = Math.floor(Math.random() * activeEnemies.length);
            const target = activeEnemies[targetIndex];
            const damage = Math.floor(Math.random() * 40) + 20;
            
            const updatedEnemies = enemies.map(enemy => 
              enemy.id === target.id 
                ? { ...enemy, health: Math.max(0, enemy.health - damage), isActive: enemy.health - damage > 0 }
                : enemy
            );
            setEnemies(updatedEnemies);
            allEnemiesDown = updatedEnemies.every(e => !e.isActive);
            
            newStats.score += damage;
            addToCombatLog(`¡Impacto directo en ${target.name}! Daño: ${damage}`);
            
            if (target.health - damage <= 0) {
              addToCombatLog(`¡${target.name} derribado! +200 puntos`);
              newStats.score += 200;
            }
          } else {
            allEnemiesDown = true;
            addToCombatLog('No quedan objetivos activos en el cielo.');
          }
        } else {
          addToCombatLog('¡Sin munición! Necesitas recargar.');
        }
        break;
        
      case 'evasive':
        newStats.fuel -= fuelCost;
        newStats.altitude += Math.floor(Math.random() * 100) + 50;
        addToCombatLog('Maniobra evasiva exitosa. Ganaste altitud.');
        
        const enemyDamage = Math.floor(Math.random() * 10) + 5;
        newStats.health = Math.max(0, newStats.health - enemyDamage);
        addToCombatLog(`Recibes ${enemyDamage} de daño por fuego enemigo.`);
        break;
        
      case 'dive':
        newStats.fuel -= fuelCost / 2;
        newStats.altitude -= Math.floor(Math.random() * 150) + 100;
        addToCombatLog('Picada en barrena. Velocidad aumentada.');
        
        const diveDamage = Math.floor(Math.random() * 20) + 15;
        newStats.health = Math.max(0, newStats.health - diveDamage);
        addToCombatLog(`El estrés del picado causa ${diveDamage} de daño.`);
        break;
        
      case 'reload':
        newStats.ammunition = Math.min(50, newStats.ammunition + 20);
        newStats.fuel -= fuelCost / 3;
        addToCombatLog('Munición recargada. Listo para el combate.');
        break;
    }
    
    setPlayerStats(newStats);
    
    const activeEnemiesCount = enemies.filter(e => e.isActive).length;
    if (allEnemiesDown) {
      setGamePhase('victory');
    } else if (newStats.health <= 0 || newStats.fuel <= 0) {
      setGamePhase('defeat');
    }
    
    setTimeout(() => setCurrentAction(''), 1500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startCombat = () => setGamePhase('combat');

  return {
    gamePhase,
    playerStats,
    enemies,
    combatLog,
    currentAction,
    timeRemaining,
    handleAerialManeuver,
    formatTime,
    startCombat
  };
};
