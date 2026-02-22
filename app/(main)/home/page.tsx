'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiPlay, FiInfo, FiStar, FiTrendingUp } from 'react-icons/fi';

type FeaturedItem = {
  id: string;
  title: string;
  episodes: number;
  rating: number;
  image: string;
  description?: string;
  genres?: string[];
  year?: string;
};

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredDramas, setFeaturedDramas] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch('/api/movies?featured=true&limit=10');
        const data = await res.json();
        const items = Array.isArray(data) ? data : [];
        setFeaturedDramas(
          items.map((x: { id: string; title: string; episodes: number; image: string; description?: string; genres?: string[]; year?: string; rating?: number }) => ({
            id: x.id,
            title: x.title,
            episodes: x.episodes,
            image: x.image,
            description: x.description,
            genres: x.genres ?? [],
            year: x.year ?? new Date().getFullYear().toString(),
            rating: x.rating ?? 8,
          }))
        );
      } catch {
        setFeaturedDramas([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (featuredDramas.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDramas.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredDramas.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredDramas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredDramas.length) % featuredDramas.length);
  };

  const currentDrama = featuredDramas.length > 0 ? featuredDramas[currentSlide] : null;
  const mostWatchedDramas = featuredDramas.slice(0, 6);
  const mustSeeDramas = featuredDramas.slice(1, 7);
  const trendingDramas = featuredDramas.slice(2, 8);

  // Drama Card Component
  const DramaCard = ({ drama, index }: { drama: typeof mostWatchedDramas[0], index?: number }) => (
    <Link
      href={`/drama/${drama.id}`}
      className="group shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
    >
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden card-hover bg-[#1A1A1A]">
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
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <FiStar className="text-[#FFB800] text-xs" />
          <span className="text-white text-xs font-semibold">{drama.rating}</span>
        </div>

        {/* Rank Badge (for numbered lists) */}
        {index !== undefined && (
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-[#E31837] to-[#E31837] flex items-center justify-center">
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
        )}

        {/* Play Button on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-[#E31837] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
            <FiPlay className="text-white text-xl ml-1" />
          </div>
        </div>

        {/* Episodes Badge */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white/90 text-xs font-medium">{drama.episodes} Episodes</span>
        </div>
      </div>
      <h3 className="mt-3 font-semibold text-sm text-white line-clamp-2 group-hover:text-[#E31837] transition-colors">
        {drama.title}
      </h3>
      <p className="text-xs text-[#808080] mt-1">{drama.episodes} Episodes</p>
    </Link>
  );

  if (loading && featuredDramas.length === 0) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 border-2 border-[#E31837] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!currentDrama) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-2xl font-bold text-white">No content yet</h1>
        <p className="text-[#808080] text-center max-w-md">
          Add movies and series in Supabase with status &quot;published&quot; to see them here.
        </p>
        <Link href="/browse" className="text-[#E31837] hover:underline font-medium">Browse</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero Section with Full-Width Carousel */}
      <section className="relative w-full min-h-[100vh] overflow-hidden">
        {/* Background Image with Gradient */}
        <div className="absolute inset-0">
          <Image
            src={currentDrama.image}
            alt={currentDrama.title}
            fill
            className="object-cover object-center scale-110 blur-sm"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 md:px-8 pt-32 pb-20 min-h-[100vh] flex items-center">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              {/* Badge */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#E31837] text-white text-xs font-semibold rounded-full uppercase tracking-wider">
                  Featured
                </span>
                <span className="text-[#B3B3B3] text-sm">{currentDrama.year}</span>
                <span className="flex items-center gap-1 text-[#FFB800]">
                  <FiStar className="text-sm" />
                  <span className="text-sm font-semibold">{currentDrama.rating}</span>
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {currentDrama.title}
              </h1>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {(currentDrama.genres ?? []).map((genre) => (
                  <span
                    key={genre}
                    className="px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#B3B3B3] text-base md:text-lg leading-relaxed max-w-xl line-clamp-4">
                {currentDrama.description}
              </p>

              {/* Episode Count */}
              <p className="text-white font-medium">
                <span className="text-[#E31837]">{currentDrama.episodes}</span> Episodes Available
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`/drama/${currentDrama.id}`}
                  className="gradient-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-xl"
                >
                  <FiPlay className="text-lg" />
                  Watch Now
                </Link>
                <Link
                  href={`/drama/${currentDrama.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all"
                >
                  <FiInfo className="text-lg" />
                  More Info
                </Link>
              </div>

              {/* Slide Indicators */}
              <div className="flex gap-2 pt-8">
                {featuredDramas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      index === currentSlide 
                        ? 'w-12 bg-gradient-to-r from-[#E31837] to-[#E31837]' 
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Featured Image */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-[280px] sm:w-[320px] md:w-[380px] lg:w-[420px] aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl glow-red">
                <Image
                  src={currentDrama.image}
                  alt={currentDrama.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-200 z-20 flex items-center justify-center border border-white/20"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full transition-all duration-200 z-20 flex items-center justify-center border border-white/20"
          aria-label="Next slide"
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </section>

      {/* Most Watched Section */}
      <section className="py-12 md:py-16 bg-[#0F0F0F]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#E31837] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Most Watched</h2>
            </div>
            <Link href="/browse?filter=most-watched" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              View All
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
      <section className="py-12 md:py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#FFB800] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">Must-See</h2>
            </div>
            <Link href="/browse?filter=must-see" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              View All
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
      <section className="py-12 md:py-16 bg-[#0F0F0F]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-[#E31837] to-[#E31837] rounded-full" />
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                Trending Now
                <FiTrendingUp className="text-[#E31837]" />
              </h2>
            </div>
            <Link href="/browse?filter=trending" className="text-[#E31837] hover:text-[#E31837]/80 font-medium transition-colors text-sm flex items-center gap-1">
              View All
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
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#0F0F0F] relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E31837] rounded-full blur-[150px]" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Start Streaming <span className="gradient-text">Today</span>
            </h2>
            <p className="text-[#B3B3B3] text-lg mb-8 max-w-xl mx-auto">
              Join millions of viewers and get unlimited access to thousands of movies and series.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="gradient-btn inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-xl text-lg"
              >
                Get Started Free
              </Link>
              <Link
                href="/browse"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all text-lg"
              >
                Browse Content
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

