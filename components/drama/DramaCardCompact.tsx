'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

interface DramaCardCompactProps {
  id: string;
  title: string;
  titleKh?: string;
  episodes: number;
  image: string;
  showWatchButton?: boolean;
  /** For movie cards: show Watch if purchased, else show price / pay */
  showMovieButton?: boolean;
  hasPurchased?: boolean;
  /** Price (USD) for movie — shown on button when not purchased */
  price?: number;
}

export default function DramaCardCompact({ id, title, titleKh, episodes, image, showWatchButton, showMovieButton, hasPurchased, price }: DramaCardCompactProps) {
  const t = useTranslations('watch');
  const tMovies = useTranslations('movies');
  const watchHref = episodes > 1 ? `/drama/${id}/watch?ep=1` : `/drama/${id}/watch`;

  const showButton = showWatchButton || showMovieButton;
  const isWatch = showWatchButton || (showMovieButton && hasPurchased);
  const buttonHref = isWatch ? watchHref : `/drama/${id}`;
  const buttonLabel = isWatch
    ? t('watchNow')
    : (price != null && price > 0 ? tMovies('priceFormat', { value: price.toFixed(2) }) : tMovies('payPerMovie'));

  return (
    <div className="group block">
      <div className="bg-white rounded-xl overflow-hidden card-hover border border-gray-200 shadow-sm">
        <Link href={`/drama/${id}`} className="block">
          <div className="relative aspect-[2/3]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
            />
            {/* Gradient Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Episode Badge */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5">
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
            <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 group-hover:text-[#E31837] transition-colors">
              {title}
            </h3>
            {titleKh && (
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2" lang="km">{titleKh}</p>
            )}
          </div>
        </Link>
        {showButton && (
          <div className="px-3 pb-3">
            <Link
              href={buttonHref}
              className="mt-2 inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-[#E31837] text-white text-xs font-semibold hover:bg-[#c0152f] transition-colors"
            >
              <FiPlay className="text-[10px]" /> {buttonLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
