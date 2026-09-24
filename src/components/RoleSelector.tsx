
import React, { useState } from 'react';

interface Role {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  specialties: string[];
}

const roles: Role[] = [
  {
    id: 'infantry',
    name: 'Soldado de Infantería',
    description: 'Lucha en las trincheras y participa en diversas campañas militares.',
    icon: '🪖',
    difficulty: 'Medio',
    specialties: ['Combate', 'Supervivencia', 'Táctica de Trincheras']
  },
  {
    id: 'pilot',
    name: 'Piloto de Combate',
    description: 'Participa en dogfights y misiones de bombardeo aéreo.',
    icon: '✈️',
    difficulty: 'Difícil',
    specialties: ['Vuelo', 'Combate Aéreo', 'Navegación']
  },
  {
    id: 'intelligence',
    name: 'Oficial de Inteligencia',
    description: 'Trabaja en espionaje y decodificación de mensajes enemigos.',
    icon: '🕵️',
    difficulty: 'Difícil',
    specialties: ['Espionaje', 'Criptografía', 'Análisis']
  },
  {
    id: 'nurse',
    name: 'Enfermera de Guerra',
    description: 'Ayuda a curar a los heridos en los hospitales de campaña.',
    icon: '⚕️',
    difficulty: 'Medio',
    specialties: ['Medicina', 'Cuidado', 'Resistencia Mental']
  },
  {
    id: 'factory',
    name: 'Trabajador de Fábrica',
    description: 'Contribuye al esfuerzo bélico en la industria de armamentos.',
    icon: '🏭',
    difficulty: 'Fácil',
    specialties: ['Producción', 'Ingeniería', 'Logística']
  },
  {
    id: 'diplomat',
    name: 'Diplomático',
    description: 'Negocia tratados y forma alianzas estratégicas.',
    icon: '🎩',
    difficulty: 'Difícil',
    specialties: ['Negociación', 'Política', 'Idiomas']
  }
];

interface RoleSelectorProps {
  onRoleSelect: (role: Role) => void;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleRoleClick = (role: Role) => {
    setSelectedRole(role.id);
  };

  const handleConfirmSelection = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      onRoleSelect(role);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-400';
      case 'Medio': return 'text-yellow-400';
      case 'Difícil': return 'text-red-400';
      default: return 'text-war-gold';
    }
  };

  return (
    <div className="min-h-screen bg-smoke-gradient flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-cinzel font-bold text-war-gold mb-4">
            Elige Tu Destino
          </h2>
          <p className="text-xl text-war-gold/70 font-crimson max-w-3xl mx-auto">
            La Gran Guerra necesita héroes de todas las clases. Cada rol ofrece una experiencia única 
            y desafíos específicos que determinarán tu camino a través de la historia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => (
            <div
              key={role.id}
              className={`role-card animate-fade-in cursor-pointer ${
                selectedRole === role.id ? 'border-war-gold shadow-lg shadow-war-gold/30 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleRoleClick(role)}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">{role.icon}</div>
                <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-2">
                  {role.name}
                </h3>
                <div className={`mission-badge ${getDifficultyColor(role.difficulty)} mb-3`}>
                  Dificultad: {role.difficulty}
                </div>
              </div>

              <p className="text-war-gold/80 font-crimson text-center mb-4 leading-relaxed">
                {role.description}
              </p>

              <div className="space-y-2">
                <p className="text-war-gold/60 font-crimson text-sm text-center mb-2">Especialidades:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {role.specialties.map((specialty, idx) => (
                    <span key={idx} className="mission-badge text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {selectedRole === role.id && (
                <div className="mt-4 text-center">
                  <div className="w-full h-1 bg-war-gold rounded-full animate-pulse" />
                  <p className="text-war-gold font-cinzel text-sm mt-2">
                    ¡Rol Seleccionado!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedRole && (
          <div className="text-center animate-fade-in">
            <button
              onClick={handleConfirmSelection}
              className="war-button text-xl px-12 py-4 battlefield-glow"
            >
              Comenzar la Guerra
            </button>
            <p className="text-war-gold/60 font-crimson text-sm mt-3">
              Tu destino te espera en el campo de batalla
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;
