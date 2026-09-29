import { Ambulance, Location, AmbulanceStatus, RiskLevel } from '@/types';

export const mockAmbulances: Ambulance[] = [
  {
    id: 'AMB-101',
    attenderName: 'Rajesh Kumar',
    attenderId: 'ATT-001',
    patientId: 'PAT-001',
    patientName: 'Arun Kumar',
    riskLevel: 'HIGH',
    location: { lat: 12.9352, lng: 77.6245, address: 'Koramangala, Bangalore' },
    destinationHospital: 'Apollo Hospital, Bannerghatta Road',
    eta: 12,
    distance: 4.8,
    status: 'TRANSPORTING',
    routeStatus: 'En route',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-102',
    attenderName: 'Suresh Reddy',
    attenderId: 'ATT-002',
    patientId: 'PAT-002',
    patientName: 'Priya Sharma',
    riskLevel: 'MODERATE',
    location: { lat: 12.9553, lng: 77.6989, address: 'Marathahalli, Bangalore' },
    destinationHospital: 'Manipal Hospital, Old Airport Road',
    eta: 18,
    distance: 7.2,
    status: 'TRANSPORTING',
    routeStatus: 'En route',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-103',
    attenderName: 'Vikram Singh',
    attenderId: 'ATT-003',
    patientId: 'PAT-003',
    patientName: 'Ravi Menon',
    riskLevel: 'CRITICAL',
    location: { lat: 12.9698, lng: 77.7499, address: 'Whitefield, Bangalore' },
    destinationHospital: 'Fortis Hospital, Cunningham Road',
    eta: 6,
    distance: 2.1,
    status: 'TRANSPORTING',
    routeStatus: 'Approaching hospital',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-104',
    attenderName: 'Anita Nair',
    attenderId: 'ATT-004',
    patientId: 'PAT-004',
    patientName: 'Lakshmi Devi',
    riskLevel: 'HIGH',
    location: { lat: 12.9231, lng: 77.5844, address: 'Jayanagar, Bangalore' },
    destinationHospital: 'Narayana Health City, Bommasandra',
    eta: 22,
    distance: 12.5,
    status: 'TRANSPORTING',
    routeStatus: 'En route',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-105',
    attenderName: 'Prakash Rao',
    attenderId: 'ATT-005',
    patientId: 'PAT-005',
    patientName: 'Mohammed Ali',
    riskLevel: 'CRITICAL',
    location: { lat: 12.8456, lng: 77.6603, address: 'Electronic City, Bangalore' },
    destinationHospital: 'Columbia Asia Hospital, Hebbal',
    eta: 28,
    distance: 18.3,
    status: 'TRANSPORTING',
    routeStatus: 'En route',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-106',
    attenderName: 'Deepa Krishnan',
    attenderId: 'ATT-006',
    patientId: null,
    patientName: null,
    riskLevel: null,
    location: { lat: 12.9716, lng: 77.5946, address: 'MG Road, Bangalore' },
    destinationHospital: '',
    eta: 0,
    distance: 0,
    status: 'AVAILABLE',
    routeStatus: 'Standing by',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-107',
    attenderName: 'Kiran Patel',
    attenderId: 'ATT-007',
    patientId: null,
    patientName: null,
    riskLevel: null,
    location: { lat: 12.9141, lng: 77.6446, address: 'BTM Layout, Bangalore' },
    destinationHospital: '',
    eta: 0,
    distance: 0,
    status: 'AVAILABLE',
    routeStatus: 'Standing by',
    lastUpdate: new Date(),
  },
  {
    id: 'AMB-108',
    attenderName: 'Mohan Das',
    attenderId: 'ATT-008',
    patientId: null,
    patientName: null,
    riskLevel: null,
    location: { lat: 13.0067, lng: 77.5583, address: 'Hebbal, Bangalore' },
    destinationHospital: '',
    eta: 0,
    distance: 0,
    status: 'AVAILABLE',
    routeStatus: 'Standing by',
    lastUpdate: new Date(),
  },
];

export const getAmbulanceStatusColor = (status: AmbulanceStatus) => {
  switch (status) {
    case 'EN_ROUTE':
    case 'TRANSPORTING':
      return 'primary';
    case 'AT_SCENE':
      return 'warning';
    case 'AT_HOSPITAL':
      return 'accent';
    case 'AVAILABLE':
      return 'success';
    default:
      return 'gray';
  }
};

export const getAmbulanceStatusLabel = (status: AmbulanceStatus) => {
  switch (status) {
    case 'EN_ROUTE': return 'En Route';
    case 'AT_SCENE': return 'At Scene';
    case 'TRANSPORTING': return 'Transporting';
    case 'AT_HOSPITAL': return 'At Hospital';
    case 'AVAILABLE': return 'Available';
    default: return status;
  }
};

export const getRiskLevelColor = (level: RiskLevel | null) => {
  if (!level) return 'gray';
  switch (level) {
    case 'LOW': return 'success';
    case 'MODERATE': return 'warning';
    case 'HIGH': return 'warning';
    case 'CRITICAL': return 'critical';
  }
};