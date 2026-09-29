import { Patient, EmergencyType, Gender } from '@/types';
import { cn } from '@/utils/helpers';
import { Badge } from '@/components/ui/Badge';
import { MapPin, User, Calendar, AlertTriangle, Hospital } from 'lucide-react';

const emergencyTypeLabels: Record<EmergencyType, string> = {
  CHEST_PAIN: 'Chest Pain / Cardiac',
  TRAUMA: 'Trauma',
  STROKE: 'Stroke',
  CARDIAC_ARREST: 'Cardiac Arrest',
  ACCIDENT: 'Road Traffic Accident',
  RESPIRATORY_DISTRESS: 'Respiratory Distress',
  SEPSIS: 'Sepsis',
  OTHER: 'Other',
};

const genderLabels: Record<Gender, string> = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other',
};

interface PatientSummaryProps {
  patient: Patient;
  compact?: boolean;
  tripStatus?: 'EN_ROUTE' | 'AT_SCENE' | 'TRANSPORTING' | 'AT_HOSPITAL';
}

export function PatientSummary({ patient, compact = false, tripStatus = 'TRANSPORTING' }: PatientSummaryProps) {
  const tripStatusLabels = {
    EN_ROUTE: 'En Route to Scene',
    AT_SCENE: 'At Scene',
    TRANSPORTING: 'Transporting',
    AT_HOSPITAL: 'At Hospital',
  };

  if (compact) {
    return (
      <div className="card p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
              <User className="w-6 h-6 text-primary-700" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{patient.name}</p>
              <p className="text-sm text-gray-500">{patient.id} • {patient.age}y • {genderLabels[patient.gender]}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="moderate">{emergencyTypeLabels[patient.emergencyType]}</Badge>
            <Badge variant="info">{tripStatusLabels[tripStatus]}</Badge>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-primary-100 flex items-center justify-center">
            <User className="w-8 h-8 text-primary-700" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">{patient.id}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant={patient.emergencyType === 'CARDIAC_ARREST' ? 'critical' : 'moderate'}>
            {emergencyTypeLabels[patient.emergencyType]}
          </Badge>
          <Badge variant="info">{tripStatusLabels[tripStatus]}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="p-2 rounded-lg bg-white">
            <Calendar className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Age</p>
            <p className="font-medium text-gray-900">{patient.age} years</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="p-2 rounded-lg bg-white">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Gender</p>
            <p className="font-medium text-gray-900">{genderLabels[patient.gender]}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="p-2 rounded-lg bg-white">
            <MapPin className="w-5 h-5 text-gray-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="font-medium text-gray-900 truncate">{patient.pickupLocation}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
          <div className="p-2 rounded-lg bg-white">
            <Hospital className="w-5 h-5 text-gray-600" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Destination</p>
            <p className="font-medium text-gray-900 truncate">{patient.destinationHospital}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Symptoms</p>
          <p className="text-sm text-gray-900">{patient.symptoms}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Medical History</p>
          <p className="text-sm text-gray-900">{patient.medicalHistory}</p>
        </div>
        <div className="sm:col-span-2">
          <p className="text-xs text-gray-500 mb-1">Allergies</p>
          <p className="text-sm text-gray-900">{patient.allergies}</p>
        </div>
      </div>
    </div>
  );
}