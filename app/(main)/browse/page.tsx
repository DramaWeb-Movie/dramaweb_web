'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/shared/Loading';
import TagFilter from '@/components/shared/TagFilter';
import DramaCardCompact from '@/components/drama/DramaCardCompact';
import Pagination from '@/components/shared/Pagination';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';

export default function BrowsePage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 256;

  // All available tags/genres
  const tags = [
    'All', 'Werewolves', 'Avenge', 'Divine Tycoon', 'Love Triangle', 'Revenge', 'Paranormal', 'Sudden Wealth',
    'Cinderella', 'Underdog Rise', 'Son-in-Law', 'Secret Identity', 'Second-chance Love', 'Comedy', 'Marriage', 'Mafia',
    'Influencer', 'Forbidden Love', 'Uplifting Series', 'Strong Female Lead', 'Romance', 'CEO', 'Marriage Before Love', 'Fantasy',
    'Soulmate', 'Trending', 'Concealed Identity', 'Counterattack', 'Disguise', 'Sweet Love', 'Suspense', 'Betrayal',
    'Urban', 'Turbulent Love', 'Werewolf', 'Mystery', 'Super Power', 'Enemies to Lovers', 'Billionaire', 'Hatred',
    'Alternative History', 'Badboy', 'Rebirth', 'Small Potato', 'Contract Lover', 'Toxic Love', 'Wealthy', 'Humor',
    'Misunderstanding', 'True Love', 'Comeback', 'Toxic Relationship', 'Contract Marriage', 'Family', 'Time Travel', 'Bitter Love',
    'Destiny', 'Twisted'
  ];

  // Sample dramas data
  const sampleDramas = [
    { id: '1', title: "Sonny's Competition", episodes: 50, image: '/sampleData/movieTitle/movie1.png' },
    { id: '2', title: 'Deliver Me', episodes: 55, image: '/sampleData/movieTitle/movie2.png' },
    { id: '3', title: 'My Billionaire Lover and Our Forgotten Love', episodes: 60, image: '/sampleData/movieTitle/movie3.png' },
    { id: '4', title: "My Crush Thinks I'm A Boy", episodes: 59, image: '/sampleData/movieTitle/movie1.png' },
    { id: '5', title: "Everything's on My Side: Daddy, I'm Coming", episodes: 70, image: '/sampleData/movieTitle/movie2.png' },
    { id: '6', title: 'Divorce? No Big Deal', episodes: 74, image: '/sampleData/movieTitle/movie3.png' },
    { id: '7', title: 'Another Drama Title', episodes: 45, image: '/sampleData/movieTitle/movie1.png' },
    { id: '8', title: 'More Drama Content', episodes: 62, image: '/sampleData/movieTitle/movie2.png' },
    { id: '9', title: 'Epic Love Story', episodes: 58, image: '/sampleData/movieTitle/movie3.png' },
    { id: '10', title: 'Revenge Plot', episodes: 67, image: '/sampleData/movieTitle/movie1.png' },
    { id: '11', title: 'Family Secrets', episodes: 52, image: '/sampleData/movieTitle/movie2.png' },
    { id: '12', title: 'Hidden Identity', episodes: 48, image: '/sampleData/movieTitle/movie3.png' },
  ];

  const [dramas, setDramas] = useState(sampleDramas);

  useEffect(() => {
    const filterDramas = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setDramas(sampleDramas);
      setLoading(false);
    };

    filterDramas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTag, currentPage]);

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

        {/* Tag Filter Section */}
        <div className="mb-8">
          <TagFilter 
            tags={tags} 
            selectedTag={selectedTag} 
            onTagSelect={setSelectedTag} 
          />
        </div>

        {/* Drama Grid */}
        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {dramas.map((drama) => (
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
        {!loading && dramas.length > 0 && (
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

