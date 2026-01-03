'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiMenu, FiX, FiGlobe, FiChevronDown } from 'react-icons/fi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('Khmer');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const languages = ['Khmer', 'English'];

  return (
    <header className="bg-white text-gray-800 sticky top-0 z-50 shadow-lg border-b border-gray-200">
      <nav className="max-w-[1920px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity flex items-center gap-3">
            <Image 
              src="/logo/logo3.png" 
              alt="DramaWeb Logo" 
              width={50}
              height={50}
              className="h-12 w-auto object-contain"
              priority
            />
            <span className="text-2xl font-bold bg-linear-to-r from-[#E60000] to-[#FF6B00] bg-clip-text text-transparent">
              DramaWeb
            </span>
          </Link>

          {/* Center Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/home" 
              className="text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/browse" 
              className="text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] transition-colors"
            >
              Browse
            </Link>
            <Link 
              href="/search" 
              className="text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] transition-colors"
            >
              App
            </Link>
          </div>

          {/* Right Section - Search & Icons */}
          <div className="flex items-center gap-4 flex-1 lg:flex-initial justify-end">
            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 max-w-md w-full lg:w-80 border border-gray-200">
              <FiSearch className="text-gray-500 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-gray-800 text-sm outline-none w-full placeholder-gray-500"
              />
            </div>

            {/* Icons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#FF6B00] transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
                  aria-label="Select Language"
                >
                  <FiGlobe className="text-lg" />
                  <span className="text-sm font-medium">{selectedLanguage}</span>
                  <FiChevronDown className={`text-sm transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                          selectedLanguage === lang ? 'text-[#FF6B00] font-medium' : 'text-gray-700'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                className="text-gray-700 hover:text-[#FF6B00] transition-colors p-1"
                aria-label="Notifications"
              >
                <FiBell className="text-xl" />
              </button>
              <Link 
                href="/profile" 
                className="text-gray-700 hover:text-[#FF6B00] transition-colors p-1"
              >
                <FiUser className="text-xl" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-[#FF6B00] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2 space-y-2 border-t border-gray-200 pt-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 mb-3 border border-gray-200">
              <FiSearch className="text-gray-500 text-lg mr-2" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-gray-800 text-sm outline-none w-full placeholder-gray-500"
              />
            </div>

            {/* Mobile Links */}
            <Link 
              href="/home" 
              className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/browse" 
              className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link 
              href="/search" 
              className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              App
            </Link>
            <Link 
              href="/profile" 
              className="block px-4 py-3 text-[15px] font-medium text-gray-700 hover:text-[#FF6B00] hover:bg-gray-100 rounded-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>

            {/* Mobile Language Selector */}
            <div className="px-4 py-2">
              <label className="text-xs text-gray-500 font-medium mb-2 block">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B00] focus:border-transparent"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

