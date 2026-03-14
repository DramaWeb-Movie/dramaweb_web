'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronRight, FiPlay, FiStar, FiTrendingUp } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

type FeaturedItem = {
  id: string;
  title: string;
  titleKh?: string;
  episodes: number;
  rating: number;
  image: string;
  description?: string;
  genres?: string[];
  year?: string;
};

export default function HomePage() {
  const t = useTranslations('home');
  const [featuredDramas, setFeaturedDramas] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    const run = async () => {
      try {
        const res = await fetch('/api/movies?featured=true&limit=10', { signal: ac.signal });
        const data = await res.json();
        const items = Array.isArray(data) ? data : [];
        setFeaturedDramas(
          items.map((x: { id: string; title: string; titleKh?: string; episodes: number; image: string; description?: string; genres?: string[]; year?: string; rating?: number }) => ({
            id: x.id,
            title: x.title,
            titleKh: x.titleKh,
            episodes: x.episodes,
            image: x.image,
            description: x.description,
            genres: x.genres ?? [],
            year: x.year ?? new Date().getFullYear().toString(),
            rating: x.rating ?? 8,
          }))
        );
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setFeaturedDramas([]);
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => ac.abort();
  }, []);

  const mostWatchedDramas = featuredDramas.slice(0, 6);
  const mustSeeDramas = featuredDramas.slice(1, 7);
  const trendingDramas = featuredDramas.slice(2, 8);

  const DramaCard = ({ drama, index }: { drama: FeaturedItem; index?: number }) => (
    <Link
      href={`/drama/${drama.id}`}
      className="group shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden card-hover bg-gray-100">
        <Image
          src={drama.image}
          alt={drama.title}
          fill
          className="object-cover"
          sizes="220px"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <FiStar className="text-[#FFB800] text-xs" />
          <span className="text-gray-900 text-xs font-semibold">{drama.rating}</span>
        </div>

        {/* Rank Badge */}
        {index !== undefined && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-[#E31837] flex items-center justify-center">
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
        )}

        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-[#E31837] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <FiPlay className="text-white text-xl ml-1" />
          </div>
        </div>

        {/* Episodes Badge on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-medium">{drama.episodes} {t('episodes')}</span>
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-[#E31837] transition-colors">
        {drama.title}
      </h3>
      {drama.titleKh && (
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2" lang="km">{drama.titleKh}</p>
      )}
      <p className="text-xs text-gray-400 mt-1">{drama.episodes} {t('episodes')}</p>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="animate-pulse w-12 h-12 border-2 border-[#E31837] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (featuredDramas.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4 pt-24">
        <h1 className="text-2xl font-bold text-gray-900">{t('noContent')}</h1>
        <p className="text-gray-400 text-center max-w-md">{t('noContentDesc')}</p>
        <Link href="/browse" className="text-[#E31837] hover:underline font-medium">{t('browseContent')}</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">

      {/* Most Watched Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#E31837] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('mostWatched')}</h2>
            </div>
            <Link href="/browse?filter=most-watched" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              {t('viewAll')}
              <FiChevronRight className="text-lg" />
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 pb-4">
              {mostWatchedDramas.map((drama, index) => (
                <DramaCard key={drama.id} drama={drama} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Must-See Section */}
      <section className="py-12 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#FFB800] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{t('mustSee')}</h2>
            </div>
            <Link href="/browse?filter=must-see" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              {t('viewAll')}
              <FiChevronRight className="text-lg" />
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 pb-4">
              {mustSeeDramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#E31837] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                {t('trendingNow')}
                <FiTrendingUp className="text-[#E31837]" />
              </h2>
            </div>
            <Link href="/browse?filter=trending" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              {t('viewAll')}
              <FiChevronRight className="text-lg" />
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 md:gap-6 pb-4">
              {trendingDramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {t('startStreaming')} <span className="gradient-text">{t('today')}</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
              {t('joinMillions')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="gradient-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-xl text-lg"
              >
                {t('getStartedFree')}
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 transition-all text-lg shadow-sm"
              >
                {t('browseContent')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
