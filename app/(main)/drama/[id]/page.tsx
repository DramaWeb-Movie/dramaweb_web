import { notFound } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';
import { FaStar } from 'react-icons/fa';

// This would be replaced with actual API call
async function getDrama(id: string): Promise<Drama | null> {
  // Simulate API call
  return null;
}

export default async function DramaDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const drama = await getDrama(params.id);

  if (!drama) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[400px] md:h-[500px] bg-gray-900">
        {drama.bannerUrl && (
          <Image
            src={drama.bannerUrl}
            alt={drama.title}
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {drama.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {drama.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-[#FF6B00] text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="sticky top-24">
              <Image
                src={drama.posterUrl}
                alt={drama.title}
                width={300}
                height={450}
                className="w-full rounded-lg shadow-lg"
              />
              <Button className="w-full mt-4" size="lg">
                ▶ Watch Now
              </Button>
              <Button variant="outline" className="w-full mt-2">
                + Add to Favorites
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">{drama.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Release Year:</span> {drama.releaseYear}
                </div>
                <div>
                  <span className="font-semibold">Country:</span> {drama.country}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={drama.status === 'completed' ? 'text-green-600' : 'text-blue-600'}>
                    {drama.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Episodes:</span> {drama.totalEpisodes}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Rating:</span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" /> {drama.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            {/* Episodes */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Episodes</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Array.from({ length: drama.totalEpisodes }, (_, i) => (
                  <button
                    key={i + 1}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition"
                  >
                    Episode {i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Cast</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {drama.cast.map((member) => (
                  <div key={member.id} className="text-center">
                    {member.imageUrl && (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        width={100}
                        height={100}
                        className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
                      />
                    )}
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
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

