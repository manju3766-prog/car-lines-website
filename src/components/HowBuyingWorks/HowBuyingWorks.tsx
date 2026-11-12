import React from 'react';
import { Search, FileText, PhoneCall, Key, Car, ArrowRight } from 'lucide-react';

export const HowBuyingWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Browse Available Cars',
      desc: 'Filter our live stock by budget, body type, fuel and gearbox to discover your ideal match.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Explore Vehicle Details',
      desc: 'Review 140-point inspection reports, RTO registration details and transparent pricing.',
      icon: FileText,
    },
    {
      num: '03',
      title: 'Connect on WhatsApp',
      desc: 'Message or call our team directly with zero sales pressure and get immediate answers.',
      icon: PhoneCall,
    },
    {
      num: '04',
      title: 'Test Drive at Showroom',
      desc: 'Experience the vehicle on Outer Ring Road or have your mechanic inspect it in person.',
      icon: Car,
    },
    {
      num: '05',
      title: 'Transparent Drive Home',
      desc: 'Complete payment or bank EMI, let us handle the RC transfer, and drive home with confidence.',
      icon: Key,
    },
  ];

  return (
    <section id="how-buying-works" className="py-16 sm:py-24 bg-obsidian-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider mb-3">
            <span>Simple & Transparent</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Buying Works at CAR LINES
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            A customer-centric journey designed to give you clarity, confidence, and peace of mind at every step.
          </p>
        </div>

        {/* 5-Step Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-obsidian-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between relative group hover:border-gold-500/50 transition-all shadow-lg"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-black text-slate-700 group-hover:text-gold-500/50 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Decorative arrow on larger screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-slate-700" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
