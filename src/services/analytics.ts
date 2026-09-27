import { AnalyticsEvent } from '../types';

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  private listeners: ((event: AnalyticsEvent) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ayrtw_analytics_events');
        if (saved) {
          this.events = JSON.parse(saved);
        }
      } catch (e) {
        console.warn('Analytics storage access error', e);
      }
    }
  }

  track(
    event: AnalyticsEvent['event'],
    properties?: Record<string, unknown>
  ): void {
    const payload: AnalyticsEvent = {
      event,
      timestamp: Date.now(),
      properties,
    };

    this.events.push(payload);

    // Keep last 100 events in localStorage for debugging/verification
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'ayrtw_analytics_events',
          JSON.stringify(this.events.slice(-100))
        );
      } catch (e) {
        console.warn('Analytics persistence error', e);
      }
    }

    // Call any external listeners (e.g. GA4 window.gtag if registered)
    if (typeof window !== 'undefined' && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
      (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
        'event',
        event,
        properties
      );
    }

    // Notify subscribers
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (e) {
        console.error('Error in analytics listener', e);
      }
    });

    if (import.meta.env.DEV) {
      console.log(`[Analytics: ${event}]`, properties || {});
    }
  }

  subscribe(listener: (event: AnalyticsEvent) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getEventCount(event: AnalyticsEvent['event']): number {
    return this.events.filter((e) => e.event === event).length;
  }
}

export const analytics = new AnalyticsService();
