import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';
import { FaStar } from 'react-icons/fa';
import { FiPlay, FiCalendar, FiGlobe, FiFilm, FiDollarSign } from 'react-icons/fi';
import { getMovieById } from '@/lib/movies';
import { createClient } from '@/lib/supabase/server';

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

  let hasPurchasedMovie = false;
  if (drama.contentType === 'movie' && drama.price != null) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: purchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('content_id', id)
        .eq('content_type', 'movie')
        .maybeSingle();
      hasPurchasedMovie = !!purchase;
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 md:px-6 py-5">
        {/* Page header with title and meta */}
        <div className="mb-5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {drama.genres.map((genre) => (
              <span
                key={genre}
                className="bg-[#E31837]/10 text-[#E31837] px-2 py-0.5 rounded-full text-xs font-medium border border-[#E31837]/30"
              >
                {genre}
              </span>
            ))}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-0.5">
            {drama.title}
          </h1>
          {drama.titleKh && (
            <p className="text-base md:text-lg text-gray-600 mb-2" lang="km">{drama.titleKh}</p>
          )}
          {!drama.titleKh && <div className="mb-2" />}
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-xs">
            <span className="flex items-center gap-1">
              <FaStar className="text-[#FFB800]" /> {drama.rating.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar className="text-gray-400" /> {drama.releaseYear}
            </span>
            <span className="flex items-center gap-1">
              <FiGlobe className="text-gray-400" /> {drama.country}
            </span>
            <span className="flex items-center gap-1">
              <FiFilm className="text-gray-400" /> {drama.contentType === 'movie' ? 'Movie' : `${drama.totalEpisodes} Episodes`}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
              drama.status === 'completed'
                ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                : 'bg-blue-500/10 text-blue-600 border border-blue-500/30'
            }`}>
              {drama.status === 'completed' ? 'Completed' : 'Ongoing'}
            </span>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Poster & Actions — one box */}
          <div className="lg:col-span-1 w-full max-w-[320px] lg:max-w-[300px] mx-auto lg:mx-0">
            <div className="sticky top-20 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="mb-2 mt-2 relative w-full aspect-[2/3] max-h-[320px]">
                <Image
                  src={drama.posterUrl}
                  alt={drama.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-3 space-y-2">
                {/* Movie: show Watch only if purchased, otherwise show Pay per movie only */}
                {drama.contentType === 'movie' && drama.price != null ? (
                  hasPurchasedMovie ? (
                    <Link href={`/drama/${id}/watch`} className="block">
                      <Button className="w-full flex items-center justify-center gap-1.5 text-sm" size="md">
                        <FiPlay className="text-base" /> Watch
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Pay per movie</p>
                      <Link href={`/payment?type=movie&id=${id}&amount=${drama.price}&title=${encodeURIComponent(drama.title)}`} className="block">
                        <Button className="w-full flex items-center justify-center gap-1.5 text-sm" size="md">
                          <FiDollarSign className="text-sm" /> Buy {drama.price.toFixed(2)}
                        </Button>
                      </Link>
                    </>
                  )
                ) : drama.contentType === 'series' ? (
                  <>
                    <Link href={`/drama/${id}/watch?ep=1`} className="block">
                      <Button className="w-full flex items-center justify-center gap-1.5 text-sm" size="md">
                        <FiPlay className="text-base" /> Watch
                      </Button>
                    </Link>
                    {drama.monthlyPrice != null && (
                      <>
                        <p className="text-gray-400 text-[10px] font-medium uppercase tracking-wider">Monthly subscription</p>
                        <Link href={`/payment?type=subscription&id=${id}&amount=${drama.monthlyPrice}&title=${encodeURIComponent(drama.title)}`} className="block">
                          <Button className="w-full flex items-center justify-center gap-1.5 text-sm" size="md">
                            <FiDollarSign className="text-sm" /> Subscribe {drama.monthlyPrice.toFixed(2)}/mo
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                ) : (
                  <Link href={`/drama/${id}/watch`} className="block">
                    <Button className="w-full flex items-center justify-center gap-1.5 text-sm" size="md">
                      <FiPlay className="text-base" /> Watch Now
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">

            {/* Overview */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-2">Overview</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{drama.description}</p>
            </div>

            {/* Episodes */}
            {drama.contentType === 'series' && (
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-1.5">
                  <FiFilm className="text-[#E31837] text-base" /> Episodes
                </h2>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-1.5">
                  {Array.from({ length: drama.totalEpisodes }, (_, i) => (
                    <Link
                      key={i + 1}
                      href={`/drama/${id}/watch?ep=${i + 1}`}
                      className="px-2.5 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-900 hover:bg-[#E31837] hover:text-white hover:border-[#E31837] transition-all text-sm font-medium text-center"
                    >
                      {i + 1}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Cast */}
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Cast</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {drama.cast.map((member) => (
                  <div key={member.id} className="text-center group">
                    {member.imageUrl && (
                      <div className="relative w-14 h-14 mx-auto mb-2">
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="rounded-full object-cover border-2 border-gray-200 group-hover:border-[#E31837] transition-colors"
                        />
                      </div>
                    )}
                    <p className="font-semibold text-gray-900 text-sm">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
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
