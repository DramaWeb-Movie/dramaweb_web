import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';
import { FaStar } from 'react-icons/fa';
import { FiPlay, FiHeart, FiShare2, FiCalendar, FiGlobe, FiFilm, FiClock, FiDollarSign } from 'react-icons/fi';

// Mock data: movie = single-part (pay per title), series = monthly subscription.
const MOCK_DRAMAS: Record<string, Omit<Drama, 'episodes'> & { episodes: Drama['episodes'] }> = {
  '1': { id: '1', title: "Sonny's Competition", description: "A gripping tale of rivalry and ambition. When two talented competitors cross paths, they must navigate friendship, betrayal, and the high stakes of their shared dream.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2024, rating: 8.5, genres: ['Drama', 'Romance', 'Competition'], country: 'South Korea', episodes: [], cast: [{ id: 'c1', name: 'Lee Min-ho', role: 'Lead' }, { id: 'c2', name: 'Park Shin-hye', role: 'Lead' }, { id: 'c3', name: 'Kim Soo-hyun', role: 'Supporting' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 5.99, rentPrice: 2.99 },
  '2': { id: '2', title: 'Deliver Me', description: "In a world of secrets and sacrifice, one delivery changes everything. A suspenseful journey through love, loss, and the choices that define us.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2024, rating: 8.2, genres: ['Thriller', 'Mystery', 'Romance'], country: 'South Korea', episodes: [], cast: [{ id: 'c4', name: 'Song Joong-ki', role: 'Lead' }, { id: 'c5', name: 'Jun Ji-hyun', role: 'Lead' }], status: 'ongoing', totalEpisodes: 55, contentType: 'series', monthlyPrice: 9.99 },
  '3': { id: '3', title: 'My Billionaire Lover and Our Forgotten Love', description: "A second-chance romance between a billionaire and his lost love. Past wounds and buried memories resurface as they rediscover what they once had.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2023, rating: 8.8, genres: ['Romance', 'Drama', 'Billionaire'], country: 'China', episodes: [], cast: [{ id: 'c6', name: 'Yang Yang', role: 'Lead' }, { id: 'c7', name: 'Dilraba', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 2.99 },
  '4': { id: '4', title: "My Crush Thinks I'm A Boy", description: "A hilarious mix-up leads to unexpected feelings. She hides her identity, he falls for who he thinks she is, and the truth could change everything.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2024, rating: 7.9, genres: ['Comedy', 'Romance', 'Identity'], country: 'South Korea', episodes: [], cast: [{ id: 'c8', name: 'Nam Joo-hyuk', role: 'Lead' }, { id: 'c9', name: 'Kim Tae-ri', role: 'Lead' }], status: 'ongoing', totalEpisodes: 59, contentType: 'series', monthlyPrice: 9.99 },
  '5': { id: '5', title: "Everything's on My Side: Daddy, I'm Coming", description: "Family, fate, and a father's love. A heartwarming story of reunion and the bonds that survive time and distance.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2023, rating: 8.1, genres: ['Family', 'Drama', 'Reunion'], country: 'China', episodes: [], cast: [{ id: 'c10', name: 'Chen Kun', role: 'Lead' }, { id: 'c11', name: 'Zhou Xun', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 6.99, rentPrice: 3.49 },
  '6': { id: '6', title: 'Divorce? No Big Deal', description: "When a marriage ends, life begins again. A witty, modern take on moving on, finding yourself, and maybe finding love when you least expect it.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2024, rating: 8.0, genres: ['Comedy', 'Drama', 'Romance'], country: 'South Korea', episodes: [], cast: [{ id: 'c12', name: 'Ji Chang-wook', role: 'Lead' }, { id: 'c13', name: 'Son Ye-jin', role: 'Lead' }], status: 'ongoing', totalEpisodes: 74, contentType: 'series', monthlyPrice: 9.99 },
  '7': { id: '7', title: 'Another Drama Title', description: "An unforgettable story of courage and connection. In a world of challenges, the human spirit finds a way to shine.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2023, rating: 7.7, genres: ['Drama', 'Inspirational'], country: 'Japan', episodes: [], cast: [{ id: 'c14', name: 'Actor A', role: 'Lead' }, { id: 'c15', name: 'Actor B', role: 'Supporting' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 1.99 },
  '8': { id: '8', title: 'More Drama Content', description: "Twists and turns at every corner. A compelling narrative that keeps you guessing until the very end.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2024, rating: 8.3, genres: ['Suspense', 'Mystery'], country: 'South Korea', episodes: [], cast: [{ id: 'c16', name: 'Actor C', role: 'Lead' }, { id: 'c17', name: 'Actor D', role: 'Lead' }], status: 'ongoing', totalEpisodes: 62, contentType: 'series', monthlyPrice: 9.99 },
  '9': { id: '9', title: 'Epic Love Story', description: "A love that spans years and trials. Two souls destined to meet, part, and find each other again against all odds.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2023, rating: 8.6, genres: ['Romance', 'Drama', 'Destiny'], country: 'China', episodes: [], cast: [{ id: 'c18', name: 'Actor E', role: 'Lead' }, { id: 'c19', name: 'Actor F', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 5.49, rentPrice: 2.99 },
  '10': { id: '10', title: 'Revenge Plot', description: "Wronged in the past, determined in the present. A calculated journey of justice and redemption that will keep you on the edge of your seat.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2024, rating: 8.4, genres: ['Revenge', 'Thriller', 'Drama'], country: 'South Korea', episodes: [], cast: [{ id: 'c20', name: 'Actor G', role: 'Lead' }, { id: 'c21', name: 'Actor H', role: 'Antagonist' }], status: 'ongoing', totalEpisodes: 67, contentType: 'series', monthlyPrice: 9.99 },
  '11': { id: '11', title: 'Family Secrets', description: "Behind every family photo lies a story. Long-buried secrets surface and force one family to confront the past to save their future.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2023, rating: 7.8, genres: ['Family', 'Mystery', 'Drama'], country: 'Japan', episodes: [], cast: [{ id: 'c22', name: 'Actor I', role: 'Lead' }, { id: 'c23', name: 'Actor J', role: 'Supporting' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 2.99 },
  '12': { id: '12', title: 'Hidden Identity', description: "Who can you trust when no one is who they seem? A tale of disguise, loyalty, and the price of living a double life.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2024, rating: 8.2, genres: ['Thriller', 'Identity', 'Suspense'], country: 'South Korea', episodes: [], cast: [{ id: 'c24', name: 'Actor K', role: 'Lead' }, { id: 'c25', name: 'Actor L', role: 'Lead' }], status: 'ongoing', totalEpisodes: 48, contentType: 'series', monthlyPrice: 9.99 },
  '13': { id: '13', title: 'Midnight in Seoul', description: "A lone detective races against time through the neon-lit streets of Seoul to solve a case that blurs the line between past and present.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2024, rating: 8.0, genres: ['Thriller', 'Crime', 'Mystery'], country: 'South Korea', episodes: [], cast: [{ id: 'c26', name: 'Park Seo-joon', role: 'Lead' }, { id: 'c27', name: 'Kim Ji-won', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 5.99, rentPrice: 2.99 },
  '14': { id: '14', title: 'The Last Letter', description: "Two strangers connected by a lost letter must decide whether to follow their hearts or the expectations of those around them.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2023, rating: 8.3, genres: ['Romance', 'Drama'], country: 'Japan', episodes: [], cast: [{ id: 'c28', name: 'Oguri Shun', role: 'Lead' }, { id: 'c29', name: 'Shibasaki Kou', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 1.99 },
  '15': { id: '15', title: 'Silent Storm', description: "In the aftermath of a natural disaster, a small community must band together and confront long-hidden truths to survive.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2024, rating: 7.9, genres: ['Drama', 'Survival'], country: 'China', episodes: [], cast: [{ id: 'c30', name: 'Zhang Yi', role: 'Lead' }, { id: 'c31', name: 'Zhou Dongyu', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 5.49, rentPrice: 2.49 },
  '16': { id: '16', title: 'Between Two Worlds', description: "A woman discovers she can communicate with the spirit world and must use her gift to prevent a tragedy that spans both realms.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2023, rating: 8.1, genres: ['Fantasy', 'Drama', 'Mystery'], country: 'South Korea', episodes: [], cast: [{ id: 'c32', name: 'Han So-hee', role: 'Lead' }, { id: 'c33', name: 'Ahn Hyo-seop', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 6.99, rentPrice: 3.49 },
  '17': { id: '17', title: 'Echoes of Tomorrow', description: "A scientist accidentally opens a window to the future and must choose between changing destiny or preserving the timeline.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2024, rating: 8.4, genres: ['Sci-Fi', 'Thriller'], country: 'Japan', episodes: [], cast: [{ id: 'c34', name: 'Matsuyama Kenichi', role: 'Lead' }, { id: 'c35', name: 'Toda Erika', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 5.99, rentPrice: 2.99 },
  '18': { id: '18', title: 'The Forgotten Garden', description: "A young woman inherits an overgrown garden and uncovers letters that reveal a love story spanning three generations.", posterUrl: '/sampleData/movieTitle/movie3.png', bannerUrl: '/sampleData/movieTitle/movie3.png', releaseYear: 2023, rating: 7.8, genres: ['Romance', 'Drama', 'Family'], country: 'China', episodes: [], cast: [{ id: 'c36', name: 'Liu Yifei', role: 'Lead' }, { id: 'c37', name: 'Li Xian', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 2.99 },
  '19': { id: '19', title: 'City of Shadows', description: "In a metropolis where nothing is as it seems, a journalist and a detective team up to expose a conspiracy that reaches the highest levels of power.", posterUrl: '/sampleData/movieTitle/movie1.png', bannerUrl: '/sampleData/movieTitle/movie1.png', releaseYear: 2024, rating: 8.2, genres: ['Thriller', 'Crime', 'Political'], country: 'South Korea', episodes: [], cast: [{ id: 'c38', name: 'Yoo Ah-in', role: 'Lead' }, { id: 'c39', name: 'Jeon Jong-seo', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 6.49, rentPrice: 3.99 },
  '20': { id: '20', title: 'One Summer Day', description: "During one transformative summer, two childhood friends reunite and must confront old wounds and new feelings before the season ends.", posterUrl: '/sampleData/movieTitle/movie2.png', bannerUrl: '/sampleData/movieTitle/movie2.png', releaseYear: 2023, rating: 8.0, genres: ['Romance', 'Drama', 'Coming of Age'], country: 'Japan', episodes: [], cast: [{ id: 'c40', name: 'Ryusei Ryo', role: 'Lead' }, { id: 'c41', name: 'Hamabe Minami', role: 'Lead' }], status: 'completed', totalEpisodes: 1, contentType: 'movie', price: 4.99, rentPrice: 2.49 },
};

async function getDrama(id: string): Promise<Drama | null> {
  const drama = MOCK_DRAMAS[id];
  if (!drama) return null;
  return drama as Drama;
}

export default async function DramaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const drama = await getDrama(id);

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

