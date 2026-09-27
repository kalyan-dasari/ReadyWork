import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200/80 bg-white py-12 text-neutral-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <span className="font-bold text-neutral-900 tracking-tight text-sm">
            ARE YOU READY TO WORK?
          </span>
          <p className="mt-1 text-neutral-400">
            Real-world work experience for ambitious college students.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-500 font-medium">
          <span>Student Work Experience Program</span>
          <span className="text-neutral-300">·</span>
          <span>Rolling Admissions</span>
          <span className="text-neutral-300">·</span>
          <span>Privacy Respected</span>
        </div>

        <div className="text-neutral-400 text-[11px]">
          © {new Date().getFullYear()} ARE YOU READY TO WORK. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
