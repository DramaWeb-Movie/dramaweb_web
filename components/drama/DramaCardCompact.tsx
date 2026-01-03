import Link from 'next/link';
import Image from 'next/image';

interface DramaCardCompactProps {
  id: string;
  title: string;
  episodes: number;
  image: string;
}

export default function DramaCardCompact({ id, title, episodes, image }: DramaCardCompactProps) {
  return (
    <Link href={`/drama/${id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-200">
        <div className="relative aspect-3/4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          />
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <span>▶</span> {episodes} Episodes
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}

