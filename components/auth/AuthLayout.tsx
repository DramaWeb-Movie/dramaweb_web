import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-3 mb-8 group">
          <div className="relative w-14 h-14">
            <Image
              src="/image/Reeltime Icon.png"
              alt="ReelTime Media"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">Reel</span>
              <span className="gradient-text">Time</span>
            </span>
            <span className="text-[10px] text-[#808080] tracking-[0.2em] uppercase">Media</span>
          </div>
        </Link>
        
        {/* Title */}
        <h2 className="text-center text-3xl font-bold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-center text-sm text-[#B3B3B3]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[#1A1A1A] py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-[#333333]">
          {children}
        </div>
      </div>
    </div>
  );
}



