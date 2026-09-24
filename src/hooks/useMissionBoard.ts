
import { useState } from 'react';
import { Mission } from '../types/mission';

export const useMissionBoard = () => {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [playingMission, setPlayingMission] = useState<string | null>(null);

  const missions: Mission[] = [
    {
      id: 'infantry-mission',
      title: 'Misión de Infantería: Asalto a las Trincheras',
      description: 'Lidera tu escuadrón en un asalto táctico a las trincheras enemigas. Toma decisiones críticas de combate, gestiona recursos limitados y completa objetivos estratégicos bajo fuego enemigo.',
      difficulty: 'Difícil',
      duration: '45-60 min',
      rewards: {
        experience: 1000,
        items: ['Medalla al Valor', 'Insignia de Infantería', 'Diario de Campaña']
      },
      status: 'available',
      historicalDate: '1 de Julio, 1916',
      location: 'Trincheras del Somme, Francia'
    },
    {
      id: 'sarajevo-1914',
      title: 'El Comienzo del Conflicto: Sarajevo 1914',
      description: 'Presencia el momento que cambió la historia: el asesinato del Archiduque Francisco Fernando. Tu misión es proteger la comitiva real y tomar decisiones que afectarán el curso de los eventos.',
      difficulty: 'Medio',
      duration: '30-45 min',
      rewards: {
        experience: 500,
        items: ['Medalla de Valor', 'Mapa de Sarajevo']
      },
      status: 'available',
      historicalDate: '28 de Junio, 1914',
      location: 'Sarajevo, Bosnia'
    },
    {
      id: 'somme-battle',
      title: 'Sobreviviendo a la Trinchera: Batalla de Somme',
      description: 'Enfrenta una de las batallas más sangrientas de la historia. Debes liderar tu escuadrón a través de tierra de nadie mientras esquivas el fuego enemigo y completas objetivos estratégicos.',
      difficulty: 'Difícil',
      duration: '60-90 min',
      rewards: {
        experience: 1200,
        items: ['Cruz de Guerra', 'Diario de Trinchera', 'Máscara de Gas']
      },
      requirements: ['Completar Sarajevo 1914', 'Nivel de Combate 3+'],
      status: 'available',
      historicalDate: '1 de Julio, 1916',
      location: 'Río Somme, Francia'
    },
    {
      id: 'aerial-combat',
      title: 'Héroes del Aire: Dogfights sobre Flandes',
      description: 'Toma los controles de un biplano de combate y participa en duelos aéreos épicos. Defiende los cielos de la patria mientras enfrentas a los mejores ases enemigos.',
      difficulty: 'Extremo',
      duration: '45-60 min',
      rewards: {
        experience: 1500,
        items: ['Alas de Piloto', 'Gafas de Aviador', 'Hélice Conmemorativa']
      },
      requirements: ['Rol de Piloto', 'Completar 2 misiones previas'],
      status: 'available',
      historicalDate: '1917',
      location: 'Flandes, Bélgica'
    },
    {
      id: 'espionage-mission',
      title: 'Los Secretos del Espionaje: Decodificando Enigmas',
      description: 'Infiltra las líneas enemigas para obtener información crucial. Utiliza tu ingenio para descifrar códigos secretos y completar misiones de espionaje de alto riesgo.',
      difficulty: 'Difícil',
      duration: '40-55 min',
      rewards: {
        experience: 1000,
        items: ['Libro de Códigos', 'Lupa de Espía', 'Mensaje Secreto']
      },
      requirements: ['Rol de Inteligencia', 'Nivel de Análisis 2+'],
      status: 'available',
      historicalDate: '1915-1918',
      location: 'Territorio Enemigo'
    },
    {
      id: 'war-nurse-mission',
      title: 'Ángeles de Misericordia: Hospital de Campaña',
      description: 'Administra un hospital de campaña en el frente occidental. Toma decisiones médicas cruciales, gestiona recursos limitados y salva vidas bajo la presión extrema del conflicto.',
      difficulty: 'Difícil',
      duration: '50-70 min',
      rewards: {
        experience: 1100,
        items: ['Cruz Roja', 'Kit Médico Avanzado', 'Diario de Enfermería']
      },
      requirements: ['Rol de Enfermera', 'Nivel de Medicina 2+'],
      status: 'available',
      historicalDate: '1917',
      location: 'Hospital de Campaña, Francia'
    }
  ];

  const handleMissionClick = (mission: Mission) => {
    if (mission.status === 'available') {
      setSelectedMission(mission.id);
    }
  };

  const handleStartMission = () => {
    const mission = missions.find(m => m.id === selectedMission);
    if (mission) {
      if (mission.id === 'infantry-mission' || mission.id === 'sarajevo-1914' || mission.id === 'somme-battle' || mission.id === 'aerial-combat' || mission.id === 'espionage-mission' || mission.id === 'war-nurse-mission') {
        setPlayingMission(mission.id);
      }
    }
  };

  const handleBackToMissions = () => {
    setPlayingMission(null);
  };

  return {
    missions,
    selectedMission,
    playingMission,
    handleMissionClick,
    handleStartMission,
    handleBackToMissions
  };
};
