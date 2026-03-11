'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/shared/Loading';
import DramaCardCompact from '@/components/drama/DramaCardCompact';
import Pagination from '@/components/shared/Pagination';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

const PAGE_SIZE = 12;

export default function BrowsePage() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dramas, setDramas] = useState<{ id: string; title: string; episodes: number; image: string }[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/movies');
        const data = await res.json();
        setDramas(Array.isArray(data) ? data : []);
      } catch {
        setDramas([]);
      } finally {
        setLoading(false);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    run();
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(dramas.length / PAGE_SIZE));
  const paginatedDramas = dramas.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Browse</h1>
            <p className="text-[#808080] mt-2">Discover your next favorite movie or series</p>
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

        {/* Drama Grid */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {paginatedDramas.map((drama) => (
              <DramaCardCompact
                key={drama.id}
                id={drama.id}
                title={drama.title}
                episodes={drama.episodes}
                image={drama.image}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && dramas.length > 0 && totalPages > 1 && (
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

