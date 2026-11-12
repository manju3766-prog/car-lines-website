import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Heart, 
  User, 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X,
  FileCheck2,
  Calculator,
  Compass,
  HelpCircle,
  Clock
} from 'lucide-react';
import { BrandLogo } from '../Common/BrandLogo';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_CONFIG } from '../../data/inventory';
import { createWhatsAppUrl, getShowroomStatusIST } from '../../utils/formatters';

export const Header: React.FC = () => {
  const { 
    shortlistIds, 
    setIsShortlistOpen, 
    setIsAccountModalOpen, 
    setIsCityModalOpen,
    filters,
    setSearchQuery,
    setInspectionVehicle,
    vehicles
  } = useShowroom();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const showroomStatus = getShowroomStatusIST();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Smooth scroll to inventory if typing search query and not already in view
    if (e.target.value.trim().length > 0) {
      const inventoryEl = document.getElementById('inventory');
      if (inventoryEl && window.scrollY < 300) {
        inventoryEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const openGeneralInspection = () => {
    // Open inspection for first vehicle as prime reference
    if (vehicles.length > 0) {
      setInspectionVehicle(vehicles[0]);
    }
    setIsMoreOpen(false);
    setIsMobileMenuOpen(false);
  };

  const whatsappGeneralUrl = createWhatsAppUrl(
    DEALERSHIP_CONFIG.whatsapp,
    'Hi CAR LINES, I am browsing your online showroom and would like more details about your pre-owned inventory.'
  );

  return (
    <header className="sticky top-0 z-40 bg-obsidian-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between gap-4">
          
          {/* 1. Left: Brand Logo & Wordmark */}
          <div className="flex items-center gap-6">
            <BrandLogo size="md" />

            {/* City Selector */}
            <button
              onClick={() => setIsCityModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-obsidian-800/80 hover:bg-slate-800 border border-slate-700/60 text-xs text-slate-300 hover:text-white transition-all group"
              title="Dealership location"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-white">Bengaluru</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Flagship
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
            </button>
          </div>

          {/* 2. Middle: Search Input (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Hyundai, Creta, KA-02, Automatic, Petrol..."
                className="w-full pl-10 pr-9 py-2 bg-obsidian-800/90 hover:bg-obsidian-800 focus:bg-obsidian-900 border border-slate-700/80 focus:border-gold-500 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none transition-all"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a 
              href="#inventory" 
              className="hover:text-gold-400 transition-colors py-1"
            >
              Buy Cars
            </a>
            <a 
              href="#inventory" 
              className="hover:text-gold-400 transition-colors py-1"
            >
              Browse Cars
            </a>

            {/* More Menu Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                onBlur={() => setTimeout(() => setIsMoreOpen(false), 200)}
                className="flex items-center gap-1 hover:text-gold-400 transition-colors py-1"
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMoreOpen ? 'rotate-180 text-gold-500' : ''}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-obsidian-800 border border-slate-700 rounded-xl shadow-2xl py-2 text-xs z-50 animate-fade-in">
                  <button
                    onClick={openGeneralInspection}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <FileCheck2 className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-semibold block text-white">140-Point Inspection</span>
                      <span className="text-[10px] text-slate-400">Quality certification</span>
                    </div>
                  </button>

                  <a
                    href="#emi-calculator"
                    onClick={() => setIsMoreOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <Calculator className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-semibold block text-white">EMI Calculator</span>
                      <span className="text-[10px] text-slate-400">Monthly plan simulator</span>
                    </div>
                  </a>

                  <a
                    href="#how-buying-works"
                    onClick={() => setIsMoreOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-semibold block text-white">How Buying Works</span>
                      <span className="text-[10px] text-slate-400">5-step simple process</span>
                    </div>
                  </a>

                  <a
                    href="#faqs"
                    onClick={() => setIsMoreOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <HelpCircle className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-semibold block text-white">FAQs</span>
                      <span className="text-[10px] text-slate-400">Customer questions</span>
                    </div>
                  </a>

                  <a
                    href="#contact"
                    onClick={() => setIsMoreOpen(false)}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    <Clock className="w-4 h-4 text-gold-500" />
                    <div>
                      <span className="font-semibold block text-white">Showroom & Contact</span>
                      <span className="text-[10px] text-emerald-400">{showroomStatus.statusText}</span>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* 4. Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Shortlist Heart Button */}
            <button
              onClick={() => setIsShortlistOpen(true)}
              className="relative p-2.5 rounded-xl bg-obsidian-800 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-pink-400 transition-all"
              aria-label="View shortlisted cars"
              title="Shortlisted Cars"
            >
              <Heart className={`w-4 h-4 ${shortlistIds.length > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
              {shortlistIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-pink-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {shortlistIds.length}
                </span>
              )}
            </button>

            {/* Account Info Button */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2.5 rounded-xl bg-obsidian-800 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all hidden sm:flex"
              aria-label="Account status"
              title="Guest Session Info"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Call Dealership Button */}
            <a
              href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors"
              title={`Call ${DEALERSHIP_CONFIG.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span>Call</span>
            </a>

            {/* WhatsApp Us Button */}
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-whatsapp-500/10 transition-all transform active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-obsidian-800 border border-slate-700 text-slate-300 xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-gold-500" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible on small screens below header) */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Hyundai, Creta, KA-02, Automatic..."
              className="w-full pl-10 pr-9 py-2 bg-obsidian-800 border border-slate-700/80 focus:border-gold-500 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none"
            />
            {filters.searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-obsidian-900 border-b border-slate-800 px-4 py-5 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                setIsCityModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-semibold text-slate-200"
            >
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>Bengaluru Showroom</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Active Flagship
              </span>
            </button>

            <span className="text-[11px] text-gold-400">
              {showroomStatus.statusText}
            </span>
          </div>

          <nav className="flex flex-col gap-2.5 text-sm font-semibold text-slate-300">
            <a 
              href="#inventory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors"
            >
              Buy Cars
            </a>
            <a 
              href="#inventory"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors"
            >
              Browse Live Stock ({vehicles.length} Available)
            </a>
            <button
              onClick={openGeneralInspection}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors flex items-center justify-between"
            >
              <span>140-Point Inspection Details</span>
              <FileCheck2 className="w-4 h-4 text-gold-500" />
            </button>
            <a 
              href="#emi-calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors flex items-center justify-between"
            >
              <span>EMI Calculator</span>
              <Calculator className="w-4 h-4 text-gold-500" />
            </a>
            <a 
              href="#how-buying-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors"
            >
              How Buying Works
            </a>
            <a 
              href="#faqs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors"
            >
              Frequently Asked Questions
            </a>
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-800 hover:text-gold-400 transition-colors"
            >
              Showroom Directions & Hours
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
            <a
              href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>Call Us</span>
            </a>

            <button
              onClick={() => {
                setIsAccountModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-obsidian-800 hover:bg-slate-800 text-slate-300 text-xs font-bold border border-slate-700"
            >
              <User className="w-4 h-4" />
              <span>Session Info</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
