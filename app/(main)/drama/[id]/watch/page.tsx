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

  const { title, totalEpisodes, contentType, episodes } = drama;
  const isSinglePart = contentType === 'movie' || totalEpisodes === 1;
  const episodeList = isSinglePart ? [] : Array.from({ length: totalEpisodes }, (_, i) => i + 1);

  const videoUrl =
    isSinglePart && episodes[0]?.videoUrl
      ? episodes[0].videoUrl
      : episodes[episodeNum - 1]?.videoUrl ?? episodes[0]?.videoUrl ?? '';

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-20">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Link
            href={`/drama/${id}`}
            className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm font-medium"
          >
            <FiArrowLeft className="text-lg" /> Back to drama
          </Link>
          <span className="text-[#808080]">|</span>
          <span className="text-white font-semibold truncate max-w-[min(100%,400px)]" title={title}>
            {title}
          </span>
          <span className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#333333] rounded-lg px-3 py-1.5 text-[#B3B3B3] text-sm">
            <FiFilm className="text-[#E31837]" /> {isSinglePart ? 'Movie' : `Episode ${episodeNum}`}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0">
            <WatchAccessGate
              contentId={id}
              contentType={contentType === 'series' ? 'series' : 'movie'}
              videoUrl={videoUrl}
              title={title}
              episodeNum={episodeNum}
              isSinglePart={isSinglePart}
            />
          </div>

          {!isSinglePart && totalEpisodes > 1 && (
            <aside className="lg:w-72 shrink-0">
              <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 overflow-hidden sticky top-24">
                <div className="p-4 border-b border-[#333333]/50">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FiFilm className="text-[#E31837]" /> Episodes
                  </h2>
                  <p className="text-[#808080] text-sm mt-0.5">{totalEpisodes} episodes</p>
                </div>
                <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-3 scrollbar-hide">
                  <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-3 gap-2">
                    {episodeList.map((num) => (
                      <Link
                        key={num}
                        href={`/drama/${id}/watch?ep=${num}`}
                        className={`px-3 py-2.5 rounded-xl text-center text-sm font-medium transition-all ${
                          num === episodeNum
                            ? 'bg-[#E31837] text-white border border-[#E31837]'
                            : 'bg-[#252525] text-[#B3B3B3] border border-[#333333]/50 hover:bg-[#333333] hover:text-white hover:border-[#E31837]/50'
                        }`}
                      >
                        {num}
                      </Link>
                    ))}
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
