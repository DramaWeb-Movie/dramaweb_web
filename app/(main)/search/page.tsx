'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/shared/SearchBar';
import DramaGrid from '@/components/drama/DramaGrid';
import Loading from '@/components/shared/Loading';
import { useDebounce } from '@/hooks/useDebounce';
import type { Drama } from '@/types';
import { FiSearch } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

function SearchContent() {
  const t = useTranslations('search');
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
      await new Promise(resolve => setTimeout(resolve, 500));
      setDramas([]);
      setLoading(false);
    };

    searchDramas();
  }, [debouncedQuery]);

  return (
    <>
      <div className="max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          <span className="gradient-text">{t('title')}</span> {t('contentLabel')}
        </h1>
        <SearchBar
          placeholder={t('placeholder')}
          onSearch={setQuery}
        />
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-lg text-gray-500">
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin w-4 h-4 border-2 border-[#E31837] border-t-transparent rounded-full"></span>
                {t('searching')}
              </span>
            ) : (
              <>
                {dramas.length > 0 ? (
                  <>{t('foundResults', { count: dramas.length, query })}</>
                ) : (
                  <>{t('noResultsFor', { query })}</>
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
          emptyMessage={t('noContentFound', { query })}
        />
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FiSearch className="text-3xl text-gray-400" />
          </div>
          <p className="text-xl text-gray-400">{t('startTyping')}</p>
        </div>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading />}>
          <SearchContent />
        </Suspense>
      </div>
    </div>
  );
}
