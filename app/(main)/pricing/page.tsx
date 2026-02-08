import Link from 'next/link';
import Button from '@/components/ui/Button';
import { FiFilm, FiDollarSign, FiCheck, FiPlay } from 'react-icons/fi';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose how you watch</h1>
          <p className="text-[#B3B3B3] text-lg max-w-2xl mx-auto">
            Single movies: pay per title. Series: unlock everything with a monthly subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Pay per movie */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#333333]/50">
              <div className="w-12 h-12 rounded-xl bg-[#E31837]/20 flex items-center justify-center mb-4">
                <FiFilm className="text-2xl text-[#E31837]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Single movie</h2>
              <p className="text-[#B3B3B3] text-sm">
                Pay once per movie. Buy to own and watch anytime.
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-white">From</span>
                <span className="text-4xl font-bold text-[#E31837]">$4.99</span>
              </div>
              <p className="text-[#808080] text-sm mb-6">per movie</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                  <FiCheck className="text-[#E31837] shrink-0" /> Pay only for what you watch
                </li>
                <li className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                  <FiCheck className="text-[#E31837] shrink-0" /> Buy once, watch anytime
                </li>
              </ul>
              <Link href="/browse" className="mt-auto">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <FiDollarSign className="text-lg" /> Browse movies
                </Button>
              </Link>
            </div>
          </div>

          {/* Monthly series */}
          <div className="bg-[#1A1A1A] rounded-2xl border-2 border-[#E31837]/50 overflow-hidden flex flex-col relative">
            <div className="absolute top-0 right-0 bg-[#E31837] text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl">
              Popular
            </div>
            <div className="p-6 border-b border-[#333333]/50">
              <div className="w-12 h-12 rounded-xl bg-[#E31837]/20 flex items-center justify-center mb-4">
                <FiPlay className="text-2xl text-[#E31837]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Series subscription</h2>
              <p className="text-[#B3B3B3] text-sm">
                Monthly access to all series. Binge every episode, cancel anytime.
              </p>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[#E31837]">$9.99</span>
                <span className="text-[#808080]">/month</span>
              </div>
              <p className="text-[#808080] text-sm mb-6">Billed monthly. No commitment.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                  <FiCheck className="text-[#E31837] shrink-0" /> All series, all episodes
                </li>
                <li className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                  <FiCheck className="text-[#E31837] shrink-0" /> New episodes as they release
                </li>
                <li className="flex items-center gap-2 text-[#B3B3B3] text-sm">
                  <FiCheck className="text-[#E31837] shrink-0" /> Cancel anytime
                </li>
              </ul>
              <Link href="/browse" className="mt-auto">
                <Button className="w-full flex items-center justify-center gap-2">
                  <FiDollarSign className="text-lg" /> Subscribe now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <p className="text-center text-[#808080] text-sm mt-10">
          Prices may vary by title. Subscription grants access to series content only; movies are sold separately.
        </p>
      </div>
    </div>
  );
}
