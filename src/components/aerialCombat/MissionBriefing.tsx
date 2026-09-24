
import React from 'react';

interface MissionBriefingProps {
  onStartCombat: () => void;
}

const MissionBriefing = ({ onStartCombat }: MissionBriefingProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-sky-900/80 to-blue-900/80 border border-war-gold/20 rounded-xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✈️</div>
          <h2 className="text-4xl font-cinzel font-bold text-war-gold mb-4">
            Héroes del Aire: Dogfights sobre Flandes
          </h2>
          <p className="text-xl text-war-gold/70 font-crimson">
            1917 - Cielos de Flandes, Bélgica
          </p>
        </div>

        <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-cinzel font-semibold text-war-gold mb-4">
            Briefing de Misión
          </h3>
          <div className="space-y-4 text-war-gold/80 font-crimson">
            <p>
              <strong>Piloto:</strong> Has sido asignado para una misión de patrulla aérea sobre territorio enemigo. 
              Tu biplano Sopwith Camel está equipado con ametralladoras Vickers gemelas.
            </p>
            <p>
              <strong>Objetivo:</strong> Derribar todas las aeronaves enemigas que patrullan el sector. 
              Se han detectado al menos 3 cazas alemanes en la zona.
            </p>
            <p>
              <strong>Advertencia:</strong> El combustible es limitado y las municiones escasas. 
              Usa tus maniobras sabiamente y mantén la altitud para obtener ventaja táctica.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-war-field/60 border border-war-gold/30 rounded-lg p-4">
            <h4 className="text-lg font-cinzel text-war-gold mb-3">Especificaciones de la Aeronave</h4>
            <ul className="space-y-2 text-war-gold/70 font-crimson text-sm">
              <li>• <strong>Modelo:</strong> Sopwith Camel</li>
              <li>• <strong>Velocidad máxima:</strong> 185 km/h</li>
              <li>• <strong>Altitud de servicio:</strong> 5,500 m</li>
              <li>• <strong>Armamento:</strong> 2x Vickers .303</li>
              <li>• <strong>Combustible:</strong> 2 horas de vuelo</li>
            </ul>
          </div>
          
          <div className="bg-war-field/60 border border-war-gold/30 rounded-lg p-4">
            <h4 className="text-lg font-cinzel text-war-gold mb-3">Enemigos Identificados</h4>
            <ul className="space-y-2 text-war-gold/70 font-crimson text-sm">
              <li>• <strong>Albatros D.III:</strong> Caza alemán rápido</li>
              <li>• <strong>Fokker Dr.I:</strong> Triplano del Barón Rojo</li>
              <li>• <strong>Pfalz D.III:</strong> Interceptor pesado</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStartCombat}
            className="war-button text-xl px-12 py-4 battlefield-glow"
          >
            ¡Despegar y Combatir!
          </button>
          <p className="text-war-gold/60 font-crimson text-sm mt-3">
            ¡Que los vientos te sean favorables, as!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefing;
