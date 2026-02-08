'use client';

import { useId } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FiArrowLeft, FiSmartphone, FiDollarSign, FiFilm, FiCheck, FiPlay } from 'react-icons/fi';
import Button from '@/components/ui/Button';

/**
 * Build a KHQR-style payload for QR code.
 * In production, replace with a call to your backend/KHQR API (e.g. khqr.link, PayWay, or Bakong)
 * to get the real EMVCo payload (qr_data).
 */
function buildKHQRPayload(amount: number, currency: string, description: string, reference: string): string {
  const ref = reference.replace(/[^A-Za-z0-9-]/g, '').slice(0, 35);
  const amt = currency === 'KHR' ? Math.round(amount).toString() : amount.toFixed(2);
  return `00020101021226${ref}5204${currency}5303${currency === 'USD' ? '840' : '116'}54${amt.length}${amt}5802KH59${description.length}${description}6304`;
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const stableId = useId().replace(/:/g, '');
  const type = searchParams.get('type') || 'movie';
  const id = searchParams.get('id') || '';
  const amount = Math.max(0, Number(searchParams.get('amount')) || 4.99);
  const title = searchParams.get('title') || (type === 'subscription' ? 'Series subscription' : 'Movie purchase');
  const currency = (searchParams.get('currency') || 'USD').toUpperCase();
  const reference = searchParams.get('ref') || `RTL-${id || 'pay'}-${stableId}`;

  const isSubscription = type === 'subscription';
  const displayAmount = currency === 'KHR' ? (amount * 4100).toFixed(0) : amount.toFixed(2);
  const payloadAmount = currency === 'KHR' ? amount * 4100 : amount;
  const payload = buildKHQRPayload(
    payloadAmount,
    currency,
    `ReelTime - ${title}`,
    reference
  );

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-24">
      <div className="container mx-auto px-4 md:px-8 py-8 max-w-2xl">
        <Link
          href={id ? `/drama/${id}` : '/movies'}
          className="inline-flex items-center gap-2 text-[#B3B3B3] hover:text-[#E31837] transition-colors text-sm font-medium mb-8"
        >
          <FiArrowLeft className="text-lg" /> Back
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Pay with KHQR</h1>
        <p className="text-[#808080] text-sm mb-8">
          Scan the QR code with any KHQR-supported app to complete payment.
        </p>

        <div className="space-y-6">
          {/* Order summary */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FiFilm className="text-[#E31837]" /> Order summary
            </h2>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-white font-medium">{title}</p>
                <p className="text-[#808080] text-sm mt-0.5">
                  {isSubscription ? 'Monthly subscription' : 'Single movie (buy)'}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-[#E31837]">
                  {currency === 'KHR' ? `${displayAmount} KHR` : `$${displayAmount}`}
                </p>
                <p className="text-[#808080] text-xs mt-0.5">Ref: {reference}</p>
              </div>
            </div>
          </div>

          {/* KHQR QR code */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 p-8 flex flex-col items-center">
            <div className="w-12 h-12 rounded-xl bg-[#E31837]/20 flex items-center justify-center mb-4">
              <FiDollarSign className="text-2xl text-[#E31837]" />
            </div>
            <p className="text-white font-semibold mb-1">Scan to pay</p>
            <p className="text-[#808080] text-sm mb-6">
              {currency === 'KHR' ? `${displayAmount} KHR` : `$${displayAmount} USD`}
            </p>
            <div className="bg-white p-4 rounded-2xl">
              <QRCodeSVG
                value={payload}
                size={220}
                level="M"
                includeMargin={false}
              />
            </div>
            <p className="text-[#808080] text-xs mt-4 text-center max-w-xs">
              KHQR is supported by ABA, ACLEDA, Wing, PiPay, and other participating banks and e-wallets.
            </p>
            <Link
              href={id ? `/drama/${id}/watch` : '/movies'}
              className="mt-6 w-full sm:w-auto inline-block"
            >
              <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 border-dashed border-[#808080] text-[#B3B3B3] hover:border-[#E31837] hover:text-[#E31837]">
                <FiPlay className="text-lg" /> I paid (dev)
              </Button>
            </Link>
            <p className="text-[#808080] text-xs mt-2 text-center">Skip to content for development</p>
          </div>

          {/* Instructions */}
          <div className="bg-[#1A1A1A] rounded-2xl border border-[#333333]/50 p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FiSmartphone className="text-[#E31837]" /> How to pay
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#B3B3B3] text-sm">
                <FiCheck className="text-[#E31837] shrink-0 mt-0.5" />
                Open your bank or e-wallet app (ABA, ACLEDA, Wing, PiPay, etc.)
              </li>
              <li className="flex items-start gap-3 text-[#B3B3B3] text-sm">
                <FiCheck className="text-[#E31837] shrink-0 mt-0.5" />
                Select Scan / Pay with KHQR and scan this QR code
              </li>
              <li className="flex items-start gap-3 text-[#B3B3B3] text-sm">
                <FiCheck className="text-[#E31837] shrink-0 mt-0.5" />
                Confirm the amount and complete the payment
              </li>
              <li className="flex items-start gap-3 text-[#B3B3B3] text-sm">
                <FiCheck className="text-[#E31837] shrink-0 mt-0.5" />
                Your access will be activated once payment is confirmed
              </li>
            </ul>
          </div>

          <p className="text-[#808080] text-xs text-center">
            In production, integrate with a KHQR provider (e.g. khqr.link, PayWay, or your bank) to generate the official QR payload and confirm payments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F0F0F] pt-24 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#E31837] border-t-transparent rounded-full" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
