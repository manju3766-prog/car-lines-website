import React from 'react';
import { GitCompare, X, ArrowRight, Trash2 } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { formatINR } from '../../utils/formatters';

export const ComparisonDock: React.FC = () => {
  const { 
    comparedVehicles, 
    removeFromCompare, 
    clearCompare, 
    setIsCompareOpen 
  } = useShowroom();

  if (comparedVehicles.length === 0) return null;

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-40 max-w-xl w-full sm:w-auto animate-slide-up">
      <div className="bg-obsidian-950/95 backdrop-blur-md border border-gold-500/40 rounded-2xl p-3 sm:p-4 shadow-2xl shadow-black/80 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Indicator & Thumbnails */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 flex-shrink-0">
            <GitCompare className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto max-w-[200px] sm:max-w-none">
            {comparedVehicles.map(v => (
              <div 
                key={v.id} 
                className="relative group flex items-center gap-2 bg-obsidian-800 border border-slate-700/80 rounded-xl p-1.5 pr-2.5"
              >
                <img
                  src={v.imageUrl}
                  alt={v.name}
                  className="w-8 h-8 rounded-lg object-cover bg-obsidian-900"
                />
                <div className="hidden sm:block text-left text-[11px]">
                  <span className="font-bold text-white block truncate max-w-[100px]">{v.model}</span>
                  <span className="text-gold-400 font-semibold tabular-nums">{formatINR(v.price)}</span>
                </div>
                <button
                  onClick={() => removeFromCompare(v.id)}
                  className="text-slate-400 hover:text-red-400 p-0.5 ml-1"
                  title="Remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors hidden sm:block"
            title="Clear comparison dock"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsCompareOpen(true)}
            className="px-4 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-gold-500/20 active:scale-95"
          >
            <span>Compare ({comparedVehicles.length}/3)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
