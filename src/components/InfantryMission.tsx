import React, { useState, useEffect } from 'react';
import { Shield, Target, Heart, AlertTriangle, Clock, Star, Crosshair } from 'lucide-react';

interface MissionObjective {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface SquadMember {
  id: string;
  name: string;
  role: string;
  health: number;
  morale: number;
  status: 'active' | 'injured' | 'kia';
}

export interface MissionResult {
  success: boolean;
  score: number;
  label: string;
}

interface InfantryMissionProps {
  onComplete?: (result: MissionResult) => void;
}

const InfantryMission: React.FC<InfantryMissionProps> = ({ onComplete }) => {
  const [missionPhase, setMissionPhase] = useState<'briefing' | 'deployment' | 'combat' | 'aftermath'>('briefing');
  const [playerHealth, setPlayerHealth] = useState(100);
  const [ammo, setAmmo] = useState(120);
  const [morale, setMorale] = useState(85);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [missionScore, setMissionScore] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [decisionMade, setDecisionMade] = useState(false);
  const [decisionResult, setDecisionResult] = useState<string | null>(null);
  const [combatEvents, setCombatEvents] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);
  const [combatLog, setCombatLog] = useState<string[]>([]);

  const [objectives, setObjectives] = useState<MissionObjective[]>([
    {
      id: 'secure-trench',
      title: 'Asegurar la Trinchera Avanzada',
      description: 'Tomar control de la trinchera enemiga en el sector 7',
      completed: false,
      required: true
    },
    {
      id: 'rescue-wounded',
      title: 'Rescatar Heridos',
      description: 'Evacuar al menos 3 soldados heridos a zona segura',
      completed: false,
      required: true
    },
    {
      id: 'intel-gather',
      title: 'Recopilar Inteligencia',
      description: 'Encontrar documentos estratégicos enemigos',
      completed: false,
      required: false
    },
    {
      id: 'maintain-position',
      title: 'Mantener Posición',
      description: 'Defender la posición por 15 minutos',
      completed: false,
      required: true
    }
  ]);

  const [squad, setSquad] = useState<SquadMember[]>([
    { id: '1', name: 'Cabo Martinez', role: 'Líder de Escuadrón', health: 90, morale: 80, status: 'active' },
    { id: '2', name: 'Soldado García', role: 'Fusilero', health: 85, morale: 75, status: 'active' },
    { id: '3', name: 'Soldado López', role: 'Granadas', health: 70, morale: 85, status: 'active' },
    { id: '4', name: 'Soldado Pérez', role: 'Médico', health: 95, morale: 90, status: 'active' }
  ]);

  // Simulación de tiempo de misión
  useEffect(() => {
    if (missionPhase === 'combat') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
        
        // Auto-completar objetivos después de cierto tiempo
        if (timeElapsed > 30 && !objectives.find(obj => obj.id === 'maintain-position')?.completed) {
          completeObjective('maintain-position');
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [missionPhase, timeElapsed]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const completeObjective = (objectiveId: string) => {
    console.log(`Completando objetivo: ${objectiveId}`);
    setObjectives(prev => prev.map(obj => 
      obj.id === objectiveId ? { ...obj, completed: true } : obj
    ));
    setMissionScore(prev => prev + 200);
    console.log(`Objetivo completado: ${objectiveId}`);
  };

  const handleDecisionSelection = (decision: string) => {
    setSelectedDecision(decision);
  };

  const executeDecision = () => {
    if (!selectedDecision) return;
    
    setDecisionMade(true);
    
    // Aplicar consecuencias de la decisión
    if (selectedDecision === 'charge-trench') {
      const success = Math.random() > 0.3;
      if (success) {
        setMissionScore(prev => prev + 500);
        setMorale(prev => Math.min(prev + 15, 100));
        // Completar el objetivo inmediatamente
        completeObjective('secure-trench');
        setDecisionResult('¡Carga exitosa! La trinchera ha sido asegurada. Tu escuadrón ha tomado control de las posiciones enemigas.');
      } else {
        setPlayerHealth(prev => Math.max(prev - 25, 0));
        setMorale(prev => Math.max(prev - 10, 0));
        // Completar el objetivo aunque sea con bajas
        completeObjective('secure-trench');
        setDecisionResult('La carga encontró resistencia feroz pero fue exitosa. El escuadrón ha sufrido bajas pero ha asegurado la trinchera.');
      }
    } else if (selectedDecision === 'flank-maneuver') {
      setMissionScore(prev => prev + 300);
      setMorale(prev => Math.min(prev + 5, 100));
      setAmmo(prev => Math.max(prev - 20, 0));
      // Completar ambos objetivos con la maniobra
      completeObjective('secure-trench');
      completeObjective('intel-gather');
      setDecisionResult('Maniobra de flanqueo ejecutada con éxito. El escuadrón ha rodeado las posiciones enemigas, asegurado la trinchera y obtenido inteligencia valiosa.');
    }
    
    // Transición automática a combate después de 3 segundos
    setTimeout(() => {
      console.log('Transicionando a fase de combate...');
      setMissionPhase('combat');
    }, 3000);
  };

  const handleCombatAction = (action: string) => {
    console.log(`Ejecutando acción de combate: ${action}`);
    
    const newCount = combatEvents + 1;
    setCombatEvents(newCount);
    
    let actionMessage = '';
    
    switch (action) {
      case 'shoot':
        setAmmo(prev => Math.max(prev - 10, 0));
        setMissionScore(prev => prev + 50);
        actionMessage = '¡Disparos certeros! El enemigo retrocede.';
        
        // Completar objetivo de rescate después de algunos disparos
        if (newCount >= 2 && !objectives.find(obj => obj.id === 'rescue-wounded')?.completed) {
          completeObjective('rescue-wounded');
          actionMessage += ' ¡Has rescatado a los heridos!';
        }
        break;
        
      case 'take-cover':
        setPlayerHealth(prev => Math.min(prev + 5, 100));
        actionMessage = 'Te refugias exitosamente. Salud recuperada.';
        break;
        
      case 'lead':
        setMorale(prev => Math.min(prev + 10, 100));
        setMissionScore(prev => prev + 75);
        actionMessage = '¡Tu liderazgo inspira al escuadrón!';
        break;
    }
    
    // Agregar mensaje al log de combate
    setCombatLog(prev => [...prev.slice(-2), actionMessage]);
    
    // Verificar si la misión debe completarse usando el conteo actualizado
    setTimeout(() => {
      setObjectives(currentObjectives => {
        const completedRequired = currentObjectives.filter(obj => obj.required && obj.completed).length;
        const totalRequired = currentObjectives.filter(obj => obj.required).length;
        
        console.log(`Objetivos completados: ${completedRequired}/${totalRequired}, Eventos: ${newCount}`);
        
        if (completedRequired >= totalRequired && newCount >= 3) {
          setMissionComplete(true);
          setMissionPhase('aftermath');
        }
        
        return currentObjectives;
      });
    }, 100);
  };

  const getHealthColor = (health: number) => {
    if (health > 70) return 'text-green-400';
    if (health > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMoraleColor = (morale: number) => {
    if (morale > 70) return 'text-blue-400';
    if (morale > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (missionPhase === 'briefing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-war-trench via-war-field to-war-trench p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header de la misión */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-cinzel font-bold text-war-gold mb-4">
              MISIÓN: SOLDADO DE INFANTERÍA
            </h1>
            <div className="flex items-center justify-center space-x-4 text-war-gold/70">
              <span className="font-crimson">📍 Trincheras del Somme</span>
              <span className="font-crimson">📅 1 de Julio, 1916</span>
              <span className="font-crimson">⏰ 05:30 hrs</span>
            </div>
          </div>

          {/* Briefing estratégico */}
          <div className="bg-war-trench/60 border border-war-gold/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
            <h2 className="text-3xl font-cinzel font-semibold text-war-gold mb-6 flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              Briefing Estratégico
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Situación Actual</h3>
                <p className="text-war-gold/80 font-crimson leading-relaxed mb-4">
                  Las fuerzas enemigas han establecido una línea defensiva fuerte en el sector 7. 
                  Nuestras tropas han sufrido bajas considerables en los últimos ataques. 
                  Tu escuadrón debe tomar la trinchera avanzada y establecer una cabeza de puente 
                  para el próximo avance general.
                </p>
                
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Inteligencia</h3>
                <ul className="text-war-gold/70 font-crimson text-sm space-y-1">
                  <li>• Resistencia enemiga: Moderada a fuerte</li>
                  <li>• Ametralladoras: 2-3 nidos confirmados</li>
                  <li>• Alambrada: Parcialmente destruida</li>
                  <li>• Apoyo de artillería: Limitado</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Tu Escuadrón</h3>
                <div className="space-y-3">
                  {squad.map(member => (
                    <div key={member.id} className="bg-war-field/40 p-3 rounded border border-war-gold/20">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-war-gold font-crimson font-semibold">{member.name}</p>
                          <p className="text-war-gold/60 text-sm">{member.role}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm ${getHealthColor(member.health)}`}>
                            Salud: {member.health}%
                          </p>
                          <p className={`text-sm ${getMoraleColor(member.morale)}`}>
                            Moral: {member.morale}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Objetivos de la misión */}
          <div className="bg-war-field/40 border border-war-gold/30 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-cinzel font-semibold text-war-gold mb-4 flex items-center">
              <Target className="w-6 h-6 mr-3" />
              Objetivos de la Misión
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {objectives.map(objective => (
                <div key={objective.id} className="bg-war-trench/40 p-4 rounded border border-war-gold/20">
                  <div className="flex items-start space-x-3">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      objective.required ? 'bg-red-400' : 'bg-yellow-400'
                    }`} />
                    <div className="flex-1">
                      <h3 className="text-war-gold font-crimson font-semibold mb-1">
                        {objective.title}
                      </h3>
                      <p className="text-war-gold/70 text-sm font-crimson">
                        {objective.description}
                      </p>
                      <span className={`text-xs ${
                        objective.required ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {objective.required ? 'OBLIGATORIO' : 'OPCIONAL'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botón para comenzar */}
          <div className="text-center">
            <button
              onClick={() => setMissionPhase('deployment')}
              className="war-button text-xl px-12 py-4 battlefield-glow"
            >
              ⚔️ Comenzar Despliegue
            </button>
            <p className="text-war-gold/60 font-crimson text-sm mt-3">
              Que Dios proteja a nuestros soldados
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (missionPhase === 'deployment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-war-field via-war-trench to-war-smoke p-6">
        <div className="max-w-5xl mx-auto">
          {/* HUD del jugador */}
          <div className="bg-war-trench/80 border border-war-gold/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-war-gold font-crimson">Salud</span>
                </div>
                <div className="progress-bar h-3 w-full">
                  <div 
                    className="bg-red-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${playerHealth}%` }}
                  />
                </div>
                <span className={`text-sm ${getHealthColor(playerHealth)}`}>{playerHealth}%</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Crosshair className="w-5 h-5 text-yellow-400" />
                  <span className="text-war-gold font-crimson">Munición</span>
                </div>
                <div className="progress-bar h-3 w-full">
                  <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(ammo / 120) * 100}%` }}
                  />
                </div>
                <span className="text-yellow-400 text-sm">{ammo}/120</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-war-gold font-crimson">Moral</span>
                </div>
                <div className="progress-bar h-3 w-full">
                  <div 
                    className="bg-blue-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${morale}%` }}
                  />
                </div>
                <span className={`text-sm ${getMoraleColor(morale)}`}>{morale}%</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-war-gold" />
                  <span className="text-war-gold font-crimson">Puntuación</span>
                </div>
                <span className="text-war-gold text-lg font-cinzel font-semibold">{missionScore}</span>
              </div>
            </div>
          </div>

          {/* Escena de decisión crítica */}
          <div className="bg-war-trench/60 border border-war-gold/30 rounded-xl p-8 mb-6 backdrop-blur-sm animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
                DECISIÓN CRÍTICA
              </h2>
              <div className="flex items-center justify-center space-x-4 text-war-gold/70 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span className="font-crimson">Situación Táctica</span>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>

            <div className="bg-war-field/40 p-6 rounded-lg border border-war-gold/20 mb-6">
              <p className="text-war-gold/90 font-crimson text-lg leading-relaxed text-center">
                Tu escuadrón se encuentra a 50 metros de la trinchera enemiga. Las ametralladoras 
                enemigas están activas y hay heridos de la última oleada en tierra de nadie. 
                El Cabo Martinez te solicita órdenes inmediatas.
              </p>
            </div>

            {!decisionMade ? (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => handleDecisionSelection('charge-trench')}
                    className={`relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedDecision === 'charge-trench'
                        ? 'bg-gradient-to-r from-red-600/70 to-red-700/70 border-red-400 shadow-lg shadow-red-400/30'
                        : 'bg-gradient-to-r from-red-600/50 to-red-700/50 border-red-400/30 hover:from-red-600/60 hover:to-red-700/60'
                    }`}
                  >
                    {selectedDecision === 'charge-trench' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-war-gold rounded-full flex items-center justify-center">
                          <span className="text-war-trench text-sm font-bold">✓</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
                      ⚔️ Cargar la Trinchera
                    </h3>
                    <p className="text-war-gold/80 font-crimson text-sm mb-3">
                      Ordenar un asalto frontal directo a la posición enemiga.
                    </p>
                    <div className="text-xs text-war-gold/60">
                      <span className="text-green-400">+ Alta recompensa</span> | 
                      <span className="text-red-400 ml-1">- Alto riesgo</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDecisionSelection('flank-maneuver')}
                    className={`relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedDecision === 'flank-maneuver'
                        ? 'bg-gradient-to-r from-blue-600/70 to-blue-700/70 border-blue-400 shadow-lg shadow-blue-400/30'
                        : 'bg-gradient-to-r from-blue-600/50 to-blue-700/50 border-blue-400/30 hover:from-blue-600/60 hover:to-blue-700/60'
                    }`}
                  >
                    {selectedDecision === 'flank-maneuver' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-war-gold rounded-full flex items-center justify-center">
                          <span className="text-war-trench text-sm font-bold">✓</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
                      🎯 Maniobra de Flanqueo
                    </h3>
                    <p className="text-war-gold/80 font-crimson text-sm mb-3">
                      Realizar un movimiento táctico por el flanco izquierdo.
                    </p>
                    <div className="text-xs text-war-gold/60">
                      <span className="text-yellow-400">+ Riesgo moderado</span> | 
                      <span className="text-green-400 ml-1">- Recompensa moderada</span>
                    </div>
                  </button>
                </div>

                {selectedDecision && (
                  <div className="text-center animate-fade-in">
                    <button
                      onClick={executeDecision}
                      className="war-button text-lg px-8 py-3 battlefield-glow"
                    >
                      🎯 Ejecutar Decisión
                    </button>
                    <p className="text-war-gold/60 font-crimson text-sm mt-2">
                      Confirmar y proceder con la estrategia seleccionada
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center animate-fade-in">
                <div className="bg-war-field/60 p-6 rounded-lg border border-war-gold/20 mb-4">
                  <h3 className="text-2xl font-cinzel font-bold text-war-gold mb-3">
                    ¡Decisión Ejecutada!
                  </h3>
                  <p className="text-war-gold/80 font-crimson mb-4">
                    {decisionResult}
                  </p>
                  <div className="text-war-gold/60 font-crimson text-sm">
                    Preparándose para el combate... ⚔️
                  </div>
                </div>
              </div>
            )}
          </div>

          {!decisionMade && (
            <div className="text-center">
              <p className="text-war-gold/60 font-crimson text-sm">
                Selecciona una estrategia y confirma tu decisión para continuar
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (missionPhase === 'aftermath') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-war-smoke via-war-trench to-war-field p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-war-trench/80 border border-war-gold/30 rounded-xl p-8 text-center backdrop-blur-sm">
            <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-6">
              🏆 MISIÓN COMPLETADA 🏆
            </h2>
            
            <div className="text-6xl mb-6">🎖️</div>
            
            <div className="bg-war-field/40 p-6 rounded-lg border border-war-gold/20 mb-6">
              <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-4">
                Resumen de la Misión
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="text-lg font-cinzel text-war-gold mb-2">Estadísticas</h4>
                  <ul className="text-war-gold/80 font-crimson space-y-1">
                    <li>Tiempo: {formatTime(timeElapsed)}</li>
                    <li>Puntuación: {missionScore}</li>
                    <li>Salud final: {playerHealth}%</li>
                    <li>Moral final: {morale}%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-cinzel text-war-gold mb-2">Objetivos</h4>
                  <ul className="text-war-gold/80 font-crimson space-y-1">
                    {objectives.map(obj => (
                      <li key={obj.id} className={obj.completed ? 'text-green-400' : 'text-red-400'}>
                        {obj.completed ? '✓' : '✗'} {obj.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onComplete?.({ success: missionComplete, score: missionScore, label: 'Infantería del Somme' })}
                className="war-button text-lg px-8 py-3 battlefield-glow"
              >
                ✅ Continuar ▶
              </button>
              <button
                onClick={() => window.location.reload()}
                className="war-button text-lg px-8 py-3"
              >
                🔄 Nueva Misión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fase de combate mejorada
  return (
    <div className="min-h-screen bg-gradient-to-br from-war-smoke via-war-trench to-war-field p-6">
      <div className="max-w-6xl mx-auto">
        {/* HUD completo durante combate */}
        <div className="bg-war-trench/90 border border-war-gold/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-war-gold" />
                <span className="text-war-gold font-crimson text-sm">Tiempo</span>
              </div>
              <span className="text-war-gold text-lg font-cinzel">{formatTime(timeElapsed)}</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-red-400" />
                <span className="text-war-gold font-crimson text-sm">Salud</span>
              </div>
              <div className="progress-bar h-2 w-full mb-1">
                <div 
                  className="bg-red-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${playerHealth}%` }}
                />
              </div>
              <span className={`text-xs ${getHealthColor(playerHealth)}`}>{playerHealth}%</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Crosshair className="w-4 h-4 text-yellow-400" />
                <span className="text-war-gold font-crimson text-sm">Munición</span>
              </div>
              <div className="progress-bar h-2 w-full mb-1">
                <div 
                  className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(ammo / 120) * 100}%` }}
                />
              </div>
              <span className="text-yellow-400 text-xs">{ammo}/120</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-war-gold font-crimson text-sm">Moral</span>
              </div>
              <div className="progress-bar h-2 w-full mb-1">
                <div 
                  className="bg-blue-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${morale}%` }}
                />
              </div>
              <span className={`text-xs ${getMoraleColor(morale)}`}>{morale}%</span>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-war-gold" />
                <span className="text-war-gold font-crimson text-sm">Puntos</span>
              </div>
              <span className="text-war-gold text-lg font-cinzel">{missionScore}</span>
            </div>
          </div>
        </div>

        {/* Panel de objetivos */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <div className="bg-war-field/60 border border-war-gold/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Objetivos Activos
              </h3>
              
              <div className="space-y-3">
                {objectives.map(objective => (
                  <div key={objective.id} className={`p-3 rounded border transition-all duration-200 ${
                    objective.completed 
                      ? 'bg-green-500/20 border-green-400/30' 
                      : 'bg-war-trench/40 border-war-gold/20'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          objective.completed ? 'bg-green-400' : 
                          objective.required ? 'bg-red-400' : 'bg-yellow-400'
                        }`} />
                        <span className={`font-crimson ${
                          objective.completed ? 'text-green-400 line-through' : 'text-war-gold'
                        }`}>
                          {objective.title}
                        </span>
                      </div>
                      {objective.completed && <span className="text-green-400">✓</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-war-trench/60 border border-war-gold/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-4">
                Estado del Escuadrón
              </h3>
              
              <div className="space-y-3">
                {squad.slice(0, 3).map(member => (
                  <div key={member.id} className="bg-war-field/40 p-3 rounded border border-war-gold/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-war-gold font-crimson text-sm font-semibold">
                        {member.name}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        member.status === 'active' ? 'bg-green-500/20 text-green-400' :
                        member.status === 'injured' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {member.status === 'active' ? 'Activo' : 
                         member.status === 'injured' ? 'Herido' : 'Baja'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-war-gold/60">Salud:</span>
                        <div className="progress-bar h-1 w-full mt-1">
                          <div 
                            className="bg-red-400 h-full rounded-full"
                            style={{ width: `${member.health}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-war-gold/60">Moral:</span>
                        <div className="progress-bar h-1 w-full mt-1">
                          <div 
                            className="bg-blue-400 h-full rounded-full"
                            style={{ width: `${member.morale}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Simulación de combate mejorada */}
        <div className="bg-war-trench/80 border border-war-gold/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-cinzel font-bold text-war-gold mb-4">
            🔥 COMBATE EN PROGRESO 🔥
          </h2>
          
          <div className="mb-6">
            <div className="text-6xl mb-4 animate-bounce">⚔️</div>
            <p className="text-war-gold/80 font-crimson text-lg mb-4">
              {selectedDecision === 'charge-trench' 
                ? 'Tu escuadrón está ejecutando la carga frontal contra las trincheras enemigas...'
                : 'Tu escuadrón está realizando la maniobra de flanqueo para sorprender al enemigo...'}
            </p>
            
            {/* Log de combate */}
            {combatLog.length > 0 && (
              <div className="bg-war-field/40 p-4 rounded-lg border border-war-gold/20 mb-4">
                <h4 className="text-war-gold font-cinzel mb-2">Eventos Recientes:</h4>
                {combatLog.map((log, index) => (
                  <p key={index} className="text-war-gold/70 font-crimson text-sm">
                    {log}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <button 
              onClick={() => handleCombatAction('shoot')}
              className="war-button py-4 px-6 text-lg hover:scale-105 transform transition-all"
              disabled={ammo <= 0}
            >
              🎯 Disparar
              <div className="text-xs text-war-gold/60 mt-1">
                {ammo > 0 ? `(${ammo} balas)` : '(Sin munición)'}
              </div>
            </button>
            <button 
              onClick={() => handleCombatAction('take-cover')}
              className="war-button py-4 px-6 text-lg hover:scale-105 transform transition-all"
            >
              🏃 Cubrirse
              <div className="text-xs text-war-gold/60 mt-1">
                (+5 salud)
              </div>
            </button>
            <button 
              onClick={() => handleCombatAction('lead')}
              className="war-button py-4 px-6 text-lg hover:scale-105 transform transition-all"
            >
              📢 Liderar
              <div className="text-xs text-war-gold/60 mt-1">
                (+10 moral)
              </div>
            </button>
          </div>

          <div className="text-war-gold/60 font-crimson text-sm">
            Usa las acciones de combate para completar los objetivos de la misión
            <br />
            Eventos de combate: {combatEvents} | Objetivos completados: {objectives.filter(obj => obj.completed && obj.required).length}/{objectives.filter(obj => obj.required).length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfantryMission;
