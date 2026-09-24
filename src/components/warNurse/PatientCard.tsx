
import React from 'react';
import { Heart, Clock, MapPin } from 'lucide-react';
import { Patient } from '../../types/warNurse';

interface PatientCardProps {
  patient: Patient;
  onTreat: (patientId: number, treatment: 'medicine' | 'bandages' | 'morphine' | 'blood') => void;
  canTreat: boolean;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onTreat, canTreat }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'serious': return 'border-orange-500 bg-orange-500/10';
      case 'stable': return 'border-green-500 bg-green-500/10';
      default: return 'border-war-gold/30 bg-war-gold/10';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'critical': return 'Crítico';
      case 'serious': return 'Grave';
      case 'stable': return 'Estable';
      default: return 'Desconocido';
    }
  };

  const getTimeColor = (timeLeft: number) => {
    if (timeLeft < 30) return 'text-red-400';
    if (timeLeft < 60) return 'text-orange-400';
    return 'text-war-gold';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`border rounded-lg p-4 ${getSeverityColor(patient.severity)}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-cinzel font-semibold text-war-gold">{patient.name}</h4>
          <p className="text-war-gold/70 text-sm">{patient.condition}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-war-trench/50 text-war-gold">
          {getSeverityText(patient.severity)}
        </span>
      </div>

      <div className="flex items-center space-x-4 mb-3 text-sm">
        <div className="flex items-center space-x-1">
          <Clock className={`w-4 h-4 ${getTimeColor(patient.timeLeft)}`} />
          <span className={getTimeColor(patient.timeLeft)}>
            {formatTime(patient.timeLeft)}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4 text-war-gold/60" />
          <span className="text-war-gold/60">{patient.location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onTreat(patient.id, 'medicine')}
          disabled={!canTreat}
          className="px-3 py-2 bg-blue-600/20 border border-blue-600/30 rounded text-blue-400 text-sm hover:bg-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Medicina
        </button>
        <button
          onClick={() => onTreat(patient.id, 'bandages')}
          disabled={!canTreat}
          className="px-3 py-2 bg-green-600/20 border border-green-600/30 rounded text-green-400 text-sm hover:bg-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Vendas
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
