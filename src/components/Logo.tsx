
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Logo = ({ className, ...props }: LogoProps) => {
  return (
    <div className={cn("flex items-center space-x-2", className)} {...props}>
      <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
        <span className="text-white text-lg font-semibold">D</span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="text-primary text-[10px] font-bold">AI</span>
        </div>
      </div>
      <span className="font-semibold text-xl tracking-tight">dadvisor.ai</span>
    </div>
  );
};

export default Logo;
