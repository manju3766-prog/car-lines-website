import React from 'react';
import { BrandLogo } from '../Common/BrandLogo';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../../data/inventory';
import { useShowroom } from '../../context/ShowroomContext';
import { BodyType } from '../../types/vehicle';
import { createWhatsAppUrl } from '../../utils/formatters';

export const Footer: React.FC = () => {
  const { setCategory, setInspectionVehicle, vehicles } = useShowroom();

  const handleCategoryClick = (cat: BodyType) => {
    setCategory(cat);
    const el = document.getElementById('inventory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInspectionClick = () => {
    if (vehicles.length > 0) {
      setInspectionVehicle(vehicles[0]);
    }
  };

  const whatsappUrl = createWhatsAppUrl(
    DEALERSHIP_CONFIG.whatsapp,
    'Hi CAR LINES, I am inquiring about pre-owned cars in your Bengaluru showroom.'
  );

  return (
    <footer className="bg-obsidian-950 border-t border-slate-800 text-slate-400 text-xs text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Column (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <BrandLogo size="lg" />
            
            <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
              CAR LINES is Bengaluru's trusted pre-owned automotive showroom on Outer Ring Road. We deliver certified multi-brand cars with 140-point verification, clear RC transfer, and transparent pricing.
            </p>

            <div className="pt-2 flex items-center gap-2 text-slate-400 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>Registered Pre-Owned Dealership in Bengaluru</span>
            </div>

            <div className="pt-1 text-[11px] text-slate-500">
              {DEALERSHIP_CONFIG.cin ? `CIN: ${DEALERSHIP_CONFIG.cin}` : null}
            </div>
          </div>

          {/* Shopping Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Inventory
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#inventory" className="hover:text-gold-400 transition-colors">
                  All Certified Cars
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('SUV')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  SUVs & Crossovers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Sedan')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  Premium Sedans
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('Hatchback')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  City Hatchbacks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCategoryClick('MPV')}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  7-Seater MPVs
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Information (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Customer Services
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <button
                  onClick={handleInspectionClick}
                  className="hover:text-gold-400 transition-colors text-left"
                >
                  140-Point Inspection Details
                </button>
              </li>
              <li>
                <a href="#emi-calculator" className="hover:text-gold-400 transition-colors">
                  EMI & Loan Calculator
                </a>
              </li>
              <li>
                <a href="#how-buying-works" className="hover:text-gold-400 transition-colors">
                  How Buying Works
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-gold-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gold-400 transition-colors">
                  Showroom Directions & Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Showroom Contact Column (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Showroom Location
            </h4>
            
            <div className="space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {DEALERSHIP_CONFIG.address}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`} className="text-xs hover:text-white font-semibold">
                  {DEALERSHIP_CONFIG.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-xs hover:text-emerald-400 font-semibold">
                  WhatsApp: +91 96115 44699
                </a>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <Clock className="w-3.5 h-3.5 text-gold-500 flex-shrink-0" />
                <span>Mon – Sun: 10:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            Copyright © 2026 CAR LINES pre-owned cars. All Rights Reserved.
          </p>

          <p className="text-slate-400 text-center sm:text-right">
            Bengaluru Flagship Showroom: Outer Ring Road, Kottigepalya.
          </p>
        </div>
      </div>
    </footer>
  );
};
