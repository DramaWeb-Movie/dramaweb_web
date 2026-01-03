import { FaFacebook, FaInstagram, FaLink } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

interface SocialShareProps {
  url?: string;
  title?: string;
}

export default function SocialShare({ url, title }: SocialShareProps) {
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title || 'Check out this drama!';

  const handleShare = (platform: string) => {
    let shareLink = '';
    
    switch (platform) {
      case 'facebook':
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        shareLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        break;
      case 'instagram':
        // Instagram doesn't have a direct share URL, so we'll just copy the link
        handleCopyLink();
        return;
      case 'copy':
        handleCopyLink();
        return;
    }

    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-700 font-medium">Share:</span>
      <button
        onClick={() => handleShare('facebook')}
        className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="text-xl" />
      </button>
      <button
        onClick={() => handleShare('twitter')}
        className="w-10 h-10 rounded-full bg-black hover:bg-gray-800 flex items-center justify-center text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <FaXTwitter className="text-xl" />
      </button>
      <button
        onClick={() => handleShare('instagram')}
        className="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 via-pink-600 to-orange-600 hover:opacity-90 flex items-center justify-center text-white transition-opacity"
        aria-label="Share on Instagram"
      >
        <FaInstagram className="text-xl" />
      </button>
      <button
        onClick={() => handleShare('copy')}
        className="w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-500 flex items-center justify-center text-white transition-colors"
        aria-label="Copy link"
      >
        <FaLink className="text-lg" />
      </button>
    </div>
  );
}

