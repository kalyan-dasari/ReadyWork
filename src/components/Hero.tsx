import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InterestCounter } from './InterestCounter';
import { motion } from 'motion/react';

interface HeroProps {
  interestCount: number;
  onOpenApply: () => void;
  hasApplied: boolean;
  onViewSubmission: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  interestCount,
  onOpenApply,
  hasApplied,
  onViewSubmission,
}) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
      {/* Subtle grid background texture with ultra-low opacity */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Eyebrow / Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 sm:mb-6"
        >
          <span className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500">
            Student Work Experience Program
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-[#141413] leading-[1.05] sm:leading-[1.02] mb-6 sm:mb-8"
          style={{ textWrap: 'balance' }}
        >
          ARE YOU
          <br />
          READY TO WORK?
        </motion.h1>

        {/* Supporting Line & Secondary Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5"
        >
          <p className="text-lg sm:text-2xl font-medium text-neutral-700 leading-snug">
            We're looking for students who are ready to gain real-world experience.
          </p>
          <p className="text-sm sm:text-base text-neutral-500 font-normal">
            Think you're ready? Show us.
          </p>
        </motion.div>

        {/* Primary CTA Decision Area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="flex flex-col items-center gap-3.5"
        >
          {hasApplied ? (
            <button
              onClick={onViewSubmission}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-black/10 cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              <span>View Your Registration</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <button
              onClick={onOpenApply}
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold tracking-tight text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/15 cursor-pointer min-h-[48px] w-full sm:w-auto"
            >
              <span>I'M INTERESTED</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}

          {/* Under CTA details */}
          <div className="flex flex-col items-center gap-1.5 pt-1">
            <span className="text-xs font-medium text-neutral-500">
              Applications are currently open.
            </span>

            {/* Subtle live interest counter */}
            <InterestCounter count={interestCount} className="mt-1" />
          </div>
        </motion.div>

        {/* Small supporting statement / trust rule */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-10 sm:mt-12 text-xs text-neutral-400 max-w-md mx-auto leading-relaxed"
        >
          Selection is based on your application, interest, potential and other factors. Applications will be reviewed and a limited number of students will be selected.
        </motion.p>
      </div>
    </section>
  );
};
