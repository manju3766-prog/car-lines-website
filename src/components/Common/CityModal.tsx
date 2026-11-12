import React from 'react';
import { MapPin, X, Check, ShieldCheck } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_CONFIG } from '../../data/inventory';

export const CityModal: React.FC = () => {
  const { isCityModalOpen, setIsCityModalOpen } = useShowroom();

  if (!isCityModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div 
        className="w-full max-w-md bg-obsidian-800 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative text-left"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsCityModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Dealership Location</h3>
            <p className="text-xs text-slate-400">Current active showroom</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-obsidian-900/90 border border-gold-500/30 mb-4 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white">Bengaluru</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <Check className="w-3 h-3" /> Active Flagship
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {DEALERSHIP_CONFIG.address}
            </p>
            <p className="text-[11px] text-gold-400 font-medium mt-2">
              Open Daily: 10:00 AM – 8:00 PM IST
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/50 border border-slate-800 text-xs text-slate-400 mb-6">
          <ShieldCheck className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
          <span>
            CAR LINES exclusively operates from our verified Outer Ring Road showroom in Bengaluru. All vehicles shown are physically available for inspection at this location.
          </span>
        </div>

        <button
          onClick={() => setIsCityModalOpen(false)}
          className="w-full py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl transition-colors text-sm"
        >
          Explore Bengaluru Stock
        </button>
      </div>
    </div>
  );
};
