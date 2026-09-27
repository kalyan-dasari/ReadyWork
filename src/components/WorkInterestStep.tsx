import React, { useState } from 'react';
import { ApplicationFormData, WorkTrack, ExperienceGoal } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface WorkInterestStepProps {
  initialData: Partial<ApplicationFormData>;
  onBack: () => void;
  onNext: (data: Partial<ApplicationFormData>) => void;
}

const WORK_TRACKS: WorkTrack[] = [
  'Software Development',
  'AI / ML',
  'Design',
  'Marketing',
  'Content',
  'Business / Operations',
  'Other',
];

const EXPERIENCE_GOALS: ExperienceGoal[] = [
  'Real project experience',
  'Learning from a team',
  'Building my portfolio',
  'Working with a startup',
  'Exploring a career',
  'Other',
];

export const WorkInterestStep: React.FC<WorkInterestStepProps> = ({
  initialData,
  onBack,
  onNext,
}) => {
  const [selectedTracks, setSelectedTracks] = useState<WorkTrack[]>(
    initialData.workInterests && initialData.workInterests.length > 0
      ? initialData.workInterests
      : []
  );
  const [otherTrack, setOtherTrack] = useState(
    initialData.otherWorkInterest || ''
  );

  const [selectedGoals, setSelectedGoals] = useState<ExperienceGoal[]>(
    initialData.experienceGoals && initialData.experienceGoals.length > 0
      ? initialData.experienceGoals
      : []
  );
  const [otherGoal, setOtherGoal] = useState(
    initialData.otherExperienceGoal || ''
  );

  const [error, setError] = useState<string | null>(null);

  const toggleTrack = (track: WorkTrack) => {
    setError(null);
    if (selectedTracks.includes(track)) {
      setSelectedTracks(selectedTracks.filter((t) => t !== track));
    } else {
      setSelectedTracks([...selectedTracks, track]);
    }
  };

  const toggleGoal = (goal: ExperienceGoal) => {
    setError(null);
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTracks.length === 0) {
      setError('Please select at least one area of work you are interested in.');
      return;
    }
    if (selectedGoals.length === 0) {
      setError('Please select at least one goal you are looking to get.');
      return;
    }

    onNext({
      workInterests: selectedTracks,
      otherWorkInterest: selectedTracks.includes('Other') ? otherTrack : '',
      experienceGoals: selectedGoals,
      otherExperienceGoal: selectedGoals.includes('Other') ? otherGoal : '',
    });
  };

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141413]">
          Your Focus & Ambition
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Select what you want to work on and what you hope to take away.
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Question 1: What kind of work are you interested in? */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
          What kind of work are you interested in? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {WORK_TRACKS.map((track) => {
            const isSelected = selectedTracks.includes(track);
            return (
              <button
                type="button"
                key={track}
                onClick={() => toggleTrack(track)}
                className={`flex min-w-0 items-center justify-between gap-2 px-3.5 py-3 rounded-lg border text-sm font-medium transition-all text-left cursor-pointer min-h-[44px] ${
                  isSelected
                    ? 'border-[#141413] bg-[#141413] text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <span className="min-w-0 break-words">{track}</span>
                {isSelected && <Check className="w-4 h-4 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {selectedTracks.includes('Other') && (
          <div className="pt-1">
            <input
              type="text"
              placeholder="Specify your area of interest..."
              value={otherTrack}
              onChange={(e) => setOtherTrack(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-neutral-900 rounded-lg transition-colors placeholder:text-neutral-400"
            />
          </div>
        )}
      </div>

      {/* Question 2: What are you looking to get from this experience? */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
          What are you looking to get from this experience? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {EXPERIENCE_GOALS.map((goal) => {
            const isSelected = selectedGoals.includes(goal);
            return (
              <button
                type="button"
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`flex min-w-0 items-center justify-between gap-2 px-3.5 py-3 rounded-lg border text-sm font-medium transition-all text-left cursor-pointer min-h-[44px] ${
                  isSelected
                    ? 'border-[#141413] bg-[#141413] text-white shadow-sm'
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                <span className="min-w-0 break-words">{goal}</span>
                {isSelected && <Check className="w-4 h-4 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {selectedGoals.includes('Other') && (
          <div className="pt-1">
            <input
              type="text"
              placeholder="Specify what you're looking for..."
              value={otherGoal}
              onChange={(e) => setOtherGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-neutral-900 rounded-lg transition-colors placeholder:text-neutral-400"
            />
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-3 pt-3">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-4 py-3.5 text-sm font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer min-h-[48px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.99] rounded-xl transition-all shadow-sm cursor-pointer min-h-[48px]"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
