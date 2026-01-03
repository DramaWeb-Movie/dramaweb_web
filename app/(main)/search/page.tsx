'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/shared/SearchBar';
import DramaGrid from '@/components/drama/DramaGrid';
import Loading from '@/components/shared/Loading';
import { useDebounce } from '@/hooks/useDebounce';
import type { Drama } from '@/types';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [dramas, setDramas] = useState<Drama[]>([]);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const searchDramas = async () => {
      if (!debouncedQuery.trim()) {
        setDramas([]);
        return;
      }

      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Replace with actual search API call
      // const results = await searchDramas(debouncedQuery);
      setDramas([]); // Set search results here
      setLoading(false);
    };

    searchDramas();
  }, [debouncedQuery]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Search Dramas</h1>
        <SearchBar 
          placeholder="Search by title, actor, or genre..." 
          onSearch={setQuery}
        />
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-lg text-gray-600">
            {loading ? (
              'Searching...'
            ) : (
              <>
                {dramas.length > 0 ? (
                  <>Found {dramas.length} results for "{query}"</>
                ) : (
                  <>No results found for "{query}"</>
                )}
              </>
            )}
          </p>
        </div>
      )}

      {loading ? (
        <Loading />
      ) : query ? (
        <DramaGrid 
          dramas={dramas} 
          emptyMessage={`No dramas found for "${query}". Try a different search term.`}
        />
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">Start typing to search for dramas</p>
        </div>
      )}
    </div>
  );
}

