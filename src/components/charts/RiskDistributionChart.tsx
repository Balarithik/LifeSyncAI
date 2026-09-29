import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { cn } from '@/utils/helpers';

interface RiskDistributionData {
  name: string;
  value: number;
  color: string;
}

interface RiskDistributionChartProps {
  data: RiskDistributionData[];
  height?: number;
  className?: string;
  showLegend?: boolean;
}

const DEFAULT_COLORS = {
  LOW: '#22c55e',
  MODERATE: '#f59e0b',
  HIGH: '#f97316',
  CRITICAL: '#ef4444',
};

export function RiskDistributionChart({ 
  data, 
  height = 200, 
  className, 
  showLegend = true 
}: RiskDistributionChartProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  if (total === 0) {
    return (
      <div className={cn('card p-8 text-center', className)}>
        <p className="text-gray-500">No risk data available</p>
      </div>
    );
  }

  const chartData = data.map(d => ({
    ...d,
    percentage: total > 0 ? Math.round((d.value / total) * 100) : 0,
  }));

  return (
    <div className={cn('card p-4', className)}>
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            nameKey="name"
            label={({ name, percentage }) => `${name} ${percentage}%`}
            labelLine={false}
            startAngle={90}
            endAngle={270}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number, name: string) => {
              const entry = chartData.find(d => d.name === name);
              return [`${value} patients (${entry?.percentage || 0}%)`, name];
            }}
          />
          {showLegend && (
            <Legend
              wrapperStyle={{ paddingTop: '10px' }}
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              iconSize={10}
              formatter={(value) => {
                const entry = chartData.find(d => d.name === value);
                return `${value} (${entry?.percentage || 0}%)`;
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function getRiskDistributionData(alerts: Array<{ riskLevel: string }>): RiskDistributionData[] {
  const counts = { LOW: 0, MODERATE: 0, HIGH: 0, CRITICAL: 0 };
  
  alerts.forEach(alert => {
    if (alert.riskLevel in counts) {
      counts[alert.riskLevel as keyof typeof counts]++;
    }
  });

  return [
    { name: 'LOW', value: counts.LOW, color: DEFAULT_COLORS.LOW },
    { name: 'MODERATE', value: counts.MODERATE, color: DEFAULT_COLORS.MODERATE },
    { name: 'HIGH', value: counts.HIGH, color: DEFAULT_COLORS.HIGH },
    { name: 'CRITICAL', value: counts.CRITICAL, color: DEFAULT_COLORS.CRITICAL },
  ].filter(d => d.value > 0);
}