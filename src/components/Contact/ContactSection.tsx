import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../../data/inventory';
import { getShowroomStatusIST, createWhatsAppUrl } from '../../utils/formatters';

export const ContactSection: React.FC = () => {
  const showroomStatus = getShowroomStatusIST();

  const generalWhatsappUrl = createWhatsAppUrl(
    DEALERSHIP_CONFIG.whatsapp,
    'Hi CAR LINES, I would like to visit your Outer Ring Road showroom. Please share directions and available vehicle slots.'
  );

  return (
    <section id="contact" className="py-16 sm:py-24 bg-obsidian-950 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-left">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Visit Our Showroom</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect with CAR LINES Bengaluru
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Visit our physical dealership on Outer Ring Road, test drive verified vehicles, and experience our hospitality.
          </p>
        </div>

        {/* Contact Info & Map Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details (5 cols on lg) */}
          <div className="lg:col-span-5 bg-obsidian-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              {/* Live Showroom Status Badge */}
              <div className="p-4 rounded-2xl bg-obsidian-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className={`w-3 h-3 rounded-full ${showroomStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                  <div>
                    <span className="text-xs font-bold text-white block">{showroomStatus.statusText}</span>
                    <span className="text-[10px] text-slate-400">Current IST: {showroomStatus.timeString}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/30">
                  Daily 10 AM – 8 PM
                </span>
              </div>

              {/* Showroom Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">
                    Showroom Address
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {DEALERSHIP_CONFIG.address}
                  </p>
                  <span className="text-xs text-slate-400 block mt-1">
                    Opposite Kempegowda Institute, Kottigepalya
                  </span>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500 flex-shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block mb-1">
                    Direct Phone Line
                  </span>
                  <a
                    href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
                    className="text-base font-bold text-white hover:text-gold-400 transition-colors"
                  >
                    {DEALERSHIP_CONFIG.phone}
                  </a>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Available during operating hours for enquiries
                  </span>
                </div>
              </div>

              {/* WhatsApp Direct */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-whatsapp-500/10 border border-whatsapp-500/30 flex items-center justify-center text-whatsapp-500 flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    WhatsApp Concierge
                  </span>
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-white hover:text-emerald-400 transition-colors block"
                  >
                    +91 96115 44699 (Instant Chat)
                  </a>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Quick vehicle walkaround videos & document scans
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 border-t border-slate-800 space-y-2.5">
              <a
                href={DEALERSHIP_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
              </a>

              <a
                href={generalWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Visual Map / Directions Guide (7 cols on lg) */}
          <div className="lg:col-span-7 bg-obsidian-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Visual Bengaluru Location Card */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Showroom Directions & Landmarks
                  </h3>
                  <p className="text-xs text-slate-400">Outer Ring Road corridor, Kottigepalya</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  Bengaluru 560091
                </span>
              </div>

              {/* Interactive Directions Preview Box */}
              <div className="p-6 rounded-2xl bg-obsidian-950 border border-slate-800 relative space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-gold-400">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Prominent Landmark</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Directly opposite Kempegowda Institute, easily accessible via Outer Ring Road from Nagarbhavi, Rajajinagar, and Yeshwanthpur.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Dedicated Visitor Parking</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Ample customer vehicle parking available directly at our premises.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-gold-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Working Hours</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Monday to Sunday: 10:00 AM to 8:00 PM IST (All 7 days open).
                    </p>
                  </div>
                </div>
              </div>

              {/* Clean Map Action Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-obsidian-950 to-slate-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-white block">Navigate via Google Maps</span>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    Coordinates & real-time traffic route to CAR LINES
                  </span>
                </div>

                <a
                  href={DEALERSHIP_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Open in Maps</span>
                  <Navigation className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-500 flex-shrink-0" />
              <span>
                CAR LINES pre-owned cars operates exclusively from this verified Bengaluru address.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
