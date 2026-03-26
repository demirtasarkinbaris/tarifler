import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-soft hover:shadow-medium transform hover:scale-105',
        secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-700 text-white hover:from-secondary-700 hover:to-secondary-800 shadow-soft hover:shadow-medium transform hover:scale-105',
        outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white bg-white',
        ghost: 'text-primary-600 hover:bg-primary-50',
        destructive: 'bg-gradient-to-r from-accent-600 to-accent-700 text-white hover:from-accent-700 hover:to-accent-800 shadow-soft hover:shadow-medium transform hover:scale-105',
        success: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-soft hover:shadow-medium transform hover:scale-105',
      },
      size: {
        default: 'h-12 px-6 text-base',
        sm: 'h-10 px-4 text-sm',
        lg: 'h-14 px-8 text-lg',
        xl: 'h-16 px-10 text-xl',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

export { Button, buttonVariants };
