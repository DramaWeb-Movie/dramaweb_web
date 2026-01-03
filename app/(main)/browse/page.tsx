'use client';

import { useState, useEffect } from 'react';
import DramaGrid from '@/components/drama/DramaGrid';
import Loading from '@/components/shared/Loading';
import type { Drama } from '@/types';

export default function BrowsePage() {
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const genres = ['All', 'Romance', 'Action', 'Comedy', 'Thriller', 'Historical', 'Fantasy', 'School', 'Crime'];
  const countries = ['All', 'Korea', 'Japan', 'China', 'Thailand', 'Taiwan'];

  useEffect(() => {
    // Simulate API call
    const fetchDramas = async () => {
      setLoading(true);
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDramas([]); // Set your dramas here
      setLoading(false);
    };

    fetchDramas();
  }, [selectedGenre, selectedCountry]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Browse Dramas</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Genre Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre.toLowerCase()}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
            >
              {countries.map((country) => (
                <option key={country} value={country.toLowerCase()}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="mb-4 text-gray-600">
            Showing {dramas.length} dramas
          </div>
          <DramaGrid 
            dramas={dramas} 
            emptyMessage="No dramas found. Try adjusting your filters."
          />
        </>
      )}
    </div>
  );
}

