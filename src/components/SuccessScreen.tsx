import React from 'react';
import { ApplicationRecord } from '../types';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { InterestCounter } from './InterestCounter';

interface SuccessScreenProps {
  currentCount: number;
  onClose: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  currentCount,
  onClose,
}) => {
  return (
    <div className="space-y-6 text-center">
      {/* Check icon & Primary Confirmation */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle className="w-6 h-6 stroke-[2.2]" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141413]">
          You're on the list.
        </h2>

        <p className="text-sm sm:text-base text-neutral-600 mt-2 max-w-md mx-auto leading-relaxed">
          We've received your interest. We'll review the applications and reach out to selected students.
        </p>

        {/* Live Interest Counter */}
        <div className="mt-4 inline-flex items-center justify-center">
          <InterestCounter count={currentCount} />
        </div>
      </div>

      {/* Trust & Review Statement */}
      <div className="p-3.5 bg-neutral-100/80 rounded-xl text-left text-xs text-neutral-600 space-y-1 border border-neutral-200/60">
        <p className="font-semibold text-neutral-800">
          What happens next?
        </p>
        <p className="leading-relaxed text-neutral-600">
          We review each application on a rolling basis. Because projects involve real team deliverables, we select a limited number of students per intake to ensure genuine mentorship and project ownership.
        </p>
      </div>

      {/* Bottom Dismiss / Review CTA */}
      <div className="pt-2">
        <button
          onClick={onClose}
          className="w-full py-3 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 bg-transparent hover:bg-neutral-100 rounded-xl transition-colors cursor-pointer"
        >
          Return to home
        </button>
      </div>
    </div>
  );
};
