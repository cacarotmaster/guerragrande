import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Clock, Star, Eye, Users } from 'lucide-react';

interface MissionObjective {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

export interface MissionResult {
  success: boolean;
  score: number;
  label: string;
}

interface SarajevoMissionProps {
  onComplete?: (result: MissionResult) => void;
}

const SarajevoMission: React.FC<SarajevoMissionProps> = ({ onComplete }) => {
  const [missionPhase, setMissionPhase] = useState<'briefing' | 'motorcade' | 'incident' | 'aftermath'>('briefing');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [suspicionLevel, setSuspicionLevel] = useState(0);
  const [publicOrder, setPublicOrder] = useState(75);
  const [missionScore, setMissionScore] = useState(0);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [decisionMade, setDecisionMade] = useState(false);
  const [decisionResult, setDecisionResult] = useState<string | null>(null);
  const [eventCount, setEventCount] = useState(0);

  const [objectives, setObjectives] = useState<MissionObjective[]>([
    {
      id: 'protect-archduke',
      title: 'Proteger al Archiduque',
      description: 'Garantizar la seguridad de Francisco Fernando durante la visita',
      completed: false,
      required: true
    },
    {
      id: 'monitor-crowds',
      title: 'Monitorear Multitudes',
      description: 'Observar comportamientos sospechosos en las calles',
      completed: false,
      required: true
    },
    {
      id: 'secure-route',
      title: 'Asegurar la Ruta',
      description: 'Verificar que la ruta esté libre de amenazas',
      completed: false,
      required: false
    },
    {
      id: 'maintain-order',
      title: 'Mantener el Orden',
      description: 'Controlar las manifestaciones y disturbios',
      completed: false,
      required: true
    }
  ]);

  // Simulación de tiempo de misión
  useEffect(() => {
    if (missionPhase === 'motorcade' || missionPhase === 'incident') {
      const timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [missionPhase]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDecisionSelection = (decision: string) => {
    setSelectedDecision(decision);
  };

  const executeDecision = () => {
    if (!selectedDecision) return;
    
    setDecisionMade(true);
    
    if (selectedDecision === 'increase-security') {
      setSuspicionLevel(prev => Math.min(prev + 20, 100));
      setPublicOrder(prev => Math.max(prev - 10, 0));
      setMissionScore(prev => prev + 200);
      setDecisionResult('Seguridad aumentada. El convoy procede con escolta reforzada por las calles de Sarajevo...');
      completeObjective('secure-route');
    } else if (selectedDecision === 'maintain-schedule') {
      setPublicOrder(prev => Math.min(prev + 5, 100));
      setSuspicionLevel(prev => Math.max(prev - 5, 0));
      setMissionScore(prev => prev + 100);
      setDecisionResult('El convoy mantiene el horario original. La multitud se mantiene calmada mientras el Archiduque saluda...');
      completeObjective('monitor-crowds');
    }
    
    // Avanzar automáticamente después de mostrar el resultado
    setTimeout(() => {
      console.log('Avanzando a la siguiente fase de la misión...');
      const nextCount = eventCount + 1;
      setEventCount(nextCount);
      
      if (nextCount >= 2) {
        // Siempre avanzar a la pantalla final del incidente tras 2 eventos
        setMissionPhase('incident');
      } else {
        // Generar nuevo evento en la caravana
        generateNewEvent();
      }
    }, 3000);
  };

  const generateNewEvent = () => {
    setDecisionMade(false);
    setSelectedDecision(null);
    setDecisionResult(null);
    
    // Simular nuevo evento en la misión
    setTimeout(() => {
      console.log('Nuevo evento generado en la misión');
    }, 1000);
  };

  const completeObjective = (objectiveId: string) => {
    setObjectives(prev => prev.map(obj => 
      obj.id === objectiveId ? { ...obj, completed: true } : obj
    ));
    setMissionScore(prev => prev + 150);
  };

  const getSuspicionColor = (level: number) => {
    if (level < 30) return 'text-green-400';
    if (level < 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getOrderColor = (order: number) => {
    if (order > 70) return 'text-green-400';
    if (order > 40) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (missionPhase === 'briefing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-war-trench via-war-field to-war-trench p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-5xl font-cinzel font-bold text-war-gold mb-4">
              EL COMIENZO DEL CONFLICTO
            </h1>
            <div className="flex items-center justify-center space-x-4 text-war-gold/70">
              <span className="font-crimson">📍 Sarajevo, Bosnia</span>
              <span className="font-crimson">📅 28 de Junio, 1914</span>
              <span className="font-crimson">⏰ 09:45 hrs</span>
            </div>
          </div>

          <div className="bg-war-trench/60 border border-war-gold/30 rounded-xl p-8 mb-8 backdrop-blur-sm">
            <h2 className="text-3xl font-cinzel font-semibold text-war-gold mb-6 flex items-center">
              <Shield className="w-8 h-8 mr-3" />
              Briefing de Seguridad
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Situación Actual</h3>
                <p className="text-war-gold/80 font-crimson leading-relaxed mb-4">
                  El Archiduque Francisco Fernando de Austria-Hungría y su esposa Sofía 
                  han llegado a Sarajevo para una visita oficial. Las tensiones nacionalistas 
                  están en su punto más alto, y la inteligencia ha reportado posible actividad 
                  subversiva en la ciudad.
                </p>
                
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Amenazas Identificadas</h3>
                <ul className="text-war-gold/70 font-crimson text-sm space-y-1">
                  <li>• Nacionalistas serbios: Mano Negra</li>
                  <li>• Manifestaciones anti-austriacas</li>
                  <li>• Posibles intentos de atentado</li>
                  <li>• Multitudes incontroladas</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-cinzel text-war-gold mb-3">Tu Misión</h3>
                <p className="text-war-gold/80 font-crimson leading-relaxed mb-4">
                  Como oficial de seguridad, debes garantizar la protección del Archiduque 
                  durante su recorrido por la ciudad. Cada decisión que tomes podría cambiar 
                  el curso de la historia.
                </p>
                
                <div className="bg-war-field/40 p-4 rounded border border-war-gold/20">
                  <p className="text-war-gold/70 font-crimson text-sm">
                    <strong>Nota histórica:</strong> Este día marcará el inicio de la Primera Guerra Mundial. 
                    Tus acciones determinarán si puedes prevenir la tragedia o si la historia 
                    seguirá su curso fatal.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-war-field/40 border border-war-gold/30 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-cinzel font-semibold text-war-gold mb-4 flex items-center">
              <Eye className="w-6 h-6 mr-3" />
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
                        {objective.required ? 'CRÍTICO' : 'OPCIONAL'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setMissionPhase('motorcade')}
              className="war-button text-xl px-12 py-4 battlefield-glow"
            >
              🚗 Iniciar Operativo
            </button>
            <p className="text-war-gold/60 font-crimson text-sm mt-3">
              El destino del mundo está en tus manos
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (missionPhase === 'motorcade') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-war-field via-war-trench to-war-smoke p-6">
        <div className="max-w-5xl mx-auto">
          {/* HUD del operativo */}
          <div className="bg-war-trench/80 border border-war-gold/30 rounded-xl p-4 mb-6 backdrop-blur-sm">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Clock className="w-5 h-5 text-war-gold" />
                  <span className="text-war-gold font-crimson">Tiempo</span>
                </div>
                <span className="text-war-gold text-lg font-cinzel">{formatTime(timeElapsed)}</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-war-gold font-crimson">Sospecha</span>
                </div>
                <div className="progress-bar h-3 w-full mb-1">
                  <div 
                    className="bg-yellow-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${suspicionLevel}%` }}
                  />
                </div>
                <span className={`text-sm ${getSuspicionColor(suspicionLevel)}`}>{suspicionLevel}%</span>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  <span className="text-war-gold font-crimson">Orden Público</span>
                </div>
                <div className="progress-bar h-3 w-full mb-1">
                  <div 
                    className="bg-blue-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${publicOrder}%` }}
                  />
                </div>
                <span className={`text-sm ${getOrderColor(publicOrder)}`}>{publicOrder}%</span>
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
                <span className="font-crimson">Situación de Seguridad</span>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>

            <div className="bg-war-field/40 p-6 rounded-lg border border-war-gold/20 mb-6">
              <p className="text-war-gold/90 font-crimson text-lg leading-relaxed text-center">
                {eventCount === 0 
                  ? 'El convoy del Archiduque está a punto de partir hacia el Ayuntamiento. Has recibido informes de actividad sospechosa en las calles y la multitud parece agitada. ¿Cómo procedes?'
                  : 'El convoy ha llegado al Ayuntamiento sin incidentes. Sin embargo, un informante te advierte sobre posibles conspiradores en la ruta de regreso. ¿Cuál es tu siguiente movimiento?'
                }
              </p>
            </div>

            {!decisionMade ? (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => handleDecisionSelection('increase-security')}
                    className={`relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedDecision === 'increase-security'
                        ? 'bg-gradient-to-r from-red-600/70 to-red-700/70 border-red-400 shadow-lg shadow-red-400/30'
                        : 'bg-gradient-to-r from-red-600/50 to-red-700/50 border-red-400/30 hover:from-red-600/60 hover:to-red-700/60'
                    }`}
                  >
                    {selectedDecision === 'increase-security' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-war-gold rounded-full flex items-center justify-center">
                          <span className="text-war-trench text-sm font-bold">✓</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
                      🛡️ Aumentar Seguridad
                    </h3>
                    <p className="text-war-gold/80 font-crimson text-sm mb-3">
                      {eventCount === 0 
                        ? 'Desplegar guardias adicionales y cambiar la ruta por precaución.'
                        : 'Modificar la ruta de regreso y aumentar la escolta personal.'
                      }
                    </p>
                    <div className="text-xs text-war-gold/60">
                      <span className="text-green-400">+ Mayor protección</span> | 
                      <span className="text-red-400 ml-1">- Genera sospecha</span>
                    </div>
                  </button>

                  <button
                    onClick={() => handleDecisionSelection('maintain-schedule')}
                    className={`relative p-6 rounded-lg border-2 transition-all duration-200 transform hover:scale-105 ${
                      selectedDecision === 'maintain-schedule'
                        ? 'bg-gradient-to-r from-blue-600/70 to-blue-700/70 border-blue-400 shadow-lg shadow-blue-400/30'
                        : 'bg-gradient-to-r from-blue-600/50 to-blue-700/50 border-blue-400/30 hover:from-blue-600/60 hover:to-blue-700/60'
                    }`}
                  >
                    {selectedDecision === 'maintain-schedule' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-war-gold rounded-full flex items-center justify-center">
                          <span className="text-war-trench text-sm font-bold">✓</span>
                        </div>
                      </div>
                    )}
                    <h3 className="text-xl font-cinzel font-semibold text-war-gold mb-3">
                      📅 Mantener Itinerario
                    </h3>
                    <p className="text-war-gold/80 font-crimson text-sm mb-3">
                      {eventCount === 0 
                        ? 'Proceder según lo planeado para no alterar el programa oficial.'
                        : 'Continuar con la ruta original confiando en las medidas existentes.'
                      }
                    </p>
                    <div className="text-xs text-war-gold/60">
                      <span className="text-green-400">+ Mantiene la calma</span> | 
                      <span className="text-yellow-400 ml-1">- Riesgo moderado</span>
                    </div>
                  </button>
                </div>

                {selectedDecision && (
                  <div className="text-center animate-fade-in">
                    <button
                      onClick={executeDecision}
                      className="war-button text-lg px-8 py-3 battlefield-glow"
                    >
                      📋 Ejecutar Decisión
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
                    {eventCount >= 1 ? 'El momento histórico se acerca...' : 'Continuando con la misión...'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {!decisionMade && (
            <div className="text-center">
              <p className="text-war-gold/60 font-crimson text-sm">
                La historia espera tu decisión...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Fase de incidente - final histórico
  return (
    <div className="min-h-screen bg-gradient-to-br from-war-smoke via-war-trench to-war-field p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-war-trench/90 border border-war-gold/30 rounded-xl p-8 text-center backdrop-blur-sm">
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-6">
            ⚔️ EL MOMENTO QUE CAMBIÓ LA HISTORIA ⚔️
          </h2>
          
          <div className="mb-8">
            <div className="text-6xl mb-4 animate-bounce">🔥</div>
            <p className="text-war-gold/80 font-crimson text-xl mb-4">
              A las 10:45 AM, los disparos de Gavrilo Princip resonaron en Sarajevo...
            </p>
            <p className="text-war-gold/60 font-crimson text-lg mb-6">
              A pesar de tus esfuerzos, la historia siguió su curso. La Gran Guerra ha comenzado.
            </p>
            
            <div className="bg-war-field/40 p-6 rounded-lg border border-war-gold/20 mb-6">
              <h3 className="text-2xl font-cinzel font-bold text-war-gold mb-4">
                Resultado de la Misión
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-war-gold font-crimson">Puntuación Final:</span>
                  <div className="text-war-gold text-xl font-cinzel">{missionScore}</div>
                </div>
                <div>
                  <span className="text-war-gold font-crimson">Objetivos Completados:</span>
                  <div className="text-war-gold text-xl font-cinzel">
                    {objectives.filter(obj => obj.completed).length}/{objectives.length}
                  </div>
                </div>
                <div>
                  <span className="text-war-gold font-crimson">Tiempo Transcurrido:</span>
                  <div className="text-war-gold text-xl font-cinzel">{formatTime(timeElapsed)}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <button 
              onClick={() => {
                setMissionScore(prev => prev + 100);
                completeObjective('monitor-crowds');
              }}
              className="war-button py-3"
            >
              📊 Evaluar Situación
            </button>
            <button 
              onClick={() => {
                setMissionScore(prev => prev + 150);
                completeObjective('maintain-order');
              }}
              className="war-button py-3"
            >
              🚨 Coordinar Respuesta
            </button>
            <button 
              onClick={() => {
                setMissionScore(prev => prev + 75);
              }}
              className="war-button py-3"
            >
              📝 Reportar Incidente
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
            <button
              onClick={() => onComplete?.({ success: true, score: missionScore, label: 'Sarajevo 1914' })}
              className="war-button text-lg px-8 py-3 battlefield-glow"
            >
              ✅ Continuar ▶
            </button>
            <button
              onClick={() => window.location.reload()}
              className="war-button text-lg px-8 py-3"
            >
              🔄 Reiniciar Misión
            </button>
          </div>
          <p className="text-war-gold/60 font-crimson text-sm mt-3">
            La historia ha sido escrita. Tus acciones han sido registradas para la posteridad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SarajevoMission;
