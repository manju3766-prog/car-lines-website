import React from 'react';
import { Star, ShieldCheck, FileCheck, Banknote, Car, Award, CheckCircle2 } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../../data/inventory';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner: Rating & Claim Verification */}
      <div className="bg-gradient-to-br from-obsidian-950 via-obsidian-900 to-obsidian-950 border border-gold-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Outer Ring Road Bengaluru Dealership</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Customer Trust Built on Complete Transparency
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              At CAR LINES, we take the anxiety out of buying a pre-owned car. Every car is hand-selected, verified against Karnataka RTO databases, multi-point inspected by certified technicians, and priced with zero hidden costs.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Single-Owner Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Flood / Accident History</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified RC Transfer</span>
              </div>
            </div>
          </div>

          {/* Right Rating Highlight */}
          <div className="lg:col-span-4 bg-obsidian-800/90 border border-slate-700/80 rounded-2xl p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
              ))}
            </div>

            <div>
              <span className="text-4xl font-black text-white tabular-nums block">
                {DEALERSHIP_CONFIG.ratings.average}★
              </span>
              <span className="text-xs font-bold text-slate-300 block mt-1">
                470+ Client Reviews
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Kottigepalya Showroom, Bengaluru
              </span>
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-700/60 pt-3 italic">
              "Dedicated to providing honest, pressure-free advice and immaculate vehicles to Bengaluru car buyers."
            </p>
          </div>

        </div>
      </div>

      {/* 4 Pillars of CAR LINES Assurance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-obsidian-800/70 border border-slate-800 hover:border-gold-500/40 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">140-Point Inspection</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Every vehicle is rigorously evaluated for engine compression, transmission smoothness, suspension, tyres, and original structural chassis integrity.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-obsidian-800/70 border border-slate-800 hover:border-gold-500/40 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <FileCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Hassle-Free RC Transfer</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            We handle the complete Karnataka RTO transfer paperwork directly, ensuring clean hypothecation clearance, Form 29/30 filing, and updated smart card delivery.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-obsidian-800/70 border border-slate-800 hover:border-gold-500/40 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
            <Banknote className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Instant Bank Financing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct tie-ups with leading private and nationalised banks offering flexible tenures up to 84 months, competitive interest rates, and minimal documentation.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="p-6 rounded-2xl bg-obsidian-800/70 border border-slate-800 hover:border-gold-500/40 transition-all space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Car className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Physical Test Drives</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Visit our spacious Outer Ring Road facility to inspect under the hood, test drive on city roads, or bring your own mechanic for independent assessment.
          </p>
        </div>

      </div>

    </section>
  );
};
