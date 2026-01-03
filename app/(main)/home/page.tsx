'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // All featured dramas for carousel
  const featuredDramas = [
    {
      id: '1',
      title: 'The Lost Heir: A Christmas Reckoning',
      episodes: 52,
      image: '/sampleData/movieTitle/movie1.png',
      description: 'On Christmas Eve, a lowly maintenance worker is dumped by his fiancée after she steals his revolutionary patent. At the company\'s holiday party, she and her new fiancé publicly mock and humiliate him. But when a powerful stranger crashes the event and reveals he\'s the worker\'s long-lost father, the two join forces to turn the tables — delivering a Christmas revenge no one will forget.',
      genres: ['Revenge', 'Secret Identity'],
    },
    {
      id: '2',
      title: 'Through Ashes Their Sorrow Awakens',
      episodes: 56,
      image: '/sampleData/movieTitle/movie2.png',
      description: 'Ashley, the Langstons\' biological daughter, spends years in prison after Lilith, the adopted daughter, frames her. After her release, Ashley discovers shocking family secrets and begins her journey of revenge and redemption.',
      genres: ['Family', 'Revenge', 'Counterattack'],
    },
    {
      id: '3',
      title: 'His Love Was A Lie',
      episodes: 57,
      image: '/sampleData/movieTitle/movie3.png',
      description: 'After two years in a passionless marriage, Charlotte discovers her emotionally distant husband has been living a double life. As she uncovers the truth, she must decide between forgiveness and freedom.',
      genres: ['Marriage', 'Toxic Relationship'],
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredDramas.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [featuredDramas.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredDramas.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredDramas.length) % featuredDramas.length);
  };

  const currentDrama = featuredDramas[currentSlide];

  // Sample data for different sections
  const mostWatchedDramas = [
    { id: '1', title: 'The Lost Heir: A Christmas Reckoning', episodes: 52, image: '/sampleData/movieTitle/movie1.png' },
    { id: '2', title: 'Through Ashes Their Sorrow Awakens', episodes: 56, image: '/sampleData/movieTitle/movie2.png' },
    { id: '3', title: 'His Love Was A Lie', episodes: 57, image: '/sampleData/movieTitle/movie3.png' },
    { id: '4', title: 'The Lost Heir: A Christmas Reckoning', episodes: 52, image: '/sampleData/movieTitle/movie1.png' },
    { id: '5', title: 'Through Ashes Their Sorrow Awakens', episodes: 56, image: '/sampleData/movieTitle/movie2.png' },
  ];

  const mustSeeDramas = [
    { id: '6', title: 'His Love Was A Lie', episodes: 57, image: '/sampleData/movieTitle/movie3.png' },
    { id: '7', title: 'The Lost Heir: A Christmas Reckoning', episodes: 52, image: '/sampleData/movieTitle/movie1.png' },
    { id: '8', title: 'Through Ashes Their Sorrow Awakens', episodes: 56, image: '/sampleData/movieTitle/movie2.png' },
    { id: '9', title: 'His Love Was A Lie', episodes: 57, image: '/sampleData/movieTitle/movie3.png' },
    { id: '10', title: 'The Lost Heir: A Christmas Reckoning', episodes: 52, image: '/sampleData/movieTitle/movie1.png' },
  ];

  const trendingDramas = [
    { id: '11', title: 'Through Ashes Their Sorrow Awakens', episodes: 56, image: '/sampleData/movieTitle/movie2.png' },
    { id: '12', title: 'His Love Was A Lie', episodes: 57, image: '/sampleData/movieTitle/movie3.png' },
    { id: '13', title: 'The Lost Heir: A Christmas Reckoning', episodes: 52, image: '/sampleData/movieTitle/movie1.png' },
    { id: '14', title: 'Through Ashes Their Sorrow Awakens', episodes: 56, image: '/sampleData/movieTitle/movie2.png' },
    { id: '15', title: 'His Love Was A Lie', episodes: 57, image: '/sampleData/movieTitle/movie3.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Auto-Sliding Hero Carousel */}
      <section className="relative w-full bg-white overflow-hidden border-b border-gray-200">
        <div className="grid md:grid-cols-2 gap-0 min-h-[500px] md:min-h-[600px]">
          {/* Left Side - Movie Cover */}
          <div className="relative h-[400px] md:h-auto bg-gray-50">
            <Image
              src={currentDrama.image}
              alt={currentDrama.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Right Side - Details */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 bg-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#FF6B00]">
              {currentDrama.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              {currentDrama.episodes} Episodes
            </p>
            <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-700">
              {currentDrama.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {currentDrama.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-orange-100 text-[#FF6B00] px-4 py-2 rounded-full text-sm font-medium border border-[#FF6B00]/20"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div>
              <Link
                href={`/drama/${currentDrama.id}`}
                className="inline-block bg-[#E60000] hover:bg-[#FF6B00] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Watch Now
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-8">
              {featuredDramas.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-12 bg-[#FF6B00]' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
          aria-label="Previous slide"
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full transition-all duration-200 z-10 shadow-lg"
          aria-label="Next slide"
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </section>

      {/* Most Watched Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Most Watched</h2>
            <Link href="/browse?filter=most-watched" className="text-[#FF6B00] hover:text-[#E60000] font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {mostWatchedDramas.map((drama) => (
                <Link
                  key={drama.id}
                  href={`/drama/${drama.id}`}
                  className="group shrink-0 w-[180px] md:w-[220px]"
                >
                  <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-200">
                    <Image
                      src={drama.image}
                      alt={drama.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="220px"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-sm line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
                    {drama.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{drama.episodes} Episodes</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Must-See Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Must-See</h2>
            <Link href="/browse?filter=must-see" className="text-[#FF6B00] hover:text-[#E60000] font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {mustSeeDramas.map((drama) => (
                <Link
                  key={drama.id}
                  href={`/drama/${drama.id}`}
                  className="group shrink-0 w-[180px] md:w-[220px]"
                >
                  <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-200">
                    <Image
                      src={drama.image}
                      alt={drama.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="220px"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-sm line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
                    {drama.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{drama.episodes} Episodes</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Trending Now 🔥</h2>
            <Link href="/browse?filter=trending" className="text-[#FF6B00] hover:text-[#E60000] font-medium transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4">
              {trendingDramas.map((drama) => (
                <Link
                  key={drama.id}
                  href={`/drama/${drama.id}`}
                  className="group shrink-0 w-[180px] md:w-[220px]"
                >
                  <div className="relative aspect-3/4 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-200">
                    <Image
                      src={drama.image}
                      alt={drama.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="220px"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-sm line-clamp-2 group-hover:text-[#FF6B00] transition-colors">
                    {drama.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{drama.episodes} Episodes</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}

