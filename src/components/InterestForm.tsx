import React, { useState } from 'react';
import { ApplicationFormData, YearOfStudy } from '../types';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface InterestFormProps {
  initialData: Partial<ApplicationFormData>;
  onNext: (data: Partial<ApplicationFormData>) => void;
}

const YEAR_OPTIONS: YearOfStudy[] = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  'Final Year',
  'Recent Graduate',
];

export const InterestForm: React.FC<InterestFormProps> = ({
  initialData,
  onNext,
}) => {
  const [formData, setFormData] = useState({
    fullName: initialData.fullName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    college: initialData.college || '',
    year: initialData.year || ('' as YearOfStudy | ''),
    primarySkill: initialData.primarySkill || '',
    portfolioUrl: initialData.portfolioUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your phone or WhatsApp number';
    } else if (formData.phone.trim().replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number with country code';
    }
    if (!formData.college.trim()) {
      errs.college = 'Please enter your college or university';
    }
    if (!formData.year) {
      errs.year = 'Please select your current year';
    }
    if (!formData.primarySkill.trim()) {
      errs.primarySkill = 'Please share your primary skill or area of interest';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      college: true,
      year: true,
      primarySkill: true,
    });

    if (validate()) {
      onNext(formData);
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#141413]">
          Let's get to know you.
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 mt-1">
          Tell us where you are currently studying and what you work on.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Alex Morgan"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.fullName && errors.fullName
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors placeholder:text-neutral-400`}
          />
          {touched.fullName && errors.fullName && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Email Address *
          </label>
          <input
            type="email"
            placeholder="alex@college.edu or alex@gmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            onBlur={() => handleBlur('email')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.email && errors.email
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors placeholder:text-neutral-400`}
          />
          {touched.email && errors.email && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            onBlur={() => handleBlur('phone')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.phone && errors.phone
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors placeholder:text-neutral-400`}
          />
          {touched.phone && errors.phone && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* College */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            College / University *
          </label>
          <input
            type="text"
            placeholder="e.g. Stanford University, IIT, NYU..."
            value={formData.college}
            onChange={(e) =>
              setFormData({ ...formData, college: e.target.value })
            }
            onBlur={() => handleBlur('college')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.college && errors.college
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors placeholder:text-neutral-400`}
          />
          {touched.college && errors.college && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.college}</span>
            </p>
          )}
        </div>

        {/* Year */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Current Year *
          </label>
          <select
            value={formData.year}
            onChange={(e) =>
              setFormData({
                ...formData,
                year: e.target.value as YearOfStudy,
              })
            }
            onBlur={() => handleBlur('year')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.year && errors.year
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors text-neutral-800`}
          >
            <option value="" disabled>
              Select your year
            </option>
            {YEAR_OPTIONS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          {touched.year && errors.year && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.year}</span>
            </p>
          )}
        </div>

        {/* Primary Skill */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-1.5">
            Primary Skill / Area *
          </label>
          <input
            type="text"
            placeholder="e.g. React & TypeScript, Python/PyTorch, Figma/UI Design, Growth..."
            value={formData.primarySkill}
            onChange={(e) =>
              setFormData({ ...formData, primarySkill: e.target.value })
            }
            onBlur={() => handleBlur('primarySkill')}
            className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
              touched.primarySkill && errors.primarySkill
                ? 'border-red-400 focus:border-red-500'
                : 'border-neutral-300 focus:border-neutral-900'
            } rounded-lg transition-colors placeholder:text-neutral-400`}
          />
          {touched.primarySkill && errors.primarySkill && (
            <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.primarySkill}</span>
            </p>
          )}
        </div>

        {/* Portfolio / GitHub */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-neutral-600">
              GitHub / Portfolio / LinkedIn
            </label>
            <span className="text-xs text-neutral-400">Optional</span>
          </div>
          <input
            type="url"
            placeholder="https://github.com/... or https://yourportfolio.dev"
            value={formData.portfolioUrl}
            onChange={(e) =>
              setFormData({ ...formData, portfolioUrl: e.target.value })
            }
            className="w-full px-3.5 py-2.5 text-sm bg-white border border-neutral-300 focus:border-neutral-900 rounded-lg transition-colors placeholder:text-neutral-400"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#141413] hover:bg-neutral-800 active:scale-[0.99] rounded-xl transition-all shadow-sm cursor-pointer min-h-[48px]"
        >
          <span>CONTINUE</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
