import { Ambulance, AmbulanceStatus, RiskLevel } from '@/types';
import { cn } from '@/utils/helpers';
import { Badge } from '@/components/ui/Badge';
import { MapPin, UserRound, Clock, AlertTriangle } from 'lucide-react';

const statusLabels: Record<AmbulanceStatus, string> = {
  EN_ROUTE: 'En Route',
  AT_SCENE: 'At Scene',
  TRANSPORTING: 'Transporting',
  AT_HOSPITAL: 'At Hospital',
  AVAILABLE: 'Available',
};

const statusColors: Record<AmbulanceStatus, string> = {
  EN_ROUTE: 'primary',
  AT_SCENE: 'warning',
  TRANSPORTING: 'primary',
  AT_HOSPITAL: 'accent',
  AVAILABLE: 'success',
};

const riskColors: Record<RiskLevel, string> = {
  LOW: 'low',
  MODERATE: 'moderate',
  HIGH: 'high',
  CRITICAL: 'critical',
};

interface AmbulanceCardProps {
  ambulance: Ambulance;
  onClick?: () => void;
  compact?: boolean;
}

export function AmbulanceCard({ ambulance, onClick, compact = false }: AmbulanceCardProps) {
  const statusColor = statusColors[ambulance.status];
  const riskColor = ambulance.riskLevel ? riskColors[ambulance.riskLevel] : 'default';

  if (compact) {
    return (
      <div 
        className={cn('card p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors', onClick && 'cursor-pointer')}
        onClick={onClick}
      >
        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-6 h-6 text-primary-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900 truncate">{ambulance.id}</p>
            <Badge variant={statusColor as any}>{statusLabels[ambulance.status]}</Badge>
          </div>
          <p className="text-sm text-gray-500 truncate">{ambulance.attenderName}</p>
          {ambulance.patientName && (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={riskColor as any} dot>{ambulance.riskLevel}</Badge>
              <span className="text-sm text-gray-600">{ambulance.patientName}</span>
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{ambulance.eta} min</p>
          <p className="text-xs text-gray-500">{ambulance.distance} km</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn('card p-6', onClick && 'cursor-pointer hover:bg-gray-50 transition-colors')}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-primary-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{ambulance.id}</h3>
            <p className="text-sm text-gray-500">{ambulance.attenderName}</p>
          </div>
        </div>
        <Badge variant={statusColor as any} dot>{statusLabels[ambulance.status]}</Badge>
      </div>

      {ambulance.patientId && ambulance.patientName && (
        <div className="mb-4 p-4 rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-900">{ambulance.patientName}</span>
            </div>
            <Badge variant={riskColor as any} dot>{ambulance.riskLevel}</Badge>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600">{ambulance.location.address}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600">ETA: {ambulance.eta} min • {ambulance.distance} km</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <AlertTriangle className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span className="text-gray-600">{ambulance.routeStatus}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        Last update: {ambulance.lastUpdate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
      </div>
    </div>
  );
}