import { ApplicationFormData, ApplicationRecord, ReferralStats } from '../types';
import { analytics } from './analytics';

/**
 * CONFIGURABLE BASELINE INTEREST COUNT
 * As requested in brief:
 * "Use a clearly configurable variable for the number."
 * "Do NOT claim this number is real unless it is connected to actual backend data."
 */
export const BASE_INTEREST_COUNT = 1284;

const STORAGE_KEYS = {
  APPLICATIONS: 'ayrtw_applications_v1',
  USER_SUBMISSION: 'ayrtw_user_submission_v1',
  REFERRALS: 'ayrtw_referral_stats_v1',
  BASE_OFFSET: 'ayrtw_interest_offset_v1',
};

class DataService {
  private listeners: (() => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', () => {
        this.notify();
      });
    }
  }

  private notify() {
    this.listeners.forEach((cb) => {
      try {
        cb();
      } catch (e) {
        console.error('Error notifying data subscriber', e);
      }
    });
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Returns current interest count (Baseline + stored submissions + dynamic offset)
   */
  public getInterestCount(): number {
    if (typeof window === 'undefined') return BASE_INTEREST_COUNT;

    try {
      const storedApps = this.getAllApplications();
      const offset = parseInt(localStorage.getItem(STORAGE_KEYS.BASE_OFFSET) || '0', 10);
      return BASE_INTEREST_COUNT + storedApps.length + offset;
    } catch {
      return BASE_INTEREST_COUNT;
    }
  }

  /**
   * Submits a student application
   */
  public async submitApplication(
    formData: ApplicationFormData
  ): Promise<{ success: boolean; record: ApplicationRecord; count: number }> {
    // Simulate brief network latency for authentic UI feedback
    await new Promise((resolve) => setTimeout(resolve, 550));

    const id = 'app_' + Math.random().toString(36).substring(2, 9);
    // Generate clean, shareable referral code
    const cleanName = formData.fullName
      .trim()
      .split(' ')[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '') || 'student';
    const userReferralCode = `${cleanName}-${Math.random().toString(36).substring(2, 6)}`;

    const record: ApplicationRecord = {
      ...formData,
      id,
      submittedAt: new Date().toISOString(),
      userReferralCode,
    };

    try {
      const existing = this.getAllApplications();
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(existing));
      localStorage.setItem(STORAGE_KEYS.USER_SUBMISSION, JSON.stringify(record));

      // If submitted via someone's referral code, track conversion
      if (formData.referralCode) {
        this.recordReferralConversion(formData.referralCode);
        analytics.track('referral_application', {
          referrer: formData.referralCode,
          newApplicantId: id,
        });
      }

      analytics.track('application_submitted', {
        id,
        trackCount: formData.workInterests.length,
        readiness: formData.readinessLevel,
        referralCode: formData.referralCode,
      });

      this.notify();

      return {
        success: true,
        record,
        count: this.getInterestCount(),
      };
    } catch (e) {
      console.error('Failed to submit application', e);
      throw new Error('Unable to save application. Please try again.');
    }
  }

  public getCurrentUserSubmission(): ApplicationRecord | null {
    if (typeof window === 'undefined') return null;
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_SUBMISSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  }

  public getAllApplications(): ApplicationRecord[] {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  public trackReferralVisit(refCode: string): void {
    if (!refCode || typeof window === 'undefined') return;
    try {
      const stats = this.getAllReferralStats();
      const current = stats[refCode] || { code: refCode, visits: 0, applications: 0 };
      current.visits += 1;
      stats[refCode] = current;
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(stats));

      analytics.track('referral_visit', { referralCode: refCode });
      this.notify();
    } catch (e) {
      console.warn('Failed tracking referral visit', e);
    }
  }

  private recordReferralConversion(refCode: string): void {
    if (!refCode || typeof window === 'undefined') return;
    try {
      const stats = this.getAllReferralStats();
      const current = stats[refCode] || { code: refCode, visits: 1, applications: 0 };
      current.applications += 1;
      stats[refCode] = current;
      localStorage.setItem(STORAGE_KEYS.REFERRALS, JSON.stringify(stats));
      this.notify();
    } catch (e) {
      console.warn('Failed recording referral conversion', e);
    }
  }

  public getReferralStats(refCode: string): ReferralStats {
    if (!refCode || typeof window === 'undefined') {
      return { code: refCode, visits: 0, applications: 0 };
    }
    const stats = this.getAllReferralStats();
    return stats[refCode] || { code: refCode, visits: 0, applications: 0 };
  }

  private getAllReferralStats(): Record<string, ReferralStats> {
    if (typeof window === 'undefined') return {};
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REFERRALS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  public trackShare(platform: string, refCode: string): void {
    analytics.track('share_clicked', { platform, refCode });
  }

  public trackLinkCopied(refCode: string): void {
    analytics.track('link_copied', { refCode });
  }

  /**
   * Helper to clear user session for testing/demo
   */
  public resetUserSession(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.USER_SUBMISSION);
    this.notify();
  }
}

export const dataService = new DataService();
