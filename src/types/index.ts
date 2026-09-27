export type YearOfStudy = 
  | '1st Year'
  | '2nd Year'
  | '3rd Year'
  | 'Final Year'
  | 'Recent Graduate';

export type WorkTrack =
  | 'Software Development'
  | 'AI / ML'
  | 'Design'
  | 'Marketing'
  | 'Content'
  | 'Business / Operations'
  | 'Other';

export type ExperienceGoal =
  | 'Real project experience'
  | 'Learning from a team'
  | 'Building my portfolio'
  | 'Working with a startup'
  | 'Exploring a career'
  | 'Other';

export type ReadinessLevel =
  | 'exploring'
  | 'interested'
  | 'ready_to_contribute'
  | 'ready_to_lead';

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  year: YearOfStudy | '';
  primarySkill: string;
  portfolioUrl?: string;
  workInterests: WorkTrack[];
  otherWorkInterest?: string;
  experienceGoals: ExperienceGoal[];
  otherExperienceGoal?: string;
  readinessLevel: ReadinessLevel;
  referralCode?: string;
}

export interface ApplicationRecord extends ApplicationFormData {
  id: string;
  submittedAt: string;
  userReferralCode: string;
}

export interface AnalyticsEvent {
  event:
    | 'page_view'
    | 'interest_button_clicked'
    | 'application_started'
    | 'application_step_completed'
    | 'application_submitted'
    | 'share_clicked'
    | 'link_copied'
    | 'referral_visit'
    | 'referral_application';
  timestamp: number;
  properties?: Record<string, unknown>;
}

export interface ReferralStats {
  code: string;
  visits: number;
  applications: number;
}
