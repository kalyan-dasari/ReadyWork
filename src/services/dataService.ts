import { ApplicationFormData, ApplicationRecord } from '../types';
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
      return BASE_INTEREST_COUNT + storedApps.length;
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

    const record: ApplicationRecord = {
      ...formData,
      id,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existingSubmission = this.getCurrentUserSubmission();
      if (existingSubmission) {
        return {
          success: true,
          record: existingSubmission,
          count: this.getInterestCount(),
        };
      }

      const existing = this.getAllApplications();
      existing.unshift(record);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(existing));
      localStorage.setItem(STORAGE_KEYS.USER_SUBMISSION, JSON.stringify(record));

      analytics.track('application_submitted', {
        id,
        trackCount: formData.workInterests.length,
        readiness: formData.readinessLevel,
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

  public trackShare(platform: string): void {
    analytics.track('share_clicked', { platform });
  }

  public trackLinkCopied(): void {
    analytics.track('link_copied');
  }
}

export const dataService = new DataService();
