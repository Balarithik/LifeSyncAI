import { HospitalResource, ResourceStatus } from '@/types';

export const mockHospitalResources: HospitalResource[] = [
  {
    id: 'RES-001',
    name: 'Emergency Beds',
    category: 'BEDS',
    total: 24,
    available: 12,
    status: 'AVAILABLE',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-002',
    name: 'ICU Beds',
    category: 'BEDS',
    total: 8,
    available: 3,
    status: 'LIMITED',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-003',
    name: 'Oxygen Supply',
    category: 'OXYGEN',
    total: 100,
    available: 78,
    status: 'AVAILABLE',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-004',
    name: 'Ventilators',
    category: 'EQUIPMENT',
    total: 12,
    available: 5,
    status: 'LIMITED',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-005',
    name: 'Cardiac Monitors',
    category: 'EQUIPMENT',
    total: 20,
    available: 14,
    status: 'AVAILABLE',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-006',
    name: 'Emergency Doctors',
    category: 'DOCTORS',
    total: 6,
    available: 4,
    status: 'AVAILABLE',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-007',
    name: 'Trauma Surgeons',
    category: 'TRAUMA_TEAM',
    total: 4,
    available: 2,
    status: 'LIMITED',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-008',
    name: 'Anesthesiologists',
    category: 'DOCTORS',
    total: 3,
    available: 1,
    status: 'BUSY',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-009',
    name: 'Defibrillators',
    category: 'EQUIPMENT',
    total: 8,
    available: 6,
    status: 'AVAILABLE',
    lastUpdated: new Date(),
  },
  {
    id: 'RES-010',
    name: 'Blood Products (O-neg)',
    category: 'OXYGEN',
    total: 10,
    available: 4,
    status: 'LIMITED',
    lastUpdated: new Date(),
  },
];

export const getResourceStatusColor = (status: ResourceStatus) => {
  switch (status) {
    case 'AVAILABLE': return 'success';
    case 'LIMITED': return 'warning';
    case 'BUSY': return 'critical';
    case 'UNAVAILABLE': return 'gray';
  }
};

export const getResourceStatusLabel = (status: ResourceStatus) => {
  switch (status) {
    case 'AVAILABLE': return 'Available';
    case 'LIMITED': return 'Limited';
    case 'BUSY': return 'Busy';
    case 'UNAVAILABLE': return 'Unavailable';
  }
};

export const getCategoryIcon = (category: HospitalResource['category']) => {
  switch (category) {
    case 'BEDS': return 'Bed';
    case 'OXYGEN': return 'Droplet';
    case 'DOCTORS': return 'UserRound';
    case 'EQUIPMENT': return 'Monitor';
    case 'TRAUMA_TEAM': return 'Cross';
  }
};

export const getCategoryColor = (category: HospitalResource['category']) => {
  switch (category) {
    case 'BEDS': return 'primary';
    case 'OXYGEN': return 'accent';
    case 'DOCTORS': return 'success';
    case 'EQUIPMENT': return 'warning';
    case 'TRAUMA_TEAM': return 'critical';
  }
};