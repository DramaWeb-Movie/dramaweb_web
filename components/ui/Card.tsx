import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#1A1A1A] rounded-xl shadow-lg overflow-hidden border border-[#333333]/50',
        hover && 'card-hover',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('p-4 border-b border-[#333333]', className)}>{children}</div>;
}

export function CardBody({ children, className }: CardProps) {
  return <div className={cn('p-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn('p-4 border-t border-[#333333] bg-[#252525]', className)}>{children}</div>;
}

