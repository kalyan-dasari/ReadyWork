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
  DEVICE_ID: 'ayrtw_device_id_v1',
};

const REGISTRATIONS_ENDPOINT = '/.netlify/functions/registrations';

class DataService {
  private listeners: (() => void)[] = [];
  private serverCount: number | null = null;

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
      if (this.serverCount !== null) return this.serverCount;
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

      const deviceId = this.getDeviceId();
      let savedRecord = record;
      let count = this.getInterestCount();

      try {
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 12000);
        const response = await fetch(REGISTRATIONS_ENDPOINT, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ deviceId, formData }),
          signal: controller.signal,
        });
        window.clearTimeout(timeout);

        if (!response.ok) throw new Error('Registration API request failed.');

        const result = (await response.json()) as {
          record: ApplicationRecord;
          count: number;
        };
        savedRecord = result.record;
        count = result.count;
        this.serverCount = result.count;
      } catch (error) {
        if (!import.meta.env.DEV) throw error;

        const existing = this.getAllApplications();
        existing.unshift(record);
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(existing));
      }

      localStorage.setItem(STORAGE_KEYS.USER_SUBMISSION, JSON.stringify(savedRecord));

      analytics.track('application_submitted', {
        id,
        trackCount: formData.workInterests.length,
        readiness: formData.readinessLevel,
      });

      this.notify();

      return {
        success: true,
        record: savedRecord,
        count,
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

  public async refreshInterestCount(): Promise<void> {
    try {
      const response = await fetch(REGISTRATIONS_ENDPOINT);
      if (!response.ok) throw new Error('Count API request failed.');
      const result = (await response.json()) as { count: number };
      this.serverCount = result.count;
      this.notify();
    } catch (error) {
      if (!import.meta.env.DEV) {
        console.warn('Unable to load shared registration count', error);
      }
    }
  }

  private getDeviceId(): string {
    const existing = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (existing) return existing;

    const deviceId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
    return deviceId;
  }

  public trackShare(platform: string): void {
    analytics.track('share_clicked', { platform });
  }

  public trackLinkCopied(): void {
    analytics.track('link_copied');
  }
}

export const dataService = new DataService();
