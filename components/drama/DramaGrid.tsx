import type { Drama } from '@/types';
import DramaCard from './DramaCard';
import { FiFilm } from 'react-icons/fi';

interface DramaGridProps {
  dramas: Drama[];
  emptyMessage?: string;
}

export default function DramaGrid({ 
  dramas, 
  emptyMessage = 'No content found' 
}: DramaGridProps) {
  if (dramas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
          <FiFilm className="text-3xl text-[#808080]" />
        </div>
        <p className="text-xl text-[#808080]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {dramas.map((drama) => (
        <DramaCard key={drama.id} drama={drama} />
      ))}
    </div>
  );
}

