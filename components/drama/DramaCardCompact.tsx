import Link from 'next/link';
import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';

interface DramaCardCompactProps {
  id: string;
  title: string;
  episodes: number;
  image: string;
}

export default function DramaCardCompact({ id, title, episodes, image }: DramaCardCompactProps) {
  return (
    <Link href={`/drama/${id}`} className="group">
      <div className="bg-[#1A1A1A] rounded-xl overflow-hidden card-hover border border-[#333333]/50">
        <div className="relative aspect-[2/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Episode Badge */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
            <FiPlay className="text-[10px]" /> {episodes === 1 ? 'Movie' : `${episodes} Eps`}
          </div>

          {/* Play Button on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#E31837] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
              <FiPlay className="text-white text-lg ml-0.5" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 text-white group-hover:text-[#E31837] transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}




