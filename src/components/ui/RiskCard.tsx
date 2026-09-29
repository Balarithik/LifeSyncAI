import { cn } from '@/utils/helpers';
import { RiskPrediction, RiskLevel } from '@/types';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, ShieldCheck, ShieldAlert, ShieldOff } from 'lucide-react';

const riskLevelConfig = {
  LOW: { 
    label: 'LOW RISK', 
    color: 'text-success-700 bg-success-50 border-success-200',
    bg: 'bg-success-50',
    border: 'border-success-200',
    icon: ShieldCheck,
    iconColor: 'text-success-600',
  },
  MODERATE: { 
    label: 'MODERATE RISK', 
    color: 'text-warning-700 bg-warning-50 border-warning-200',
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    icon: ShieldAlert,
    iconColor: 'text-warning-600',
  },
  HIGH: { 
    label: 'HIGH RISK', 
    color: 'text-warning-700 bg-warning-50 border-warning-200',
    bg: 'bg-warning-50',
    border: 'border-warning-200',
    icon: ShieldAlert,
    iconColor: 'text-warning-600',
  },
  CRITICAL: { 
    label: 'CRITICAL RISK', 
    color: 'text-critical-700 bg-critical-50 border-critical-200',
    bg: 'bg-critical-50',
    border: 'border-critical-200',
    icon: ShieldOff,
    iconColor: 'text-critical-600',
  },
};

const trendIcons = {
  INCREASING: TrendingUp,
  DECREASING: TrendingDown,
  STABLE: Minus,
};

const trendColors = {
  INCREASING: 'text-warning-600',
  DECREASING: 'text-success-600',
  STABLE: 'text-gray-400',
};

interface RiskCardProps {
  risk: RiskPrediction;
  compact?: boolean;
  showFactors?: boolean;
  showDisclaimer?: boolean;
}

export function RiskCard({ risk, compact = false, showFactors = true, showDisclaimer = true }: RiskCardProps) {
  const config = riskLevelConfig[risk.level];
  const TrendIcon = trendIcons[risk.trend];
  const trendColor = trendColors[risk.trend];
  const RiskIcon = config.icon;

  if (compact) {
    return (
      <div className={cn('card p-4', config.bg, config.border)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', config.iconColor, config.bg.replace('bg-', 'bg-'))}>
              <RiskIcon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">AI Deterioration Risk</p>
              <p className={cn('text-lg font-bold', config.color.replace('bg-', '').replace('border-', '').replace('text-', 'text-'))}>
                {Math.round(risk.probability * 100)}%
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className={cn('badge', risk.level === 'LOW' ? 'badge-low' : risk.level === 'MODERATE' ? 'badge-moderate' : risk.level === 'HIGH' ? 'badge-high' : 'badge-critical')}>
              {config.label}
            </span>
            <p className={cn('mt-1 text-xs flex items-center gap-1', trendColor)}>
              <TrendIcon className="w-3 h-3" />
              {risk.trend === 'INCREASING' ? 'Increasing' : risk.trend === 'DECREASING' ? 'Decreasing' : 'Stable'}
            </p>
          </div>
        </div>
        {showDisclaimer && (
          <p className="mt-3 text-xs text-gray-500">
            AI-assisted risk estimate. Not a medical diagnosis.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('card p-6', config.bg, config.border)}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={cn('p-3 rounded-xl', config.iconColor, config.bg.replace('bg-', 'bg-'))}>
            <RiskIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">AI DETERIORATION RISK</p>
            <div className="mt-2 flex items-baseline gap-4">
              <span className={cn('text-5xl font-bold font-mono', config.color.replace('bg-', '').replace('border-', '').replace('text-', 'text-'))}>
                {Math.round(risk.probability * 100)}%
              </span>
              <span className={cn('badge text-sm px-3 py-1', 
                risk.level === 'LOW' ? 'badge-low' : 
                risk.level === 'MODERATE' ? 'badge-moderate' : 
                risk.level === 'HIGH' ? 'badge-high' : 'badge-critical'
              )}>
                {config.label}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
          <div className={cn('flex items-center gap-1.5 text-sm font-medium', trendColor)}>
            <TrendIcon className="w-4 h-4" />
            <span>Trend: {risk.trend === 'INCREASING' ? 'Increasing' : risk.trend === 'DECREASING' ? 'Decreasing' : 'Stable'}</span>
          </div>
          <p className="text-xs text-gray-500">
            Updated {risk.lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </p>
        </div>
      </div>
      
      {showFactors && risk.factors.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Contributing Factors</h4>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {risk.factors.map((factor, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn('text-xs font-medium px-2 py-0.5 rounded', 
                    factor.impact === 'HIGH' ? 'bg-critical-100 text-critical-700' :
                    factor.impact === 'MEDIUM' ? 'bg-warning-100 text-warning-700' :
                    'bg-gray-100 text-gray-700'
                  )}>
                    {factor.impact}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{factor.name}</span>
                </div>
                <p className="text-xs text-gray-600">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showDisclaimer && (
        <p className="mt-4 text-xs text-gray-500 text-center">
          AI-assisted risk estimate. Not a medical diagnosis.
        </p>
      )}
    </div>
  );
}