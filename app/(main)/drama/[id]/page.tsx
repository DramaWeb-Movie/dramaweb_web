import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';
import { FaStar } from 'react-icons/fa';
import { FiPlay, FiHeart, FiShare2, FiCalendar, FiGlobe, FiFilm, FiClock, FiDollarSign } from 'react-icons/fi';
import { getMovieById } from '@/lib/movies';

export default async function DramaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drama = await getMovieById(id);

  if (!drama) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Banner Section */}
      <div className="relative h-[500px] md:h-[600px]">
        {drama.bannerUrl && (
          <Image
            src={drama.bannerUrl}
            alt={drama.title}
            fill
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-[#0F0F0F]/50" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {drama.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-[#E31837]/20 text-[#E31837] px-4 py-1.5 rounded-full text-sm font-medium border border-[#E31837]/30"
                >
                  {genre}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {drama.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-[#B3B3B3]">
              <span className="flex items-center gap-1">
                <FaStar className="text-[#FFB800]" /> {drama.rating.toFixed(1)}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar className="text-[#808080]" /> {drama.releaseYear}
              </span>
              <span className="flex items-center gap-1">
                <FiGlobe className="text-[#808080]" /> {drama.country}
              </span>
              <span className="flex items-center gap-1">
                <FiFilm className="text-[#808080]" /> {drama.contentType === 'movie' ? 'Movie' : `${drama.totalEpisodes} Episodes`}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                drama.status === 'completed' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {drama.status === 'completed' ? 'Completed' : 'Ongoing'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Poster & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl glow-red">
                <Image
                  src={drama.posterUrl}
                  alt={drama.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 space-y-3">
                {drama.contentType === 'movie' && drama.price != null && (
                  <div className="rounded-xl border border-[#333333]/50 bg-[#1A1A1A] p-4 space-y-2">
                    <p className="text-[#B3B3B3] text-xs font-medium uppercase tracking-wider">Pay per movie</p>
                    <Link href={`/payment?type=movie&id=${id}&amount=${drama.price}&title=${encodeURIComponent(drama.title)}`} className="block">
                      <Button className="w-full flex items-center justify-center gap-2" size="lg">
                        <FiDollarSign className="text-lg" /> Buy {drama.price.toFixed(2)}
                      </Button>
                    </Link>
                  </div>
                )}
                {drama.contentType === 'series' && drama.monthlyPrice != null && (
                  <div className="rounded-xl border border-[#333333]/50 bg-[#1A1A1A] p-4 space-y-2">
                    <p className="text-[#B3B3B3] text-xs font-medium uppercase tracking-wider">Monthly subscription</p>
                    <Link href={`/payment?type=subscription&id=${id}&amount=${drama.monthlyPrice}&title=${encodeURIComponent(drama.title)}`} className="block">
                      <Button className="w-full flex items-center justify-center gap-2" size="lg">
                        <FiDollarSign className="text-lg" /> Subscribe {drama.monthlyPrice.toFixed(2)}/mo
                      </Button>
                    </Link>
                  </div>
                )}
                {(drama.contentType !== 'movie' && drama.contentType !== 'series') && (
                  <Link href={`/drama/${id}/watch`} className="block">
                    <Button className="w-full flex items-center justify-center gap-2" size="lg">
                      <FiPlay className="text-lg" /> Watch Now
                    </Button>
                  </Link>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" className="flex items-center justify-center gap-2">
                    <FiHeart className="text-lg" /> Favorite
                  </Button>
                  <Button variant="secondary" className="flex items-center justify-center gap-2">
                    <FiShare2 className="text-lg" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* How to watch / Payment type */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]/50">
              <h2 className="text-2xl font-bold text-white mb-4">How to watch</h2>
              {drama.contentType === 'movie' && (
                <p className="text-[#B3B3B3] leading-relaxed">
                  This is a single-part movie. Pay once to buy or rent and watch anytime.
                </p>
              )}
              {drama.contentType === 'series' && (
                <p className="text-[#B3B3B3] leading-relaxed">
                  This is a series. Subscribe monthly to unlock all episodes and stream unlimited.
                </p>
              )}
              {drama.contentType !== 'movie' && drama.contentType !== 'series' && (
                <p className="text-[#B3B3B3] leading-relaxed">Choose a plan to start watching.</p>
              )}
              <Link href="/pricing" className="inline-block mt-3 text-[#E31837] hover:text-[#E31837]/80 font-medium text-sm transition-colors">
                View all plans
              </Link>
            </div>

            {/* Overview */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]/50">
              <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
              <p className="text-[#B3B3B3] leading-relaxed">{drama.description}</p>
            </div>

            {/* Episodes - only for series */}
            {drama.contentType === 'series' && (
              <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]/50">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <FiFilm className="text-[#E31837]" /> Episodes
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
                  {Array.from({ length: drama.totalEpisodes }, (_, i) => (
                    <Link
                      key={i + 1}
                      href={`/drama/${id}/watch?ep=${i + 1}`}
                      className="px-4 py-3 bg-[#252525] border border-[#333333]/50 rounded-xl text-white hover:bg-[#E31837] hover:border-[#E31837] transition-all font-medium text-center"
                    >
                      {i + 1}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Cast */}
            <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-[#333333]/50">
              <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {drama.cast.map((member) => (
                  <div key={member.id} className="text-center group">
                    {member.imageUrl && (
                      <div className="relative w-20 h-20 mx-auto mb-3">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover border-2 border-[#333333] group-hover:border-[#E31837] transition-colors"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-[#808080]">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

