import React from 'react';
import { User, X, CheckCircle2, Heart, GitCompare, Calculator, MessageSquare } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';

export const AccountModal: React.FC = () => {
  const { isAccountModalOpen, setIsAccountModalOpen, shortlistIds, comparisonIds } = useShowroom();

  if (!isAccountModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsAccountModalOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-obsidian-800 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative text-left"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAccountModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700/50 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Guest Session Active</h3>
            <p className="text-xs text-slate-400">Zero-friction automotive browsing</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-obsidian-900/90 border border-slate-800 mb-5">
          <p className="text-xs text-slate-300 leading-relaxed">
            CAR LINES provides an open, privacy-first digital showroom. You do not need to create a password or log in to access any core features.
          </p>
        </div>

        <h4 className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-3">
          Your Local Session Activity
        </h4>

        <div className="space-y-2.5 mb-6">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <Heart className="w-4 h-4 text-pink-500" />
              <span>Saved Shortlist</span>
            </div>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              {shortlistIds.length} cars
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <GitCompare className="w-4 h-4 text-gold-400" />
              <span>Comparison Dock</span>
            </div>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
              {comparisonIds.length}/3 cars
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <Calculator className="w-4 h-4 text-emerald-400" />
              <span>EMI Calculator</span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Enquiry</span>
            </div>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Instant
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAccountModalOpen(false)}
          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors text-sm"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
};
