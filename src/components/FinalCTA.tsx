import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InterestCounter } from './InterestCounter';

interface FinalCTAProps {
  onOpenApply: () => void;
  interestCount: number;
  hasApplied: boolean;
  onViewSubmission: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onOpenApply,
  interestCount,
  hasApplied,
  onViewSubmission,
}) => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAFAF9] border-t border-neutral-200/70 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Selective Cohort · Applications Open
        </span>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141413] mt-3 leading-tight">
          ARE YOU READY TO WORK?
        </h2>

        <p className="text-base sm:text-xl font-medium text-neutral-700 mt-4 leading-relaxed max-w-xl mx-auto">
          We're selecting a few students for real-world work experience.
        </p>

        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Think you're ready? Show us.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          {hasApplied ? (
            <button
              onClick={onViewSubmission}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#141413] hover:bg-neutral-800 rounded-xl transition-all shadow-md cursor-pointer w-full sm:w-auto"
            >
              <span>View Your Registration</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onOpenApply}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-bold tracking-tight text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-black/10 hover:shadow-lg cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              <span>I'M INTERESTED</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          <InterestCounter count={interestCount} className="mt-2" />
        </div>
      </div>
    </section>
  );
};
