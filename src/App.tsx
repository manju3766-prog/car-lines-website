import React from 'react';
import { ShowroomProvider } from './context/ShowroomContext';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { VehicleGrid } from './components/Inventory/VehicleGrid';
import { EMICalculator } from './components/EMICalculator/EMICalculator';
import { TrustSection } from './components/Trust/TrustSection';
import { HowBuyingWorks } from './components/HowBuyingWorks/HowBuyingWorks';
import { FAQSection } from './components/FAQ/FAQSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { ComparisonDock } from './components/Comparison/ComparisonDock';
import { ComparisonModal } from './components/Comparison/ComparisonModal';
import { VehicleDetailsModal } from './components/VehicleDetails/VehicleDetailsModal';
import { InspectionModal } from './components/Inspection/InspectionModal';
import { ShortlistModal } from './components/Shortlist/ShortlistModal';
import { CityModal } from './components/Common/CityModal';
import { AccountModal } from './components/Common/AccountModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-obsidian-900 text-slate-100 flex flex-col antialiased selection:bg-gold-500 selection:text-slate-950">
      {/* Sticky Header */}
      <Header />

      {/* Main Page Layout */}
      <main className="flex-1">
        {/* 1. Hero Section with Distinctive Pink "BUY A CAR" side panel */}
        <Hero />

        {/* 2. Vehicle Inventory (Search, Filter, Categories, Cards) */}
        <VehicleGrid />

        {/* 3. Interactive EMI & Loan Calculator */}
        <EMICalculator />

        {/* 4. Customer Trust & Authentic Dealership Standards */}
        <TrustSection />

        {/* 5. How Buying Works (5-Step Customer Journey) */}
        <HowBuyingWorks />

        {/* 6. Frequently Asked Questions */}
        <FAQSection />

        {/* 7. Showroom Location, Directions & Live IST Hours */}
        <ContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Floating Comparison Dock (Active when 1-3 cars are selected) */}
      <ComparisonDock />

      {/* Application Modals */}
      <ComparisonModal />
      <VehicleDetailsModal />
      <InspectionModal />
      <ShortlistModal />
      <CityModal />
      <AccountModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ShowroomProvider>
      <AppContent />
    </ShowroomProvider>
  );
};

export default App;
