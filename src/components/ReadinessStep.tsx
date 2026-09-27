import React, { useState } from 'react';
import { ReadinessLevel } from '../types';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ReadinessStepProps {
  initialLevel?: ReadinessLevel;
  onBack: () => void;
  onSubmit: (level: ReadinessLevel) => void;
  isSubmitting: boolean;
}

interface TierDefinition {
  id: ReadinessLevel;
  level: number;
  title: string;
  subtitle: string;
  commitment: string;
  details: string;
}

const READINESS_TIERS: TierDefinition[] = [
  {
    id: 'exploring',
    level: 1,
    title: 'Just exploring',
    subtitle: 'Curious & observing',
    commitment: '5–8 hrs / week',
    details: 'Looking to see how real engineering and product teams work without heavy pressure.',
  },
  {
    id: 'interested',
    level: 2,
    title: 'Interested',
    subtitle: 'Committed to rapid learning',
    commitment: '10–14 hrs / week',
    details: 'Ready to dedicate scheduled hours, follow instructions, and pick up new tools fast.',
  },
  {
    id: 'ready_to_contribute',
    level: 3,
    title: 'Ready to contribute',
    subtitle: 'Shipping tangible output',
    commitment: '15–20 hrs / week',
    details: 'Have foundational skills, can work through blockers, and eager to ship actual tasks.',
  },
  {
    id: 'ready_to_lead',
    level: 4,
    title: 'Ready to take responsibility',
    subtitle: 'End-to-end project ownership',
    commitment: '20+ hrs / week',
    details: 'Self-driven, comfortable with ambiguity, ready to own deliverables and communicate directly.',
  },
];

export const ReadinessStep: React.FC<ReadinessStepProps> = ({
  initialLevel = 'ready_to_contribute',
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<ReadinessLevel>(initialLevel);

  const activeIndex = READINESS_TIERS.findIndex((t) => t.id === selectedLevel);
  const activeTier = READINESS_TIERS[activeIndex] || READINESS_TIERS[2];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(selectedLevel);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141413]">
          How ready are you to actually work on a project?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Be honest. We respect self-awareness far more than exaggerated claims.
        </p>
      </div>

      {/* Interactive Scale Stepper Bar */}
      <div className="bg-neutral-100 p-2 sm:p-2.5 rounded-xl border border-neutral-200">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
          {READINESS_TIERS.map((tier, idx) => {
            const isSelected = selectedLevel === tier.id;
            const isPassed = idx <= activeIndex;

            return (
              <button
                type="button"
                key={tier.id}
                onClick={() => setSelectedLevel(tier.id)}
                className={`relative flex flex-col items-center py-2 px-1 rounded-lg text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white shadow-sm text-[#141413]'
                    : isPassed
                    ? 'text-neutral-700 hover:bg-neutral-200/60'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold mb-1 transition-colors ${
                    isSelected
                      ? 'bg-[#141413] text-white'
                      : isPassed
                      ? 'bg-neutral-300 text-neutral-800'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {tier.level}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1">
                  {tier.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Tiers Detailed Selector */}
      <div className="space-y-2.5">
        {READINESS_TIERS.map((tier) => {
          const isSelected = selectedLevel === tier.id;
          return (
            <div
              key={tier.id}
              onClick={() => setSelectedLevel(tier.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-[#141413] bg-neutral-50 ring-1 ring-[#141413]'
                  : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      0{tier.level}
                    </span>
                    <h3 className="text-sm font-bold text-[#141413]">
                      {tier.title}
                    </h3>
                    <span className="text-xs text-neutral-400">·</span>
                    <span className="text-xs font-medium text-neutral-500">
                      {tier.commitment}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    {tier.details}
                  </p>
                </div>

                <div className="shrink-0 mt-0.5">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#141413] bg-[#141413] text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Notice */}
      <p className="text-xs text-neutral-400 text-center">
        Applications will be reviewed and a limited number of students will be selected.
      </p>

      {/* Form Action Controls */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer min-h-[48px] disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.99] rounded-xl transition-all shadow-md shadow-black/10 cursor-pointer min-h-[48px] disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>SUBMITTING...</span>
            </>
          ) : (
            <>
              <span>SUBMIT APPLICATION</span>
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
