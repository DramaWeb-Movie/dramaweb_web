import Image from 'next/image';
import Link from 'next/link';
import type { Drama } from '@/types';
import Card from '@/components/ui/Card';
import { FaStar } from 'react-icons/fa';

interface DramaCardProps {
  drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
  return (
    <Link href={`/drama/${drama.id}`}>
      <Card hover className="h-full">
        <div className="relative aspect-[2/3]">
          <Image
            src={drama.posterUrl}
            alt={drama.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          <div className="absolute top-2 right-2 bg-[#E60000] text-white px-2 py-1 rounded-md text-sm font-bold shadow-lg flex items-center gap-1">
            <FaStar className="text-yellow-300" /> {drama.rating.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{drama.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{drama.releaseYear} • {drama.country}</p>
          <div className="flex flex-wrap gap-1">
            {drama.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-orange-100 text-[#FF6B00] px-2 py-1 rounded font-medium"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </Link>
  );
}

