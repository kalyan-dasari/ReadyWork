import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ApplicationRecord } from '../types';

interface HeaderProps {
  onOpenApply: () => void;
  userSubmission: ApplicationRecord | null;
  onViewSubmission: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenApply,
  userSubmission,
  onViewSubmission,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF9]/90 backdrop-blur-md border-b border-black/[0.06] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-sm sm:text-base font-bold tracking-tight text-[#141413] hover:opacity-80 transition-opacity whitespace-nowrap"
        >
          ARE YOU READY TO WORK?
        </a>

        {/* Zone 2: Clean unboxed metadata with typographic separators */}
        <div className="hidden md:flex items-center gap-2.5 text-xs text-neutral-500 font-medium tracking-tight">
          <span>Selective Intake</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>College Students</span>
          <span aria-hidden="true" className="text-neutral-300">·</span>
          <span>Applications Open</span>
        </div>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {userSubmission ? (
            <button
              onClick={onViewSubmission}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-800 bg-neutral-200/80 hover:bg-neutral-300/80 rounded-md transition-colors cursor-pointer"
            >
              <span>Applied</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onOpenApply}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-md transition-all whitespace-nowrap shadow-sm cursor-pointer"
            >
              I'M INTERESTED
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
