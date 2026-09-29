import { Patient, VitalSigns, RiskPrediction, Ambulance, EmergencyAlert, HospitalResource, TimeSeriesDataPoint, VitalsPattern, RiskPattern } from '@/types';
import { mockPatients } from './patients';
import { generateMockVitals, generateTimeSeriesData, generateMockRisk } from './vitals';
import { mockAmbulances } from './ambulances';
import { mockAlerts } from './alerts';
import { mockHospitalResources } from './hospitalResources';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getCurrentPatient(): Promise<Patient> {
    await delay(300);
    return mockPatients[0];
  },

  async getPatientById(id: string): Promise<Patient | null> {
    await delay(200);
    return mockPatients.find(p => p.id === id) || null;
  },

  async getLiveVitals(patientId: string, pattern: VitalsPattern = 'INCREASING_RISK'): Promise<VitalSigns> {
    await delay(100);
    return generateMockVitals(patientId, pattern);
  },

  async getRiskPrediction(patientId: string, pattern: RiskPattern = 'INCREASING'): Promise<RiskPrediction> {
    await delay(100);
    return generateMockRisk(patientId, pattern);
  },

  async getVitalHistory(patientId: string, hours: number = 1, pattern: VitalsPattern = 'INCREASING_RISK'): Promise<TimeSeriesDataPoint[]> {
    await delay(200);
    return generateTimeSeriesData(hours, pattern);
  },

  async getAmbulances(): Promise<Ambulance[]> {
    await delay(200);
    return mockAmbulances;
  },

  async getAmbulanceById(id: string): Promise<Ambulance | null> {
    await delay(150);
    return mockAmbulances.find(a => a.id === id) || null;
  },

  async getEmergencyAlerts(): Promise<EmergencyAlert[]> {
    await delay(200);
    return [...mockAlerts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async getAlertById(id: string): Promise<EmergencyAlert | null> {
    await delay(150);
    return mockAlerts.find(a => a.id === id) || null;
  },

  async sendEmergencyAlert(alertData: Partial<EmergencyAlert>): Promise<EmergencyAlert> {
    await delay(500);
    const newAlert: EmergencyAlert = {
      id: `AL-${Date.now()}`,
      alertId: `AL-${Date.now()}`,
      patientId: alertData.patientId || 'PAT-001',
      patientName: alertData.patientName || 'Unknown',
      patientAge: alertData.patientAge || 0,
      patientGender: alertData.patientGender || 'MALE',
      ambulanceId: alertData.ambulanceId || 'AMB-101',
      ambulanceAttender: alertData.ambulanceAttender || 'Attender',
      riskLevel: alertData.riskLevel || 'MODERATE',
      riskProbability: alertData.riskProbability || 0.5,
      emergencyType: alertData.emergencyType || 'OTHER',
      symptoms: alertData.symptoms || '',
      medicalHistory: alertData.medicalHistory || '',
      allergies: alertData.allergies || '',
      pickupLocation: alertData.pickupLocation || '',
      destinationHospital: alertData.destinationHospital || '',
      eta: alertData.eta || 0,
      distance: alertData.distance || 0,
      status: 'NEW',
      urgency: alertData.urgency || 'URGENT',
      vitals: alertData.vitals || {} as VitalSigns,
      createdAt: new Date(),
      acknowledgedAt: null,
      arrivedAt: null,
      completedAt: null,
    };
    mockAlerts.unshift(newAlert);
    return newAlert;
  },

  async acknowledgeAlert(alertId: string): Promise<EmergencyAlert | null> {
    await delay(300);
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = 'ACKNOWLEDGED';
      alert.acknowledgedAt = new Date();
      return alert;
    }
    return null;
  },

  async updatePreparationStatus(alertId: string, status: EmergencyAlert['status']): Promise<EmergencyAlert | null> {
    await delay(300);
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      alert.status = status;
      if (status === 'ARRIVED') alert.arrivedAt = new Date();
      if (status === 'COMPLETED') alert.completedAt = new Date();
      return alert;
    }
    return null;
  },

  async getHospitalResources(): Promise<HospitalResource[]> {
    await delay(200);
    return mockHospitalResources;
  },

  async updateResourceAvailability(resourceId: string, available: number): Promise<HospitalResource | null> {
    await delay(200);
    const resource = mockHospitalResources.find(r => r.id === resourceId);
    if (resource) {
      resource.available = Math.max(0, Math.min(resource.total, available));
      resource.status = resource.available === 0 ? 'UNAVAILABLE' : 
                        resource.available < resource.total * 0.3 ? 'LIMITED' :
                        resource.available < resource.total * 0.7 ? 'AVAILABLE' : 'AVAILABLE';
      resource.lastUpdated = new Date();
      return resource;
    }
    return null;
  },

  async getOverviewStats() {
    await delay(200);
    const alerts = mockAlerts;
    const ambulances = mockAmbulances;
    const resources = mockHospitalResources;
    
    return {
      activeEmergencies: alerts.filter(a => ['NEW', 'ACKNOWLEDGED', 'PREPARING'].includes(a.status)).length,
      incomingAmbulances: ambulances.filter(a => a.status === 'TRANSPORTING' || a.status === 'EN_ROUTE').length,
      highRiskPatients: alerts.filter(a => ['HIGH', 'CRITICAL'].includes(a.riskLevel) && ['NEW', 'ACKNOWLEDGED', 'PREPARING'].includes(a.status)).length,
      availableEmergencyBeds: resources.find(r => r.name === 'Emergency Beds')?.available || 0,
    };
  },
};

export const apiClient = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`/api${endpoint}`);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`/api${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`/api${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  },
};