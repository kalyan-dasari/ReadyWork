import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import { dataService } from '../services/dataService';

interface ShareCardProps {
  userReferralCode: string;
  applicantName?: string;
}

export const ShareCard: React.FC<ShareCardProps> = ({
  userReferralCode,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  // Construct absolute referral URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = `${origin}/?ref=${encodeURIComponent(userReferralCode)}`;

  const shareTitle = 'ARE YOU READY TO WORK?';
  const shareText = `Are you actually ready to work?\nI just applied for a student work-experience opportunity.\nYou should check it out:`;

  const stats = dataService.getReferralStats(userReferralCode);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      dataService.trackLinkCopied(userReferralCode);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleNativeShare = async () => {
    dataService.trackShare('web_share_api', userReferralCode);
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    dataService.trackShare('whatsapp', userReferralCode);
    const text = encodeURIComponent(`${shareText}\n${shareUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div className="bg-neutral-50 rounded-2xl border border-neutral-200/90 p-5 sm:p-6 text-left">
      {/* Editorial sharing kicker & headline */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#141413] tracking-tight">
          Know someone who's ready to work?
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
          Send this to the friend who keeps saying they need experience.
        </p>
      </div>

      {/* Generated Share Message Box */}
      <div className="mt-4 p-3.5 sm:p-4 bg-white rounded-xl border border-neutral-200/80 text-xs sm:text-sm text-neutral-700 font-normal leading-relaxed relative">
        <p className="font-medium text-neutral-900 mb-1">
          "Are you actually ready to work?
        </p>
        <p className="text-neutral-600">
          I just applied for a student work-experience opportunity. You should check it out."
        </p>
        <div className="mt-2 pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <span className="truncate max-w-[200px] sm:max-w-none">
            {shareUrl}
          </span>
          <span className="text-neutral-500 font-medium">Preview</span>
        </div>
      </div>

      {/* Interactive Action Buttons */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        {canNativeShare ? (
          <button
            onClick={handleNativeShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all cursor-pointer min-h-[44px]"
          >
            <Share2 className="w-4 h-4" />
            <span>{shared ? 'SHARED!' : 'SHARE'}</span>
          </button>
        ) : (
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all cursor-pointer min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>SHARE ON WHATSAPP</span>
          </button>
        )}

        <button
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-neutral-800 bg-white hover:bg-neutral-100 border border-neutral-300 active:scale-[0.98] rounded-xl transition-all cursor-pointer min-h-[44px]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">LINK COPIED!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-neutral-500" />
              <span>COPY LINK</span>
            </>
          )}
        </button>

        {canNativeShare && (
          <button
            onClick={handleWhatsAppShare}
            title="Share directly to WhatsApp"
            className="px-3.5 py-3 text-xs font-semibold text-neutral-700 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl transition-colors flex items-center justify-center cursor-pointer min-h-[44px]"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </button>
        )}
      </div>

      {/* Referral Performance / Impact Tracker */}
      <div className="mt-4 pt-3.5 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-3">
          <span>
            <strong className="text-neutral-800 font-semibold tabular-nums">
              {stats.visits}
            </strong>{' '}
            link clicks
          </span>
          <span className="text-neutral-300">·</span>
          <span>
            <strong className="text-neutral-800 font-semibold tabular-nums">
              {stats.applications}
            </strong>{' '}
            applied via you
          </span>
        </div>
        <span className="text-[11px] font-mono text-neutral-400">
          ref:{userReferralCode}
        </span>
      </div>
    </div>
  );
};
