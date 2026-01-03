import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">DramaWeb</h3>
            <p className="text-sm">
              Your ultimate destination for Asian dramas. Watch the latest and greatest shows from across Asia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse" className="hover:text-white transition">
                  Browse Dramas
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/browse?genre=romance" className="hover:text-white transition">
                  Romance
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=action" className="hover:text-white transition">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=comedy" className="hover:text-white transition">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=thriller" className="hover:text-white transition">
                  Thriller
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Legal */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} DramaWeb. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

