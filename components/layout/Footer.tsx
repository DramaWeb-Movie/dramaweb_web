'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-100 text-gray-800 mt-auto border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative w-12 h-12">
                <Image
                  src="/image/Reeltime Icon.png"
                  alt="ReelTime Media"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-gray-900">Reel</span>
                  <span className="gradient-text">Time</span>
                </span>
                <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Media</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
              {t('tagline')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#E31837] hover:text-white transition-all duration-300" aria-label="Facebook">
                <FiFacebook className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#E31837] hover:text-white transition-all duration-300" aria-label="Twitter">
                <FiTwitter className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#E31837] hover:text-white transition-all duration-300" aria-label="Instagram">
                <FiInstagram className="text-lg" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#E31837] hover:text-white transition-all duration-300" aria-label="YouTube">
                <FiYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">{t('quickLinks')}</h3>
            <ul className="space-y-3">
              {(['home', 'browse', 'movies', 'series', 'pricing'] as const).map((key) => (
                <li key={key}>
                  <Link href={`/${key === 'home' ? 'home' : key}`} className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                    {t(key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/profile" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  {t('myProfile')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">{t('categories')}</h3>
            <ul className="space-y-3">
              {(['action', 'romance', 'comedy', 'thriller', 'drama'] as const).map((key) => (
                <li key={key}>
                  <Link href={`/browse?genre=${key}`} className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-semibold text-sm uppercase tracking-wider mb-5">{t('contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="text-[#E31837] mt-0.5" />
                <span className="text-gray-500 text-sm">support@reeltime.media</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-[#E31837] mt-0.5" />
                <span className="text-gray-500 text-sm">+855 12 345 678</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#E31837] mt-0.5 shrink-0" />
                <span className="text-gray-500 text-sm">Phnom Penh, Cambodia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-gray-900 text-sm transition-colors">
                {t('privacyPolicy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-gray-900 text-sm transition-colors">
                {t('termsOfService')}
              </Link>
              <Link href="/faq" className="text-gray-400 hover:text-gray-900 text-sm transition-colors">
                {t('faq')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
