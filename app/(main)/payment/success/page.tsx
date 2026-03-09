'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { FiCheck, FiPlay, FiHome, FiFilm, FiClock } from 'react-icons/fi';
import Button from '@/components/ui/Button';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const contentId = searchParams.get('id');
  const [isProcessing, setIsProcessing] = useState(true);

  // Brief delay to ensure webhook has processed
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] pt-24">
        <div className="container mx-auto px-4 md:px-8 py-8 max-w-2xl">
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#E31837]/20 flex items-center justify-center mx-auto mb-4">
              <FiClock className="text-4xl text-[#E31837] animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Confirming Payment...</h2>
            <p className="text-[#B3B3B3] mb-6">
              Please wait while we confirm your payment.
            </p>
            <div className="animate-spin w-8 h-8 border-2 border-[#E31837] border-t-transparent rounded-full mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-2xl">
        <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 p-8 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <FiCheck className="text-5xl text-green-500" />
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-white mb-3">Payment Successful!</h2>
          <p className="text-[#B3B3B3] mb-2">
            Thank you for your purchase. Your payment has been confirmed.
          </p>
          
          {orderId && (
            <p className="text-[#666666] text-sm mb-6">
              Order ID: <span className="font-mono text-[#808080]">{orderId}</span>
            </p>
          )}

          {/* Payment Details */}
          <div className="bg-[#0F0F0F] rounded-xl p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-[#808080] uppercase tracking-wider mb-3">
              What's Next?
            </h3>
            <ul className="space-y-2 text-[#B3B3B3] text-sm">
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500 shrink-0" />
                Your content is now available
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500 shrink-0" />
                Access is linked to your account
              </li>
              <li className="flex items-center gap-2">
                <FiCheck className="text-green-500 shrink-0" />
                Receipt sent to your email
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {contentId ? (
              <Link href={`/drama/${contentId}/watch`}>
                <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <FiPlay className="text-lg" /> Watch Now
                </Button>
              </Link>
            ) : (
              <Link href="/browse">
                <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <FiFilm className="text-lg" /> Browse Content
                </Button>
              </Link>
            )}
            <Link href="/home">
              <Button variant="outline" className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <FiHome className="text-lg" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 text-center">
          <p className="text-[#666666] text-sm">
            Having issues? Contact our{' '}
            <a href="/support" className="text-[#E31837] hover:underline">
              support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F0F0F] pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#E31837] border-t-transparent rounded-full" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
