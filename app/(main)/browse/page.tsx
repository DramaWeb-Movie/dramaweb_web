'use client';

import { useState, useEffect } from 'react';
import Loading from '@/components/shared/Loading';
import TagFilter from '@/components/shared/TagFilter';
import DramaCardCompact from '@/components/drama/DramaCardCompact';
import Pagination from '@/components/shared/Pagination';

export default function BrowsePage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 256; // Total number of pages - adjust based on your data

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

  // Sample dramas data - replace with actual API data
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
    // Simulate filtering by tag and page
    const filterDramas = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      // In real app, filter based on selectedTag and currentPage
      setDramas(sampleDramas);
      setLoading(false);
    };

    filterDramas();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedTag, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Tag Filter Section */}
        <div className="mb-6">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
          <div className="mt-8">
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

