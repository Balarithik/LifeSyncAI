import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TimeSeriesDataPoint } from '@/types';
import { cn } from '@/utils/helpers';

interface VitalTrendChartProps {
  data: TimeSeriesDataPoint[];
  metrics?: Array<'heartRate' | 'spo2' | 'riskProbability' | 'systolicBP' | 'diastolicBP' | 'temperature' | 'respiratoryRate'>;
  height?: number;
  showLegend?: boolean;
  timeRange?: '30m' | '1h' | '6h';
  className?: string;
}

const metricConfig = {
  heartRate: { label: 'Heart Rate', color: '#ef4444', unit: 'bpm', strokeWidth: 2 },
  spo2: { label: 'SpO₂', color: '#14b8a6', unit: '%', strokeWidth: 2 },
  riskProbability: { label: 'AI Risk', color: '#f59e0b', unit: '%', strokeWidth: 2 },
  systolicBP: { label: 'Systolic BP', color: '#3b82f6', unit: 'mmHg', strokeWidth: 1.5 },
  diastolicBP: { label: 'Diastolic BP', color: '#6366f1', unit: 'mmHg', strokeWidth: 1.5 },
  temperature: { label: 'Temperature', color: '#f97316', unit: '°C', strokeWidth: 1.5 },
  respiratoryRate: { label: 'Resp. Rate', color: '#8b5cf6', unit: '/min', strokeWidth: 1.5 },
};

const defaultMetrics = ['heartRate', 'spo2', 'riskProbability'] as const;

export function VitalTrendChart({ 
  data, 
  metrics = defaultMetrics, 
  height = 280, 
  showLegend = true,
  timeRange = '1h',
  className 
}: VitalTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('card p-8 text-center', className)}>
        <p className="text-gray-500">No trend data available</p>
      </div>
    );
  }

  const formattedData = data.map((point, index) => ({
    ...point,
    time: point.timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    riskProbability: Math.round(point.riskProbability * 100),
    temperature: point.temperature,
  }));

  const activeMetrics = metrics.filter(m => metricConfig[m]);

  return (
    <div className={cn('card p-4', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            interval={timeRange === '30m' ? 2 : timeRange === '1h' ? 3 : 6}
          />
          <YAxis 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            splitNumber={5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#374151', fontWeight: 600, fontSize: '12px' }}
            itemStyle={{ fontSize: '12px' }}
            formatter={(value: number, name: string) => {
              const metric = activeMetrics.find(m => metricConfig[m].label === name);
              if (!metric) return [value, name];
              if (metric === 'riskProbability') return [`${value}%`, name];
              if (metric === 'temperature') return [`${value}°C`, name];
              return [`${value} ${metricConfig[metric].unit}`, name];
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              formatter={value => value}
              iconType="line"
              iconSize={12}
            />
          )}
          {activeMetrics.map((metric, index) => (
            <Line
              key={metric}
              type="monotone"
              dataKey={metric}
              name={metricConfig[metric].label}
              stroke={metricConfig[metric].color}
              strokeWidth={metricConfig[metric].strokeWidth}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
              yAxisId={metric === 'riskProbability' ? 'right' : 'left'}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface RiskTrendChartProps {
  data: TimeSeriesDataPoint[];
  height?: number;
  className?: string;
}

export function RiskTrendChart({ data, height = 180, className }: RiskTrendChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className={cn('card p-8 text-center', className)}>
        <p className="text-gray-500">No risk trend data available</p>
      </div>
    );
  }

  const formattedData = data.map(point => ({
    time: point.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
    risk: Math.round(point.riskProbability * 100),
  }));

  return (
    <div className={cn('card p-4', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={formattedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickLine={false}
            interval={3}
          />
          <YAxis 
            domain=[0, 100]
            tick={{ fontSize: 11, fill: '#6b7280' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={val => `${val}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [`${value}%`, 'AI Risk']}
          />
          <Line
            type="monotone"
            dataKey="risk"
            name="AI Risk"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#f59e0b' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}