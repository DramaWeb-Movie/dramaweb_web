import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-white mt-auto border-t border-[#1A1A1A]">
      {/* Main Footer Content */}
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
                  <span className="text-white">Reel</span>
                  <span className="gradient-text">Time</span>
                </span>
                <span className="text-[10px] text-[#808080] tracking-[0.2em] uppercase">Media</span>
              </div>
            </Link>
            <p className="text-[#B3B3B3] text-sm leading-relaxed mb-6 max-w-sm">
              Your premium destination for movies and dramas. Stream the latest blockbusters and timeless classics in stunning quality, anytime, anywhere.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B3B3B3] hover:bg-[#E31837] hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FiFacebook className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B3B3B3] hover:bg-[#E31837] hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <FiTwitter className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B3B3B3] hover:bg-[#E31837] hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <FiInstagram className="text-lg" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#B3B3B3] hover:bg-[#E31837] hover:text-white transition-all duration-300"
                aria-label="YouTube"
              >
                <FiYoutube className="text-lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/home" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Browse
                </Link>
              </li>
              <li>
                <Link href="/movies" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Movies
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Series
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/profile" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/browse?genre=action" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=romance" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=comedy" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=thriller" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Thriller
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=drama" className="text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm">
                  Drama
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="text-[#E31837] mt-0.5" />
                <span className="text-[#B3B3B3] text-sm">support@reeltime.media</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-[#E31837] mt-0.5" />
                <span className="text-[#B3B3B3] text-sm">+855 12 345 678</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#E31837] mt-0.5 shrink-0" />
                <span className="text-[#B3B3B3] text-sm">Phnom Penh, Cambodia</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#808080] text-sm">
              &copy; {new Date().getFullYear()} ReelTime Media. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[#808080] hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#808080] hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/faq" className="text-[#808080] hover:text-white text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

