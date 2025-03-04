
import React from 'react';
import { cn } from '@/lib/utils';

interface RegistrationCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  currentCount: number;
  maxCount: number;
  className?: string;
}

const RegistrationCounter = ({ 
  currentCount, 
  maxCount, 
  className,
  ...props 
}: RegistrationCounterProps) => {
  const percentage = (currentCount / maxCount) * 100;
  const spotsLeft = maxCount - currentCount;
  
  return (
    <div className={cn("w-full", className)} {...props}>
      <div className="flex justify-between text-sm text-muted-foreground mb-2">
        <span className="font-medium">{spotsLeft} spots remaining</span>
        <span className="font-medium">{currentCount}/{maxCount}</span>
      </div>
      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default RegistrationCounter;
