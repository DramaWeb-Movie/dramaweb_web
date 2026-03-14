'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { FiBell, FiUser, FiMenu, FiX, FiGlobe, FiChevronDown, FiPlay } from 'react-icons/fi';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'km', label: 'ខ្មែរ' },
];

export default function Header() {
  const t = useTranslations('nav');
  const tAuth = useTranslations('auth');
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState('km');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]+)/);
    setCurrentLocale(match ? match[1] : 'km');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const switchLanguage = useCallback((code: string) => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setCurrentLocale(code);
    setIsLanguageOpen(false);
    router.refresh();
  }, [router]);

  const selectedLabel = LANGUAGES.find((l) => l.code === currentLocale)?.label ?? 'ខ្មែរ';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-[#E5E7EB]' : 'bg-gradient-to-b from-white/90 to-transparent'
    }`}>
      <nav className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="shrink-0 hover:opacity-90 transition-opacity flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14">
              <Image
                src="/image/Reeltime Icon.png"
                alt="ReelTime Media"
                fill
                className="object-contain group-hover:scale-105 transition-transform"
                priority
                // Removed drop-shadow and no border added, as requested
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                <span className="text-black">Reel</span>
                <span className="gradient-text">Time</span>
              </span>
              <span className="text-[10px] md:text-xs text-[#B3B3B3] tracking-[0.2em] uppercase">Media</span>
            </div>
          </Link>

          {/* Center Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 rounded-full px-2 py-1 backdrop-blur-sm border border-gray-200/70">
            <Link
              href="/home"
              className="px-5 py-2.5 text-sm font-medium text-gray-900 hover:text-[#E31837] transition-colors rounded-full hover:bg-gray-100"
            >
              {t('home')}
            </Link>
            <Link
              href="/browse"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              {t('browse')}
            </Link>
            <Link
              href="/movies"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              {t('movies')}
            </Link>
            <Link
              href="/series"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
            >
              {t('series')}
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2.5 rounded-full hover:bg-gray-100 border border-transparent hover:border-gray-200"
                  aria-label={t('selectLanguage')}
                >
                  <FiGlobe className="text-lg" />
                  <span className="text-sm font-medium hidden lg:inline">{selectedLabel}</span>
                  <FiChevronDown className={`text-sm transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>

                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                          currentLocale === lang.code ? 'text-[#E31837] font-medium bg-red-50' : 'text-gray-600'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <>
                  <button
                    className="text-gray-500 hover:text-gray-900 transition-colors p-2.5 rounded-full hover:bg-gray-100 relative"
                    aria-label={t('notifications')}
                  >
                    <FiBell className="text-xl" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E31837] rounded-full"></span>
                  </button>
                  <Link
                    href="/profile"
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E31837] to-[#E31837] flex items-center justify-center text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    <FiUser className="text-lg" />
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium text-sm px-4 py-2"
                  >
                    {tAuth('signIn')}
                  </Link>
                  <Link
                    href="/register"
                    className="gradient-btn text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg"
                  >
                    {tAuth('getStarted')}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t('toggleMenu')}
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
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 pt-4 animate-in slide-in-from-top duration-200 bg-white/95 backdrop-blur-lg rounded-2xl px-2">
            <Link
              href="/home"
              className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href="/browse"
              className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('browse')}
            </Link>
            <Link
              href="/movies"
              className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('movies')}
            </Link>
            <Link
              href="/series"
              className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('series')}
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-3 px-4 py-3.5 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <FiPlay className="text-sm" />
              {t('app')}
            </Link>

            {/* Mobile Language Selector */}
            <div className="px-4 py-3">
              <label className="text-xs text-gray-500 font-medium mb-2 block uppercase tracking-wider">
                {t('language')}
              </label>
              <select
                value={currentLocale}
                onChange={(e) => switchLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#E31837] transition-colors"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#1A1A1A]">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Auth Buttons */}
            {isLoggedIn ? (
              <div className="px-4 pt-4 space-y-3">
                <Link
                  href="/profile"
                  className="flex items-center justify-center gap-3 w-full py-3 gradient-btn text-white rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiUser className="text-lg" />
                  {tAuth('profile')}
                </Link>
              </div>
            ) : (
              <div className="px-4 pt-4 space-y-3">
                <Link
                  href="/login"
                  className="block w-full text-center py-3 border border-gray-200 text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tAuth('signIn')}
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center py-3 gradient-btn text-white rounded-xl font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {tAuth('getStarted')}
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
