'use client';

import { useState } from 'react';
import DramaGrid from '@/components/drama/DramaGrid';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');
  const [favorites] = useState<Drama[]>([]);
  const [history] = useState<Drama[]>([]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#E60000] to-[#FF6B00] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            U
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">User Profile</h1>
            <p className="text-gray-600">Member since 2024</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'favorites'
                  ? 'border-b-2 border-[#FF6B00] text-[#FF6B00]'
                  : 'text-gray-600 hover:text-[#FF6B00]'
              }`}
            >
              Favorites ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`pb-4 px-2 font-semibold transition ${
                activeTab === 'history'
                  ? 'border-b-2 border-[#FF6B00] text-[#FF6B00]'
                  : 'text-gray-600 hover:text-[#FF6B00]'
              }`}
            >
              Watch History ({history.length})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'favorites' ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
          <DramaGrid 
            dramas={favorites}
            emptyMessage="No favorites yet. Start adding dramas to your favorites!"
          />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6">Watch History</h2>
          <DramaGrid 
            dramas={history}
            emptyMessage="No watch history yet. Start watching some dramas!"
          />
        </div>
      )}
    </div>
  );
}

