import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 border border-primary-200',
        secondary: 'bg-secondary-100 text-secondary-800 border border-secondary-200',
        success: 'bg-green-100 text-green-800 border border-green-200',
        warning: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        destructive: 'bg-accent-100 text-accent-800 border border-accent-200',
        outline: 'border-2 border-primary-300 text-primary-700 bg-white',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Badge = React.forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
