import React from 'react';
import { ApplicationRecord } from '../types';
import { X, CheckCircle } from 'lucide-react';
import { ShareCard } from './ShareCard';

interface SubmissionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  submission: ApplicationRecord | null;
}

export const SubmissionDrawer: React.FC<SubmissionDrawerProps> = ({
  isOpen,
  onClose,
  submission,
}) => {
  if (!isOpen || !submission) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-bold text-[#141413]">
              Your Application
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Applicant
            </span>
            <h3 className="text-lg font-bold text-[#141413]">
              {submission.fullName}
            </h3>
            <p className="text-xs text-neutral-500">
              {submission.college} · {submission.year}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="text-neutral-400 block mb-1">Primary Skill</span>
              <strong className="text-neutral-800 font-semibold">
                {submission.primarySkill}
              </strong>
            </div>

            <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
              <span className="text-neutral-400 block mb-1">Readiness Tier</span>
              <strong className="text-neutral-800 font-semibold capitalize">
                {submission.readinessLevel.replace(/_/g, ' ')}
              </strong>
            </div>
          </div>

          <ShareCard />

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#141413] hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
