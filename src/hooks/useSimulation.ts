import { useState, useEffect, useCallback, useRef } from 'react';
import { VitalSigns, RiskPrediction, TimeSeriesDataPoint, VitalsPattern, RiskPattern, SimulationState, Scenario } from '@/types';
import { generateMockVitals, generateTimeSeriesData, generateMockRisk } from '@/data/vitals';

const scenarios: Scenario[] = [
  {
    id: 'stable',
    name: 'Stable Patient',
    description: 'Patient with normal vitals and low deterioration risk',
    vitalsPattern: 'STABLE',
    riskPattern: 'STABLE',
  },
  {
    id: 'increasing',
    name: 'Increasing Risk',
    description: 'Patient showing early signs of deterioration',
    vitalsPattern: 'INCREASING_RISK',
    riskPattern: 'INCREASING',
  },
  {
    id: 'high',
    name: 'High Risk',
    description: 'Patient with significantly elevated risk',
    vitalsPattern: 'HIGH_RISK',
    riskPattern: 'HIGH',
  },
  {
    id: 'critical',
    name: 'Critical',
    description: 'Patient in critical condition requiring immediate intervention',
    vitalsPattern: 'CRITICAL',
    riskPattern: 'CRITICAL',
  },
];

const initialState: SimulationState = {
  isRunning: false,
  scenario: scenarios[1],
  currentVitals: generateMockVitals('PAT-001', 'INCREASING_RISK'),
  currentRisk: generateMockRisk('PAT-001', 'INCREASING'),
  history: generateTimeSeriesData(1, 'INCREASING_RISK'),
  speed: 1,
};

export function useSimulation(patientId: string = 'PAT-001') {
  const [state, setState] = useState<SimulationState>(initialState);
  const intervalRef = useRef<number | null>(null);
  const historyRef = useRef<TimeSeriesDataPoint[]>(initialState.history);

  const updateSimulation = useCallback(() => {
    setState(prev => {
      const vitals = generateMockVitals(patientId, prev.scenario.vitalsPattern);
      const risk = generateMockRisk(patientId, prev.scenario.riskPattern);
      
      const newHistoryPoint: TimeSeriesDataPoint = {
        timestamp: new Date(),
        heartRate: vitals.heartRate.value,
        spo2: vitals.spo2.value,
        systolicBP: vitals.systolicBP.value,
        diastolicBP: vitals.diastolicBP.value,
        temperature: vitals.temperature.value,
        respiratoryRate: vitals.respiratoryRate.value,
        riskProbability: risk.probability,
      };

      historyRef.current = [...historyRef.current.slice(-72), newHistoryPoint];

      return {
        ...prev,
        currentVitals: vitals,
        currentRisk: risk,
        history: historyRef.current,
      };
    });
  }, [patientId]);

  const start = useCallback(() => {
    if (intervalRef.current) return;
    updateSimulation();
    intervalRef.current = window.setInterval(updateSimulation, 3000 / state.speed);
    setState(prev => ({ ...prev, isRunning: true }));
  }, [updateSimulation, state.speed]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const setScenario = useCallback((scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;
    
    const newHistory = generateTimeSeriesData(1, scenario.vitalsPattern);
    historyRef.current = newHistory;
    
    setState(prev => ({
      ...prev,
      scenario,
      currentVitals: generateMockVitals(patientId, scenario.vitalsPattern),
      currentRisk: generateMockRisk(patientId, scenario.riskPattern),
      history: newHistory,
    }));
  }, [patientId]);

  const setSpeed = useCallback((speed: number) => {
    setState(prev => ({ ...prev, speed }));
    if (state.isRunning) {
      stop();
      setState(prev => ({ ...prev, isRunning: true }));
      // Restart will happen via effect
    }
  }, [state.isRunning, stop]);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = window.setInterval(updateSimulation, 3000 / state.speed);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning, state.speed, updateSimulation]);

  return {
    state,
    start,
    stop,
    setScenario,
    setSpeed,
    scenarios,
    updateSimulation,
  };
}