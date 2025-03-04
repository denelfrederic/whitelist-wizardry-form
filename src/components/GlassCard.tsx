
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-morphism rounded-xl p-6 animate-scale-in",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
