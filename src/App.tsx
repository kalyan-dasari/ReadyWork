/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProposition } from './components/ValueProposition';
import { SelectionCriteria } from './components/SelectionCriteria';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ApplicationModal } from './components/ApplicationModal';
import { SubmissionDrawer } from './components/SubmissionDrawer';
import { dataService } from './services/dataService';
import { analytics } from './services/analytics';
import { ApplicationRecord } from './types';

export default function App() {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [interestCount, setInterestCount] = useState<number>(dataService.getInterestCount());
  const [userSubmission, setUserSubmission] = useState<ApplicationRecord | null>(
    dataService.getCurrentUserSubmission()
  );

  useEffect(() => {
    analytics.track('page_view', {
      path: window.location.pathname,
    });

    // Subscribe to reactive data changes
    const unsubscribe = dataService.subscribe(() => {
      setInterestCount(dataService.getInterestCount());
      setUserSubmission(dataService.getCurrentUserSubmission());
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOpenApply = () => {
    analytics.track('interest_button_clicked');
    setIsApplyOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#141413] font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Top Bar following Top Bar Contract */}
      <Header
        onOpenApply={handleOpenApply}
        userSubmission={userSubmission}
        onViewSubmission={() => setIsDrawerOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          interestCount={interestCount}
          onOpenApply={handleOpenApply}
          hasApplied={!!userSubmission}
          onViewSubmission={() => setIsDrawerOpen(true)}
        />

        {/* Why this exists / The Difference */}
        <ValueProposition />

        {/* Real Selection Criteria & Trust Rule */}
        <SelectionCriteria />

        {/* Plain-English FAQ */}
        <FAQSection />

        {/* Final Conversion Anchor */}
        <FinalCTA
          onOpenApply={handleOpenApply}
          interestCount={interestCount}
          hasApplied={!!userSubmission}
          onViewSubmission={() => setIsDrawerOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Application Multi-step Dialog */}
      <ApplicationModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        existingSubmission={userSubmission}
      />

      {/* Submission Review Drawer */}
      <SubmissionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        submission={userSubmission}
      />
    </div>
  );
}
