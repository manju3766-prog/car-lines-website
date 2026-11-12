import React from 'react';
import { ShieldCheck, Sparkles, ArrowRight, Star, Clock, Car, Award } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';

export const Hero: React.FC = () => {
  const { vehicles } = useShowroom();

  const scrollToInventory = () => {
    const el = document.getElementById('inventory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[640px] lg:min-h-[700px] flex items-center bg-obsidian-950 border-b border-slate-800/80 overflow-hidden">
      {/* Background Atmosphere & High-Resolution Automotive Showroom Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85"
          alt="CAR LINES Premium Automotive Digital Showroom"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-75 contrast-125 scale-105 transform motion-safe:transition-transform duration-1000"
          loading="eager"
        />
        {/* Obsidian Dark Gradient Overlays for Visual Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-950 via-obsidian-950/90 to-obsidian-950/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/50"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Content (Left 7-8 columns on desktop) */}
          <div className="lg:col-span-8 text-left space-y-6">
            
            {/* Top Dealership Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-gold-500/30 shadow-lg shadow-gold-500/5 backdrop-blur-sm">
              <span className="flex items-center gap-1 text-gold-400 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-400" />
                4.9★ Rated
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-slate-300 text-xs font-medium">
                Outer Ring Road Bengaluru Showroom
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600 hidden sm:block"></span>
              <span className="text-emerald-400 text-xs font-semibold hidden sm:flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 140-Point Certified
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Drive Home Quality. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500">
                Trusted Pre-Owned Cars in Bengaluru.
              </span>
            </h1>

            {/* Original Brand Tagline */}
            <div className="flex items-center gap-3 text-gold-400/90 font-bold tracking-wider text-sm uppercase">
              <div className="w-6 h-0.5 bg-gold-500"></div>
              <span>The right car. The right road ahead.</span>
            </div>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              Discover quality pre-owned cars, explore transparent vehicle details and connect directly with CAR LINES for your next drive. Complete RC transfer transparency and instant EMI support.
            </p>

            {/* Hero Actions (Primary & Secondary) */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToInventory}
                className="px-8 py-4 bg-gradient-to-r from-gold-500 to-amber-500 hover:from-gold-400 hover:to-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-xl shadow-gold-500/20 transition-all flex items-center gap-2 transform active:scale-95 group"
              >
                <span>BUY A CAR</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToInventory}
                className="px-8 py-4 bg-obsidian-800/90 hover:bg-slate-800 text-white font-bold text-sm uppercase tracking-wider rounded-xl border border-slate-700/80 hover:border-slate-600 transition-all flex items-center gap-2"
              >
                <Car className="w-4 h-4 text-gold-400" />
                <span>BROWSE CARS ({vehicles.length})</span>
              </button>
            </div>

            {/* Value Highlights Grid */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl text-xs">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Award className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">140-Point Inspection</span>
                  <span className="text-[11px] text-slate-400">Non-accidental certified</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Transparent RC Transfer</span>
                  <span className="text-[11px] text-slate-400">Complete legal clearance</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Instant Bank EMI</span>
                  <span className="text-[11px] text-slate-400">Low interest tie-ups</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (4 columns on desktop):
              Features the SPEC-MANDATED Compact Rectangular Pink Promotional Panel
              positioned toward the side of the hero section */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center w-full">
            
            {/* The Compact Rectangular Pink Promotional Component */}
            <div className="w-full max-w-sm rounded-2xl p-6 bg-gradient-to-br from-promo-pink to-pink-600 border border-pink-400/30 shadow-2xl shadow-pink-500/20 text-white relative overflow-hidden group">
              {/* Subtle decorative glow */}
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 text-white" />
                  Showroom Special
                </span>
                <span className="text-[11px] font-bold text-pink-100">Bengaluru Stock</span>
              </div>

              {/* Exact white text required by specification */}
              <h2 className="text-2xl font-black tracking-tight text-white mb-2 uppercase">
                BUY A CAR
              </h2>

              <p className="text-xs text-pink-50/90 leading-relaxed mb-5">
                Every vehicle comes 140-point inspected with single-owner pedigree, guaranteed documentation, and doorstep or showroom test drive.
              </p>

              <button
                onClick={scrollToInventory}
                className="w-full py-3 bg-white hover:bg-slate-100 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Explore Certified Cars</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Showroom Hours pill beneath side panel */}
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-obsidian-900/90 border border-slate-800 text-slate-300 text-xs flex items-center gap-2 w-full max-w-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-semibold text-white">Outer Ring Road Showroom:</span>
              <span className="text-slate-400">10 AM – 8 PM</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
