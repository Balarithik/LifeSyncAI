import { VitalReading, VitalSigns, VitalValue, TimeSeriesDataPoint, RiskPrediction, RiskFactor, VitalsPattern, RiskPattern } from '@/types';

export const generateMockVitals = (patientId: string, pattern: VitalsPattern = 'STABLE'): VitalSigns => {
  const baseValues = {
    STABLE: { hr: 82, spo2: 97, sbp: 125, dbp: 80, temp: 36.8, rr: 16 },
    INCREASING_RISK: { hr: 98, spo2: 93, sbp: 110, dbp: 70, temp: 37.5, rr: 22 },
    HIGH_RISK: { hr: 112, spo2: 90, sbp: 95, dbp: 62, temp: 38.2, rr: 26 },
    CRITICAL: { hr: 135, spo2: 85, sbp: 80, dbp: 50, temp: 39.0, rr: 32 },
  };

  const base = baseValues[pattern];
  const variance = (val: number, range: number) => val + (Math.random() - 0.5) * range;

  const getStatus = (type: keyof typeof base, value: number): 'NORMAL' | 'WARNING' | 'CRITICAL' => {
    const thresholds: Record<string, { normal: [number, number]; warning: [number, number] }> = {
      hr: { normal: [60, 100], warning: [50, 120] },
      spo2: { normal: [95, 100], warning: [90, 94] },
      sbp: { normal: [100, 140], warning: [90, 160] },
      dbp: { normal: [60, 90], warning: [50, 100] },
      temp: { normal: [36.1, 37.5], warning: [35.5, 38.5] },
      rr: { normal: [12, 20], warning: [10, 24] },
    };
    const t = thresholds[type];
    if (value >= t.normal[0] && value <= t.normal[1]) return 'NORMAL';
    if (value >= t.warning[0] && value <= t.warning[1]) return 'WARNING';
    return 'CRITICAL';
  };

  const getTrend = (type: keyof typeof base, value: number): 'UP' | 'DOWN' | 'STABLE' => {
    const baseVal = base[type];
    const diff = value - baseVal;
    if (diff > 2) return 'UP';
    if (diff < -2) return 'DOWN';
    return 'STABLE';
  };

  return {
    heartRate: { value: Math.round(variance(base.hr, 4)), unit: 'bpm', status: getStatus('hr', base.hr), trend: getTrend('hr', base.hr), lastUpdated: new Date() },
    spo2: { value: Math.round(variance(base.spo2, 2)), unit: '%', status: getStatus('spo2', base.spo2), trend: getTrend('spo2', base.spo2), lastUpdated: new Date() },
    systolicBP: { value: Math.round(variance(base.sbp, 5)), unit: 'mmHg', status: getStatus('sbp', base.sbp), trend: getTrend('sbp', base.sbp), lastUpdated: new Date() },
    diastolicBP: { value: Math.round(variance(base.dbp, 3)), unit: 'mmHg', status: getStatus('dbp', base.dbp), trend: getTrend('dbp', base.dbp), lastUpdated: new Date() },
    temperature: { value: Math.round(variance(base.temp, 0.3) * 10) / 10, unit: '°C', status: getStatus('temp', base.temp), trend: getTrend('temp', base.temp), lastUpdated: new Date() },
    respiratoryRate: { value: Math.round(variance(base.rr, 2)), unit: '/min', status: getStatus('rr', base.rr), trend: getTrend('rr', base.rr), lastUpdated: new Date() },
  };
};

export const generateTimeSeriesData = (hours: number, pattern: VitalsPattern = 'STABLE'): TimeSeriesDataPoint[] => {
  const data: TimeSeriesDataPoint[] = [];
  const now = new Date();
  const points = hours * 12; // 5-minute intervals

  const baseValues = {
    STABLE: { hr: 82, spo2: 97, sbp: 125, dbp: 80, temp: 36.8, rr: 16, risk: 0.15 },
    INCREASING_RISK: { hr: 98, spo2: 93, sbp: 110, dbp: 70, temp: 37.5, rr: 22, risk: 0.45 },
    HIGH_RISK: { hr: 112, spo2: 90, sbp: 95, dbp: 62, temp: 38.2, rr: 26, risk: 0.78 },
    CRITICAL: { hr: 135, spo2: 85, sbp: 80, dbp: 50, temp: 39.0, rr: 32, risk: 0.95 },
  };

  const base = baseValues[pattern];

  for (let i = points; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - i * 5 * 60 * 1000);
    const progress = 1 - i / points;
    
    // Add some realistic variation and trend
    const trendFactor = pattern === 'INCREASING_RISK' ? progress * 0.5 : 
                       pattern === 'HIGH_RISK' ? 0.5 + progress * 0.3 :
                       pattern === 'CRITICAL' ? 0.8 + progress * 0.2 : 0;

    const variance = (val: number, range: number) => val + (Math.random() - 0.5) * range;
    const trended = (val: number, maxChange: number) => val + maxChange * trendFactor;

    data.push({
      timestamp,
      heartRate: Math.round(variance(trended(base.hr, 30), 4)),
      spo2: Math.max(70, Math.round(variance(trended(base.spo2, -15), 2))),
      systolicBP: Math.round(variance(trended(base.sbp, -40), 5)),
      diastolicBP: Math.round(variance(trended(base.dbp, -25), 3)),
      temperature: Math.round(variance(trended(base.temp, 2.5), 0.2) * 10) / 10,
      respiratoryRate: Math.round(variance(trended(base.rr, 16), 2)),
      riskProbability: Math.min(0.99, Math.max(0.01, base.risk + trendFactor * 0.8 + (Math.random() - 0.5) * 0.1)),
    });
  }

  return data;
};

export const generateMockRisk = (patientId: string, pattern: RiskPattern = 'STABLE'): RiskPrediction => {
  const baseRisk = {
    STABLE: { prob: 0.15, level: 'LOW' as const, trend: 'STABLE' as const },
    INCREASING: { prob: 0.42, level: 'MODERATE' as const, trend: 'INCREASING' as const },
    HIGH: { prob: 0.78, level: 'HIGH' as const, trend: 'INCREASING' as const },
    CRITICAL: { prob: 0.94, level: 'CRITICAL' as const, trend: 'INCREASING' as const },
  };

  const base = baseRisk[pattern];
  const factors: RiskFactor[] = [
    { name: 'Heart Rate', impact: pattern === 'STABLE' ? 'LOW' : pattern === 'INCREASING' ? 'MEDIUM' : 'HIGH', description: pattern === 'STABLE' ? 'Within normal range' : 'Tachycardia detected' },
    { name: 'SpO₂', impact: pattern === 'STABLE' ? 'LOW' : pattern === 'INCREASING' ? 'MEDIUM' : 'HIGH', description: pattern === 'STABLE' ? 'Normal oxygenation' : 'Hypoxemia present' },
    { name: 'Blood Pressure', impact: pattern === 'CRITICAL' ? 'HIGH' : 'LOW', description: pattern === 'CRITICAL' ? 'Hypotension' : 'Stable' },
    { name: 'Temperature', impact: pattern !== 'STABLE' ? 'MEDIUM' : 'LOW', description: pattern !== 'STABLE' ? 'Fever present' : 'Normal' },
    { name: 'Respiratory Rate', impact: pattern === 'CRITICAL' ? 'HIGH' : pattern !== 'STABLE' ? 'MEDIUM' : 'LOW', description: pattern === 'CRITICAL' ? 'Severe tachypnea' : pattern !== 'STABLE' ? 'Elevated' : 'Normal' },
  ];

  return {
    id: `RISK-${patientId}`,
    patientId,
    probability: base.prob + (Math.random() - 0.5) * 0.05,
    level: base.level,
    trend: base.trend,
    lastUpdated: new Date(),
    factors,
  };
};

export const getVitalTrendLabel = (trend: 'UP' | 'DOWN' | 'STABLE') => {
  switch (trend) {
    case 'UP': return '↑ Rising';
    case 'DOWN': return '↓ Falling';
    case 'STABLE': return '→ Stable';
  }
};

export const getRiskLevelColor = (level: RiskPrediction['level']) => {
  switch (level) {
    case 'LOW': return 'success';
    case 'MODERATE': return 'warning';
    case 'HIGH': return 'warning';
    case 'CRITICAL': return 'critical';
  }
};

export const getVitalStatusColor = (status: VitalValue['status']) => {
  switch (status) {
    case 'NORMAL': return 'success';
    case 'WARNING': return 'warning';
    case 'CRITICAL': return 'critical';
  }
};