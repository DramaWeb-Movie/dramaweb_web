import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiFilm } from 'react-icons/fi';

// Sample video URLs from the internet (public domain / test videos)
const SAMPLE_VIDEO_URLS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
];

// Minimal map for watch page (id -> title), matches browse/drama mock
const DRAMA_TITLES: Record<string, string> = {
  '1': "Sonny's Competition", '2': 'Deliver Me', '3': 'My Billionaire Lover and Our Forgotten Love',
  '4': "My Crush Thinks I'm A Boy", '5': "Everything's on My Side: Daddy, I'm Coming", '6': 'Divorce? No Big Deal',
  '7': 'Another Drama Title', '8': 'More Drama Content', '9': 'Epic Love Story', '10': 'Revenge Plot',
  '11': 'Family Secrets', '12': 'Hidden Identity', '13': 'Midnight in Seoul', '14': 'The Last Letter',
  '15': 'Silent Storm', '16': 'Between Two Worlds', '17': 'Echoes of Tomorrow', '18': 'The Forgotten Garden',
  '19': 'City of Shadows', '20': 'One Summer Day',
};

const DRAMA_TOTAL_EPISODES: Record<string, number> = {
  '1': 1, '2': 55, '3': 1, '4': 59, '5': 1, '6': 74, '7': 1, '8': 62, '9': 1, '10': 67, '11': 1, '12': 48,
  '13': 1, '14': 1, '15': 1, '16': 1, '17': 1, '18': 1, '19': 1, '20': 1,
};

function getVideoUrlForDrama(dramaId: string): string {
  const index = parseInt(dramaId, 10);
  return SAMPLE_VIDEO_URLS[(index - 1) % SAMPLE_VIDEO_URLS.length];
}

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
  const title = DRAMA_TITLES[id];
  const totalEpisodes = DRAMA_TOTAL_EPISODES[id] ?? 1;
  if (!title) notFound();

  const videoUrl = getVideoUrlForDrama(id);
  const isSinglePart = totalEpisodes === 1;
  const episodes = isSinglePart ? [] : Array.from({ length: totalEpisodes }, (_, i) => i + 1);

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
            <div className="rounded-2xl overflow-hidden bg-black border border-[#333333]/50 shadow-2xl">
              <video
                className="w-full aspect-video"
                controls
                autoPlay
                playsInline
                preload="metadata"
                src={videoUrl}
                title={isSinglePart ? title : `${title} - Episode ${episodeNum}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="mt-4 text-[#808080] text-sm">
              Sample video from the internet. In production, this would stream the episode for this drama.
            </p>
          </div>

          {!isSinglePart && (
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
                    {episodes.map((num) => (
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
