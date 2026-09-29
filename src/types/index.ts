export type Role = 'ambulance' | 'hospital';
export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type AlertStatus = 'NEW' | 'ACKNOWLEDGED' | 'PREPARING' | 'ARRIVED' | 'COMPLETED';
export type AmbulanceStatus = 'EN_ROUTE' | 'AT_SCENE' | 'TRANSPORTING' | 'AT_HOSPITAL' | 'AVAILABLE';
export type ResourceStatus = 'AVAILABLE' | 'LIMITED' | 'BUSY' | 'UNAVAILABLE';
export type UrgencyLevel = 'ROUTINE' | 'URGENT' | 'EMERGENCY' | 'CRITICAL';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type EmergencyType = 'CHEST_PAIN' | 'TRAUMA' | 'STROKE' | 'CARDIAC_ARREST' | 'ACCIDENT' | 'RESPIRATORY_DISTRESS' | 'SEPSIS' | 'OTHER';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  emergencyType: EmergencyType;
  symptoms: string;
  medicalHistory: string;
  allergies: string;
  pickupLocation: string;
  destinationHospital: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VitalReading {
  id: string;
  patientId: string;
  timestamp: Date;
  heartRate: number;
  spo2: number;
  systolicBP: number;
  diastolicBP: number;
  temperature: number;
  respiratoryRate: number;
}

export interface VitalSigns {
  heartRate: VitalValue;
  spo2: VitalValue;
  systolicBP: VitalValue;
  diastolicBP: VitalValue;
  temperature: VitalValue;
  respiratoryRate: VitalValue;
}

export interface VitalValue {
  value: number;
  unit: string;
  status: 'NORMAL' | 'WARNING' | 'CRITICAL';
  trend: 'UP' | 'DOWN' | 'STABLE';
  lastUpdated: Date;
}

export interface RiskPrediction {
  id: string;
  patientId: string;
  probability: number;
  level: RiskLevel;
  trend: 'INCREASING' | 'DECREASING' | 'STABLE';
  lastUpdated: Date;
  factors: RiskFactor[];
}

export interface RiskFactor {
  name: string;
  impact: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
}

export interface Ambulance {
  id: string;
  attenderName: string;
  attenderId: string;
  patientId: string | null;
  patientName: string | null;
  riskLevel: RiskLevel | null;
  location: Location;
  destinationHospital: string;
  eta: number;
  distance: number;
  status: AmbulanceStatus;
  routeStatus: string;
  lastUpdate: Date;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface EmergencyAlert {
  id: string;
  alertId: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: Gender;
  ambulanceId: string;
  ambulanceAttender: string;
  riskLevel: RiskLevel;
  riskProbability: number;
  emergencyType: EmergencyType;
  symptoms: string;
  medicalHistory: string;
  allergies: string;
  pickupLocation: string;
  destinationHospital: string;
  eta: number;
  distance: number;
  status: AlertStatus;
  urgency: UrgencyLevel;
  vitals: VitalSigns;
  createdAt: Date;
  acknowledgedAt: Date | null;
  arrivedAt: Date | null;
  completedAt: Date | null;
}

export interface HospitalResource {
  id: string;
  name: string;
  category: 'BEDS' | 'OXYGEN' | 'DOCTORS' | 'EQUIPMENT' | 'TRAUMA_TEAM';
  total: number;
  available: number;
  status: ResourceStatus;
  lastUpdated: Date;
}

export interface TimeSeriesDataPoint {
  timestamp: Date;
  heartRate: number;
  spo2: number;
  systolicBP: number;
  diastolicBP: number;
  temperature: number;
  respiratoryRate: number;
  riskProbability: number;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  vitalsPattern: VitalsPattern;
  riskPattern: RiskPattern;
}

export type VitalsPattern = 'STABLE' | 'INCREASING_RISK' | 'HIGH_RISK' | 'CRITICAL';
export type RiskPattern = 'STABLE' | 'INCREASING' | 'HIGH' | 'CRITICAL';

export interface SimulationState {
  isRunning: boolean;
  scenario: Scenario;
  currentVitals: VitalSigns;
  currentRisk: RiskPrediction;
  history: TimeSeriesDataPoint[];
  speed: number;
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'critical';
}