import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-[#B3B3B3] mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3.5 bg-[#252525] border rounded-xl text-white placeholder-[#808080] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all',
            error ? 'border-[#E31837]' : 'border-[#333333]',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-[#E31837]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;



