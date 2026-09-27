import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Who is eligible to apply?',
    answer:
      'Current undergraduate or graduate students enrolled in any accredited university or college, as well as recent graduates looking to break into the industry. All majors and disciplines are welcome.',
  },
  {
    question: 'How much time commitment is expected?',
    answer:
      'The experience is designed to run flexibly alongside university classes. Depending on the readiness tier you select, student sprints range between 8 to 20 hours per week with asynchronous flexibility.',
  },
  {
    question: 'What if I do not have prior company work experience?',
    answer:
      'That is specifically why this program exists. We do not require prior corporate experience. We evaluate your curiosity, willingness to learn, and foundational discipline rather than past corporate logos.',
  },
  {
    question: 'How and when will selected students be notified?',
    answer:
      'Applications are reviewed on a rolling basis. Shortlisted candidates are invited for a short conversational fit check and project walkthrough within 7–10 days of submitting interest.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-neutral-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Common questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#141413] mt-2">
            Straightforward answers.
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-white hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-[#141413]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-neutral-900' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
