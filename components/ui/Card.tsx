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
        'bg-white rounded-lg shadow-md overflow-hidden',
        hover && 'transition-transform duration-200 hover:scale-105 hover:shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn('p-4 border-b', className)}>{children}</div>;
}

export function CardBody({ children, className }: CardProps) {
  return <div className={cn('p-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardProps) {
  return <div className={cn('p-4 border-t bg-gray-50', className)}>{children}</div>;
}

