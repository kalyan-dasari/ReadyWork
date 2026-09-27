import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface InterestCounterProps {
  count: number;
  className?: string;
}

export const InterestCounter: React.FC<InterestCounterProps> = ({
  count,
  className = '',
}) => {
  const [displayCount, setDisplayCount] = useState(count);

  useEffect(() => {
    setDisplayCount(count);
  }, [count]);

  const formattedCount = displayCount.toLocaleString('en-US');

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-500 font-medium ${className}`}
      aria-live="polite"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <span className="flex items-center gap-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={formattedCount}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="tabular-nums font-semibold text-neutral-800"
          >
            {formattedCount}
          </motion.span>
        </AnimatePresence>
        <span>students have shown interest</span>
      </span>
    </div>
  );
};
