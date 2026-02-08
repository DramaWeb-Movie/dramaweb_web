import Image from 'next/image';
import Link from 'next/link';
import type { Drama } from '@/types';
import Card from '@/components/ui/Card';
import { FaStar } from 'react-icons/fa';
import { FiPlay } from 'react-icons/fi';

interface DramaCardProps {
  drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
  return (
    <Link href={`/drama/${drama.id}`} className="group">
      <Card hover className="h-full bg-[#1A1A1A] border-[#333333] overflow-hidden">
        <div className="relative aspect-[2/3]">
          <Image
            src={drama.posterUrl}
            alt={drama.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
            <FaStar className="text-[#FFB800]" /> 
            <span className="text-white">{drama.rating.toFixed(1)}</span>
          </div>

          {/* Play Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#E31837] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              <FiPlay className="text-white text-xl ml-1" />
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1 text-white group-hover:text-[#E31837] transition-colors">{drama.title}</h3>
          <p className="text-sm text-[#808080] mb-3">{drama.releaseYear} • {drama.country}</p>
          <div className="flex flex-wrap gap-1.5">
            {drama.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-xs bg-[#E31837]/20 text-[#E31837] px-2.5 py-1 rounded-full font-medium"
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

