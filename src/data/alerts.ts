import { EmergencyAlert, AlertStatus, UrgencyLevel, RiskLevel, EmergencyType, Gender, VitalSigns } from '@/types';

export const mockAlerts: EmergencyAlert[] = [
  {
    id: 'AL-1024',
    alertId: 'AL-1024',
    patientId: 'PAT-001',
    patientName: 'Arun Kumar',
    patientAge: 58,
    patientGender: 'MALE',
    ambulanceId: 'AMB-101',
    ambulanceAttender: 'Rajesh Kumar',
    riskLevel: 'HIGH',
    riskProbability: 0.82,
    emergencyType: 'CHEST_PAIN',
    symptoms: 'Chest pain radiating to left arm, shortness of breath, diaphoresis',
    medicalHistory: 'Hypertension, Type 2 Diabetes, Previous MI (2021)',
    allergies: 'Penicillin, Aspirin',
    pickupLocation: '123 MG Road, Koramangala, Bangalore',
    destinationHospital: 'Apollo Hospital, Bannerghatta Road',
    eta: 12,
    distance: 4.8,
    status: 'NEW',
    urgency: 'EMERGENCY',
    vitals: {
      heartRate: { value: 108, unit: 'bpm', status: 'WARNING', trend: 'UP', lastUpdated: new Date() },
      spo2: { value: 92, unit: '%', status: 'WARNING', trend: 'DOWN', lastUpdated: new Date() },
      systolicBP: { value: 100, unit: 'mmHg', status: 'WARNING', trend: 'DOWN', lastUpdated: new Date() },
      diastolicBP: { value: 65, unit: 'mmHg', status: 'WARNING', trend: 'DOWN', lastUpdated: new Date() },
      temperature: { value: 38.1, unit: '°C', status: 'WARNING', trend: 'UP', lastUpdated: new Date() },
      respiratoryRate: { value: 24, unit: '/min', status: 'WARNING', trend: 'UP', lastUpdated: new Date() },
    },
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    acknowledgedAt: null,
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: 'AL-1023',
    alertId: 'AL-1023',
    patientId: 'PAT-002',
    patientName: 'Priya Sharma',
    patientAge: 34,
    patientGender: 'FEMALE',
    ambulanceId: 'AMB-102',
    ambulanceAttender: 'Suresh Reddy',
    riskLevel: 'MODERATE',
    riskProbability: 0.48,
    emergencyType: 'ACCIDENT',
    symptoms: 'Head trauma, multiple lacerations, suspected femur fracture',
    medicalHistory: 'No significant history',
    allergies: 'None known',
    pickupLocation: 'Outer Ring Road, Near Marathahalli Bridge',
    destinationHospital: 'Manipal Hospital, Old Airport Road',
    eta: 18,
    distance: 7.2,
    status: 'ACKNOWLEDGED',
    urgency: 'URGENT',
    vitals: {
      heartRate: { value: 96, unit: 'bpm', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      spo2: { value: 96, unit: '%', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      systolicBP: { value: 118, unit: 'mmHg', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      diastolicBP: { value: 78, unit: 'mmHg', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      temperature: { value: 36.9, unit: '°C', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      respiratoryRate: { value: 18, unit: '/min', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
    },
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
    acknowledgedAt: new Date(Date.now() - 12 * 60 * 1000),
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: 'AL-1022',
    alertId: 'AL-1022',
    patientId: 'PAT-003',
    patientName: 'Ravi Menon',
    patientAge: 72,
    patientGender: 'MALE',
    ambulanceId: 'AMB-103',
    ambulanceAttender: 'Vikram Singh',
    riskLevel: 'CRITICAL',
    riskProbability: 0.94,
    emergencyType: 'STROKE',
    symptoms: 'Right-sided weakness, facial drooping, slurred speech',
    medicalHistory: 'Atrial fibrillation, Hypertension, Hyperlipidemia',
    allergies: 'Warfarin',
    pickupLocation: 'Whitefield, Bangalore',
    destinationHospital: 'Fortis Hospital, Cunningham Road',
    eta: 6,
    distance: 2.1,
    status: 'PREPARING',
    urgency: 'CRITICAL',
    vitals: {
      heartRate: { value: 88, unit: 'bpm', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      spo2: { value: 94, unit: '%', status: 'WARNING', trend: 'DOWN', lastUpdated: new Date() },
      systolicBP: { value: 165, unit: 'mmHg', status: 'WARNING', trend: 'UP', lastUpdated: new Date() },
      diastolicBP: { value: 95, unit: 'mmHg', status: 'WARNING', trend: 'UP', lastUpdated: new Date() },
      temperature: { value: 37.1, unit: '°C', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      respiratoryRate: { value: 16, unit: '/min', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
    },
    createdAt: new Date(Date.now() - 22 * 60 * 1000),
    acknowledgedAt: new Date(Date.now() - 20 * 60 * 1000),
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: 'AL-1021',
    alertId: 'AL-1021',
    patientId: 'PAT-004',
    patientName: 'Lakshmi Devi',
    patientAge: 45,
    patientGender: 'FEMALE',
    ambulanceId: 'AMB-104',
    ambulanceAttender: 'Anita Nair',
    riskLevel: 'HIGH',
    riskProbability: 0.76,
    emergencyType: 'RESPIRATORY_DISTRESS',
    symptoms: 'Severe dyspnea, wheezing, unable to speak in full sentences',
    medicalHistory: 'Asthma, COPD',
    allergies: 'Sulfa drugs',
    pickupLocation: 'Jayanagar 4th Block, Bangalore',
    destinationHospital: 'Narayana Health City, Bommasandra',
    eta: 22,
    distance: 12.5,
    status: 'NEW',
    urgency: 'EMERGENCY',
    vitals: {
      heartRate: { value: 122, unit: 'bpm', status: 'CRITICAL', trend: 'UP', lastUpdated: new Date() },
      spo2: { value: 88, unit: '%', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
      systolicBP: { value: 135, unit: 'mmHg', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      diastolicBP: { value: 85, unit: 'mmHg', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      temperature: { value: 37.2, unit: '°C', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      respiratoryRate: { value: 32, unit: '/min', status: 'CRITICAL', trend: 'UP', lastUpdated: new Date() },
    },
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
    acknowledgedAt: null,
    arrivedAt: null,
    completedAt: null,
  },
  {
    id: 'AL-1020',
    alertId: 'AL-1020',
    patientId: 'PAT-005',
    patientName: 'Mohammed Ali',
    patientAge: 61,
    patientGender: 'MALE',
    ambulanceId: 'AMB-105',
    ambulanceAttender: 'Prakash Rao',
    riskLevel: 'CRITICAL',
    riskProbability: 0.97,
    emergencyType: 'CARDIAC_ARREST',
    symptoms: 'Unresponsive, no pulse, CPR in progress',
    medicalHistory: 'Coronary artery disease, Previous CABG, Diabetes',
    allergies: 'None known',
    pickupLocation: 'Electronic City Phase 1, Bangalore',
    destinationHospital: 'Columbia Asia Hospital, Hebbal',
    eta: 28,
    distance: 18.3,
    status: 'NEW',
    urgency: 'CRITICAL',
    vitals: {
      heartRate: { value: 0, unit: 'bpm', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
      spo2: { value: 0, unit: '%', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
      systolicBP: { value: 0, unit: 'mmHg', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
      diastolicBP: { value: 0, unit: 'mmHg', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
      temperature: { value: 36.5, unit: '°C', status: 'NORMAL', trend: 'STABLE', lastUpdated: new Date() },
      respiratoryRate: { value: 0, unit: '/min', status: 'CRITICAL', trend: 'DOWN', lastUpdated: new Date() },
    },
    createdAt: new Date(Date.now() - 3 * 60 * 1000),
    acknowledgedAt: null,
    arrivedAt: null,
    completedAt: null,
  },
];

export const getAlertStatusColor = (status: AlertStatus) => {
  switch (status) {
    case 'NEW': return 'primary';
    case 'ACKNOWLEDGED': return 'warning';
    case 'PREPARING': return 'accent';
    case 'ARRIVED': return 'success';
    case 'COMPLETED': return 'gray';
  }
};

export const getAlertStatusLabel = (status: AlertStatus) => {
  switch (status) {
    case 'NEW': return 'New';
    case 'ACKNOWLEDGED': return 'Acknowledged';
    case 'PREPARING': return 'Preparing';
    case 'ARRIVED': return 'Arrived';
    case 'COMPLETED': return 'Completed';
  }
};

export const getUrgencyColor = (urgency: UrgencyLevel) => {
  switch (urgency) {
    case 'ROUTINE': return 'success';
    case 'URGENT': return 'warning';
    case 'EMERGENCY': return 'critical';
    case 'CRITICAL': return 'critical';
  }
};

export const getUrgencyLabel = (urgency: UrgencyLevel) => {
  switch (urgency) {
    case 'ROUTINE': return 'Routine';
    case 'URGENT': return 'Urgent';
    case 'EMERGENCY': return 'Emergency';
    case 'CRITICAL': return 'Critical';
  }
};

export const getRiskLevelColor = (level: RiskLevel) => {
  switch (level) {
    case 'LOW': return 'success';
    case 'MODERATE': return 'warning';
    case 'HIGH': return 'warning';
    case 'CRITICAL': return 'critical';
  }
};

export const getEmergencyTypeLabel = (type: EmergencyType) => {
  switch (type) {
    case 'CHEST_PAIN': return 'Chest Pain';
    case 'TRAUMA': return 'Trauma';
    case 'STROKE': return 'Stroke';
    case 'CARDIAC_ARREST': return 'Cardiac Arrest';
    case 'ACCIDENT': return 'Accident';
    case 'RESPIRATORY_DISTRESS': return 'Resp. Distress';
    case 'SEPSIS': return 'Sepsis';
    case 'OTHER': return 'Other';
  }
};