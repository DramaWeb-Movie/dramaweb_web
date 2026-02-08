'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/shared/Loading';
import TagFilter from '@/components/shared/TagFilter';
import DramaCardCompact from '@/components/drama/DramaCardCompact';
import Pagination from '@/components/shared/Pagination';
import { SERIES } from '@/lib/mock-content';
import { FiFilter, FiGrid, FiList, FiPlay } from 'react-icons/fi';

export default function SeriesPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(SERIES.length / 12));

  const tags = [
    'All', 'Thriller', 'Mystery', 'Romance', 'Comedy', 'Suspense', 'Identity', 'Drama',
  ];

  const [items, setItems] = useState(SERIES);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 200));
      setItems(SERIES);
      setLoading(false);
    };
    run();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTag, currentPage]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-[#E31837]/20 flex items-center justify-center">
                <FiPlay className="text-[#E31837] text-xl" />
              </span>
              Series
            </h1>
            <p className="text-[#808080] mt-2">Subscribe monthly to stream all episodes.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#333333] text-[#B3B3B3] hover:text-white hover:border-[#E31837] transition-all">
              <FiFilter className="text-lg" />
            </button>
            <button className="p-2.5 rounded-xl bg-[#E31837] text-white">
              <FiGrid className="text-lg" />
            </button>
            <button className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#333333] text-[#B3B3B3] hover:text-white hover:border-[#E31837] transition-all">
              <FiList className="text-lg" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <TagFilter tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {items.map((item) => (
              <DramaCardCompact
                key={item.id}
                id={item.id}
                title={item.title}
                episodes={item.episodes}
                image={item.image}
              />
            ))}
          </div>
        )}

        {!loading && items.length === 0 && (
          <p className="text-[#808080] text-center py-12">No series found.</p>
        )}

        {!loading && items.length > 0 && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
