import { cn } from '@/utils/helpers';
import { VitalValue } from '@/types';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface VitalCardProps {
  label: string;
  value: VitalValue;
  compact?: boolean;
  showTrend?: boolean;
}

const statusColors = {
  NORMAL: 'text-success-600 bg-success-50 border-success-200',
  WARNING: 'text-warning-600 bg-warning-50 border-warning-200',
  CRITICAL: 'text-critical-600 bg-critical-50 border-critical-200',
};

const statusIcons = {
  NORMAL: 'CheckCircle2',
  WARNING: 'AlertTriangle',
  CRITICAL: 'XCircle',
};

const trendIcons = {
  UP: TrendingUp,
  DOWN: TrendingDown,
  STABLE: Minus,
};

const trendColors = {
  UP: 'text-warning-600',
  DOWN: 'text-critical-600',
  STABLE: 'text-gray-400',
};

export function VitalCard({ label, value, compact = false, showTrend = true }: VitalCardProps) {
  const TrendIcon = trendIcons[value.trend];
  const statusClass = statusColors[value.status];
  const trendClass = trendColors[value.trend];

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3 p-3 rounded-lg border', statusClass.replace('bg-', 'bg-').replace('border-', 'border-'))}>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-gray-500 truncate">{label}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold text-gray-900">{value.value}</span>
            <span className="text-sm text-gray-500">{value.unit}</span>
          </div>
        </div>
        {showTrend && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trendClass)}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{value.trend === 'UP' ? 'Rising' : value.trend === 'DOWN' ? 'Falling' : 'Stable'}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-mono font-bold text-gray-900">{value.value}</span>
            <span className="text-base text-gray-500 self-end mb-1">{value.unit}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', statusClass)}>
              {value.status}
            </span>
            {showTrend && (
              <span className={cn('inline-flex items-center gap-1 text-xs font-medium', trendClass)}>
                <TrendIcon className="w-3 h-3" />
                {value.trend === 'UP' ? 'Rising' : value.trend === 'DOWN' ? 'Falling' : 'Stable'}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-xs text-gray-400">Updated</p>
          <p className="text-xs text-gray-500 font-mono">{value.lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
        </div>
      </div>
    </div>
  );
}