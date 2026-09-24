
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { ManeuverType } from '../../types/aerialCombat';

interface ControlPanelProps {
  onManeuver: (maneuver: ManeuverType) => void;
  ammunition: number;
  combatLog: string[];
}

const ControlPanel = ({ onManeuver, ammunition, combatLog }: ControlPanelProps) => {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => onManeuver('attack')}
          disabled={ammunition <= 0}
          className="war-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎯 Atacar
        </button>
        
        <button
          onClick={() => onManeuver('evasive')}
          className="war-button"
        >
          🔄 Maniobra Evasiva
        </button>
        
        <button
          onClick={() => onManeuver('dive')}
          className="war-button"
        >
          ⬇️ Picada
        </button>
        
        <button
          onClick={() => onManeuver('reload')}
          className="war-button"
        >
          🔄 Recargar
        </button>
      </div>

      <div className="bg-war-trench/60 border border-war-gold/30 rounded-lg p-4">
        <h4 className="font-cinzel text-war-gold mb-3 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4" />
          <span>Registro de Vuelo</span>
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {combatLog.map((log, index) => (
            <div key={index} className="text-war-gold/70 font-crimson text-sm animate-fade-in">
              {log}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ControlPanel;
