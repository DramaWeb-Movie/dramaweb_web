'use client';

import { useState } from 'react';
import DramaGrid from '@/components/drama/DramaGrid';
import Button from '@/components/ui/Button';
import type { Drama } from '@/types';
import { FiUser, FiHeart, FiClock, FiSettings, FiEdit2 } from 'react-icons/fi';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'favorites' | 'history'>('favorites');
  const [favorites] = useState<Drama[]>([]);
  const [history] = useState<Drama[]>([]);

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 mb-8 border border-[#333333]/50">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-[#E31837] to-[#E31837] rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                <FiUser className="text-5xl" />
              </div>
              <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#252525] border border-[#333333] rounded-lg flex items-center justify-center text-white hover:bg-[#333333] transition-colors">
                <FiEdit2 className="text-sm" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">User Profile</h1>
              <p className="text-[#808080] mb-4">Member since 2024</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="bg-[#252525] rounded-xl px-4 py-2 border border-[#333333]/50">
                  <span className="text-[#E31837] font-bold">{favorites.length}</span>
                  <span className="text-[#B3B3B3] ml-2">Favorites</span>
                </div>
                <div className="bg-[#252525] rounded-xl px-4 py-2 border border-[#333333]/50">
                  <span className="text-[#E31837] font-bold">{history.length}</span>
                  <span className="text-[#B3B3B3] ml-2">Watched</span>
                </div>
              </div>
            </div>
            <Button variant="secondary" className="flex items-center gap-2">
              <FiSettings className="text-lg" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-[#333333]">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-2 pb-4 px-2 font-semibold transition-all ${
                  activeTab === 'favorites'
                    ? 'border-b-2 border-[#E31837] text-[#E31837]'
                    : 'text-[#808080] hover:text-white'
                }`}
              >
                <FiHeart />
                Favorites ({favorites.length})
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 pb-4 px-2 font-semibold transition-all ${
                  activeTab === 'history'
                    ? 'border-b-2 border-[#E31837] text-[#E31837]'
                    : 'text-[#808080] hover:text-white'
                }`}
              >
                <FiClock />
                Watch History ({history.length})
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'favorites' ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">My Favorites</h2>
            <DramaGrid 
              dramas={favorites}
              emptyMessage="No favorites yet. Start adding movies and series to your favorites!"
            />
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Watch History</h2>
            <DramaGrid 
              dramas={history}
              emptyMessage="No watch history yet. Start streaming to track your progress!"
            />
          </div>
        )}
      </div>
    </div>
  );
}

