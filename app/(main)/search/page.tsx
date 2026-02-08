'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/shared/SearchBar';
import DramaGrid from '@/components/drama/DramaGrid';
import Loading from '@/components/shared/Loading';
import { useDebounce } from '@/hooks/useDebounce';
import type { Drama } from '@/types';
import { FiSearch } from 'react-icons/fi';

function SearchContent() {
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
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="gradient-text">Search</span> Content
        </h1>
        <SearchBar 
          placeholder="Search by title, actor, or genre..." 
          onSearch={setQuery}
        />
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-lg text-[#B3B3B3]">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-[#E31837] border-t-transparent rounded-full"></span>
                Searching...
              </span>
            ) : (
              <>
                {dramas.length > 0 ? (
                  <>Found <span className="text-white font-semibold">{dramas.length}</span> results for "<span className="text-[#E31837]">{query}</span>"</>
                ) : (
                  <>No results found for "<span className="text-[#E31837]">{query}</span>"</>
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
          emptyMessage={`No content found for "${query}". Try a different search term.`}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-[#1A1A1A] flex items-center justify-center mb-4">
            <FiSearch className="text-3xl text-[#808080]" />
          </div>
          <p className="text-xl text-[#808080]">Start typing to search for movies & dramas</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}

