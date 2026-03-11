'use client';

import Link from 'next/link';
import { FiLock, FiPlay } from 'react-icons/fi';
import { usePaymentAccess } from '@/hooks/usePaymentAccess';
import Button from '@/components/ui/Button';

interface WatchAccessGateProps {
  contentId: string;
  contentType: 'movie' | 'series';
  videoUrl: string;
  title: string;
  episodeNum?: number;
  isSinglePart: boolean;
}

export default function WatchAccessGate({
  contentId,
  contentType,
  videoUrl,
  title,
  episodeNum,
  isSinglePart,
}: WatchAccessGateProps) {
  const { hasAccess, loading } = usePaymentAccess(
    contentType,
    contentType === 'movie' ? contentId : undefined
  );

  if (loading) {
    return (
      <div className="rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#333333]/50 shadow-2xl flex items-center justify-center aspect-video">
        <div className="animate-pulse w-10 h-10 border-2 border-[#E31837] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!hasAccess) {
    const isMovie = contentType === 'movie';

    return (
      <div className="rounded-2xl overflow-hidden bg-[#1A1A1A] border border-[#333333]/50 shadow-2xl flex flex-col items-center justify-center aspect-video px-6 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#E31837]/10 mb-4">
          <FiLock className="text-[#E31837] text-2xl" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">
          {isMovie ? 'Unlock this movie' : 'Subscribe to watch'}
        </h2>
        <p className="text-[#B3B3B3] text-sm max-w-md mb-4">
          {isMovie
            ? 'You need to complete a one-time payment to watch this movie any time.'
            : 'Get a subscription to unlock all episodes and keep watching without limits.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link href={`/drama/${contentId}`}>
            <Button className="flex items-center gap-2" size="md">
              <FiPlay className="text-lg" /> Go to details &amp; pay
            </Button>
          </Link>
          <p className="text-xs text-[#808080]">
            Once paid, you&apos;ll be able to watch {isMovie ? 'this movie' : 'this series'} any
            time from your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden bg-black border border-[#333333]/50 shadow-2xl">
      {videoUrl ? (
        <video
          className="w-full aspect-video"
          controls
          autoPlay
          playsInline
          preload="metadata"
          src={videoUrl}
          title={
            isSinglePart || !episodeNum ? title : `${title} - Episode ${episodeNum.toString()}`
          }
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full aspect-video flex items-center justify-center bg-[#1A1A1A] text-[#808080]">
          Video not available
        </div>
      )}
    </div>
  );
}

