import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { ApplicationFormData, ApplicationRecord, ReadinessLevel } from '../types';
import { InterestForm } from './InterestForm';
import { WorkInterestStep } from './WorkInterestStep';
import { ReadinessStep } from './ReadinessStep';
import { SuccessScreen } from './SuccessScreen';
import { dataService } from '../services/dataService';
import { analytics } from '../services/analytics';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  referralCode?: string | null;
  existingSubmission?: ApplicationRecord | null;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  isOpen,
  onClose,
  referralCode,
  existingSubmission,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(existingSubmission ? 4 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRecord, setSubmittedRecord] = useState<ApplicationRecord | null>(
    existingSubmission || null
  );
  const [currentCount, setCurrentCount] = useState<number>(dataService.getInterestCount());

  const [formData, setFormData] = useState<Partial<ApplicationFormData>>({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    primarySkill: '',
    portfolioUrl: '',
    workInterests: [],
    experienceGoals: [],
    readinessLevel: 'ready_to_contribute',
    referralCode: referralCode || undefined,
  });

  useEffect(() => {
    if (existingSubmission) {
      setSubmittedRecord(existingSubmission);
      setStep(4);
    }
  }, [existingSubmission]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (!existingSubmission && step === 1) {
        analytics.track('application_started', { referralCode });
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, existingSubmission, referralCode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleStep1Complete = (data: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
    analytics.track('application_step_completed', { step: 1 });
  };

  const handleStep2Complete = (data: Partial<ApplicationFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
    analytics.track('application_step_completed', { step: 2 });
  };

  const handleStep3Submit = async (readinessLevel: ReadinessLevel) => {
    setIsSubmitting(true);
    const completePayload: ApplicationFormData = {
      fullName: formData.fullName || '',
      email: formData.email || '',
      phone: formData.phone || '',
      college: formData.college || '',
      year: formData.year || '3rd Year',
      primarySkill: formData.primarySkill || '',
      portfolioUrl: formData.portfolioUrl || '',
      workInterests: formData.workInterests || ['Software Development'],
      otherWorkInterest: formData.otherWorkInterest,
      experienceGoals: formData.experienceGoals || ['Real project experience'],
      otherExperienceGoal: formData.otherExperienceGoal,
      readinessLevel,
      referralCode: referralCode || undefined,
    };

    try {
      const res = await dataService.submitApplication(completePayload);
      setSubmittedRecord(res.record);
      setCurrentCount(res.count);
      setStep(4);
      analytics.track('application_step_completed', { step: 3 });
    } catch (e) {
      console.error('Failed to submit application', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <motion.div
        role="dialog"
        aria-modal="true"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[92vh] flex flex-col z-10"
      >
        {/* Top Header / Progress Indicator */}
        <div className="px-5 sm:px-6 pt-5 pb-3 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step < 4 ? (
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                <span className="text-[#141413]">Step 0{step}</span>
                <span className="text-neutral-300">/</span>
                <span>03</span>
                <span className="text-neutral-300">·</span>
                <span className="text-neutral-600 font-medium normal-case">
                  {step === 1 && 'Basic details'}
                  {step === 2 && 'Work & goals'}
                  {step === 3 && 'Readiness level'}
                </span>
              </div>
            ) : (
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800">
                Application Received
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 text-neutral-400 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar line for steps 1-3 */}
        {step < 4 && (
          <div className="w-full bg-neutral-100 h-1">
            <div
              className="bg-[#141413] h-1 transition-all duration-300 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        )}

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 overscroll-contain">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <InterestForm
                  initialData={formData}
                  onNext={handleStep1Complete}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <WorkInterestStep
                  initialData={formData}
                  onBack={() => setStep(1)}
                  onNext={handleStep2Complete}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ReadinessStep
                  initialLevel={formData.readinessLevel}
                  onBack={() => setStep(2)}
                  onSubmit={handleStep3Submit}
                  isSubmitting={isSubmitting}
                />
              </motion.div>
            )}

            {step === 4 && submittedRecord && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                <SuccessScreen
                  record={submittedRecord}
                  currentCount={currentCount}
                  onClose={onClose}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
