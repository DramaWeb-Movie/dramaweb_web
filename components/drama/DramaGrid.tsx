import type { Drama } from '@/types';
import DramaCard from './DramaCard';

interface DramaGridProps {
  dramas: Drama[];
  emptyMessage?: string;
}

export default function DramaGrid({ 
  dramas, 
  emptyMessage = 'No dramas found' 
}: DramaGridProps) {
  if (dramas.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-xl">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {dramas.map((drama) => (
        <DramaCard key={drama.id} drama={drama} />
      ))}
    </div>
  );
}

