import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiFilm } from 'react-icons/fi';
import { getMovieById } from '@/lib/movies';
import WatchAccessGate from '@/components/watch/WatchAccessGate';

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ep?: string }>;
}) {
  const { id } = await params;
  const { ep } = await searchParams;
  const episodeNum = ep ? Math.max(1, parseInt(ep, 10) || 1) : 1;

  const drama = await getMovieById(id);
  if (!drama) notFound();

  const { title, totalEpisodes, contentType, freeEpisodesCount = 0, price } = drama;
  const isSinglePart = contentType === 'movie' || totalEpisodes === 1;
  const isFreeMovie = contentType === 'movie' && (price == null || price === 0);
  const episodeList = isSinglePart ? [] : Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-(--background) pt-14 sm:pt-20">
      {/* Top bar: compact on mobile, full on desktop */}
      <div className="sticky top-14 sm:top-16 z-10 border-b border-(--dark-border) bg-white/95 backdrop-blur-md">
        <div className="container mx-auto px-3 sm:px-4 md:px-8 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
            <Link
              href={`/drama/${id}`}
              className="flex items-center justify-center w-10 h-10 sm:w-auto sm:h-auto shrink-0 rounded-full sm:rounded-full text-(--text-secondary) hover:text-(--primary-red) hover:bg-(--primary-red)/5 transition-colors sm:px-3 sm:py-2 sm:-ml-2"
              aria-label="Back to drama"
            >
              <FiArrowLeft className="text-xl sm:text-lg" />
              <span className="hidden sm:inline ml-2 text-sm font-medium">Back to drama</span>
            </Link>
            <span className="hidden md:inline w-px h-4 bg-(--dark-border) shrink-0" aria-hidden />
            <h1
              className="flex-1 min-w-0 text-sm sm:text-base md:text-lg font-bold text-(--text-primary) truncate"
              title={title}
            >
              {title}
            </h1>
            <span className="shrink-0 inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-(--primary-red)/10 text-(--primary-red) border border-(--primary-red)/20 px-2.5 py-1.5 sm:px-3 text-xs font-semibold uppercase tracking-wide">
              <FiFilm className="shrink-0 text-xs sm:text-sm" /> {isSinglePart ? 'Movie' : `Ep. ${episodeNum}`}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-0 sm:px-4 md:px-8 py-4 sm:py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10">
          {/* Video: full-bleed on mobile, inset on larger screens */}
          <div className="flex-1 min-w-0 px-0 sm:px-0">
            <div className="rounded-none sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl glow-red">
              <WatchAccessGate
                contentId={id}
                contentType={contentType === 'series' ? 'series' : 'movie'}
                title={title}
                episodeNum={episodeNum}
                isSinglePart={isSinglePart}
                freeEpisodesCount={freeEpisodesCount}
                isFreeMovie={isFreeMovie}
              />
            </div>
          </div>

          {!isSinglePart && totalEpisodes > 1 && (
            <aside className="lg:w-80 xl:w-72 shrink-0 px-3 sm:px-0">
              <div className="glass rounded-xl sm:rounded-2xl border border-(--dark-border) shadow-lg overflow-hidden lg:sticky lg:top-32">
                <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-(--dark-border) bg-(--primary-red)/5">
                  <h2 className="text-base sm:text-lg font-bold text-(--text-primary) flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-(--primary-red) text-white">
                      <FiFilm className="text-xs sm:text-sm" />
                    </span>
                    Episodes
                  </h2>
                  <p className="text-(--text-muted) text-xs sm:text-sm mt-0.5 sm:mt-1">{totalEpisodes} episodes</p>
                </div>
                <div className="max-h-[45vh] sm:max-h-[50vh] lg:max-h-[calc(100vh-14rem)] overflow-y-auto scrollbar-hide">
                  <div className="flex flex-col gap-1 p-2 sm:p-3">
                    {episodeList.map((num) => {
                      const isActive = num === episodeNum;
                      return (
                        <Link
                          key={num}
                          href={`/drama/${id}/watch?ep=${num}`}
                          className={`
                            flex items-center gap-3 w-full px-4 py-3 rounded-lg sm:rounded-xl text-sm font-semibold transition-all duration-200 touch-manipulation border-l-4 sm:border-l-[6px]
                            ${isActive
                              ? 'bg-(--primary-red)/15 text-(--primary-red) border-(--primary-red)'
                              : 'bg-(--dark-card) text-(--text-secondary) border-transparent active:bg-(--primary-red)/10 active:text-(--primary-red) hover:bg-(--primary-red)/10 hover:text-(--primary-red) hover:border-(--primary-red)/30'
                            }
                          `}
                        >
                          <span className={`
                            flex items-center justify-center w-8 h-8 shrink-0 rounded-lg text-xs font-bold
                            ${isActive ? 'bg-(--primary-red) text-white' : 'bg-white/80 text-(--text-secondary) border border-(--dark-border)'}
                          `}>
                            {num}
                          </span>
                          <span>Episode {num}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
