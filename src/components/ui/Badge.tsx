import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/helpers';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'critical' | 'high' | 'moderate' | 'low' | 'new' | 'acknowledged' | 'preparing' | 'arrived' | 'success' | 'warning' | 'info';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-gray-100 text-gray-700',
      critical: 'bg-critical-100 text-critical-700',
      high: 'bg-warning-100 text-warning-700',
      moderate: 'bg-primary-100 text-primary-700',
      low: 'bg-success-100 text-success-700',
      new: 'bg-primary-100 text-primary-700',
      acknowledged: 'bg-warning-100 text-warning-700',
      preparing: 'bg-accent-100 text-accent-700',
      arrived: 'bg-success-100 text-success-700',
      success: 'bg-success-100 text-success-700',
      warning: 'bg-warning-100 text-warning-700',
      info: 'bg-primary-100 text-primary-700',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
    };

    const dotColors = {
      default: 'bg-gray-400',
      critical: 'bg-critical-500',
      high: 'bg-warning-500',
      moderate: 'bg-primary-500',
      low: 'bg-success-500',
      new: 'bg-primary-500',
      acknowledged: 'bg-warning-500',
      preparing: 'bg-accent-500',
      arrived: 'bg-success-500',
      success: 'bg-success-500',
      warning: 'bg-warning-500',
      info: 'bg-primary-500',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full font-medium',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';