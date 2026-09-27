import React from 'react';
import { Terminal, Users2, ShieldCheck, Layers } from 'lucide-react';

export const ValueProposition: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 border-t border-neutral-200/70 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Why this exists
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141413] mt-2 leading-tight">
            Not another certificate.
            <br />
            Real work experience.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            Most students have plenty of certificates and zero real-world experience.
            We're building an opportunity for students who want to bridge that gap on live projects.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-5 shadow-xs">
                <Terminal className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs font-mono font-semibold text-neutral-400">01</span>
              <h3 className="text-lg font-bold text-[#141413] mt-1 mb-2">
                Production-grade tasks
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Work directly with real codebases, production deployments, user-facing copy, and real user feedback. No contrived sandbox toy assignments.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 font-medium">
              Output: Shipped pull requests & live assets
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-5 shadow-xs">
                <Users2 className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs font-mono font-semibold text-neutral-400">02</span>
              <h3 className="text-lg font-bold text-[#141413] mt-1 mb-2">
                Real team dynamics
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Experience actual standups, asynchronous pull request reviews, design critiques, and how decisions are made when stakes are real.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 font-medium">
              Output: Honest feedback & technical mentorship
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 mb-5 shadow-xs">
                <ShieldCheck className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-xs font-mono font-semibold text-neutral-400">03</span>
              <h3 className="text-lg font-bold text-[#141413] mt-1 mb-2">
                Proof you can point to
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                When applying for future roles, you won't talk about coursework slides. You will walk recruiters through actual systems and features you helped ship.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-200/60 text-xs text-neutral-500 font-medium">
              Output: Verified contributions & portfolio proof
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
