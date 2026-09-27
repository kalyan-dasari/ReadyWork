import React from 'react';
import { Target, Zap, Clock, Compass } from 'lucide-react';

export const SelectionCriteria: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF9] border-t border-neutral-200/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            How selection works
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#141413] mt-2 leading-tight">
            How we review your application.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
            We do not filter by university rank or GPA. We look for concrete signals that you're ready to learn and contribute.
          </p>
        </div>

        {/* 4 Evaluation Signals */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#141413]">
                Genuine Interest & Direction
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We look closely at the specific tracks you select. Students who have a clear point of curiosity almost always progress faster than those who try to claim they know everything.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#141413]">
                Foundational Skills & Potential
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              You don't need 5 years of experience, but you should have touched your craft. If you're a developer, you've written code; if a designer, you've made layouts; if a marketer, you've written copy.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#141413]">
                Honest Commitment
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Real projects require predictable attendance and updates. We evaluate the readiness level you choose to ensure expectations align with your academic calendar.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200/80">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-900">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#141413]">
                Follow-Through & Communication
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              The students who excel in our cohorts are proactive communicators who ask questions early, unblock themselves, and take pride in finishing what they started.
            </p>
          </div>
        </div>

        {/* Clear Trust Notice Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-neutral-100/80 border border-neutral-200/70 text-xs sm:text-sm text-neutral-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <span className="font-semibold text-neutral-900 shrink-0">Important note:</span>
            <span>
              Applications will be reviewed and a limited number of students will be selected. We cannot accept everyone, but every single application is evaluated carefully.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
