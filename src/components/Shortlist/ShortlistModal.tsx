import React from 'react';
import { X, Heart, Trash2, MessageSquare, Eye } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { formatINR, formatKM, createWhatsAppUrl } from '../../utils/formatters';
import { DEALERSHIP_CONFIG } from '../../data/inventory';

export const ShortlistModal: React.FC = () => {
  const { 
    isShortlistOpen, 
    setIsShortlistOpen, 
    shortlistedVehicles, 
    toggleShortlist, 
    clearShortlist,
    setSelectedVehicle 
  } = useShowroom();

  if (!isShortlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-obsidian-950">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-500">
                <Heart className="w-4 h-4 fill-pink-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Shortlist</h3>
                <p className="text-xs text-slate-400">
                  {shortlistedVehicles.length} {shortlistedVehicles.length === 1 ? 'car' : 'cars'} saved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {shortlistedVehicles.length > 0 && (
                <button
                  onClick={clearShortlist}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800 transition-colors"
                  title="Clear all saved cars"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsShortlistOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                aria-label="Close shortlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {shortlistedVehicles.length > 0 ? (
              shortlistedVehicles.map(vehicle => {
                const whatsappUrl = createWhatsAppUrl(
                  DEALERSHIP_CONFIG.whatsapp,
                  `Hi CAR LINES, I shortlisted the ${vehicle.name} (${formatINR(vehicle.price)}). Can you share availability and arrange a test drive?`
                );

                return (
                  <div
                    key={vehicle.id}
                    className="p-3.5 rounded-2xl bg-obsidian-800 border border-slate-700/80 hover:border-slate-600 transition-all flex gap-3 relative group"
                  >
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-24 h-20 object-cover rounded-xl bg-obsidian-950 flex-shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-white line-clamp-1">{vehicle.name}</h4>
                          <button
                            onClick={() => toggleShortlist(vehicle.id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove from shortlist"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-black text-gold-400 text-sm block mt-0.5 tabular-nums">
                          {formatINR(vehicle.price)}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                          <span>{formatKM(vehicle.km)}</span>
                          <span>•</span>
                          <span>{vehicle.fuel}</span>
                          <span>•</span>
                          <span>{vehicle.transmission}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/60">
                        <button
                          onClick={() => {
                            setSelectedVehicle(vehicle);
                            setIsShortlistOpen(false);
                          }}
                          className="flex-1 py-1 px-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold text-[11px] flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3 h-3 text-gold-400" />
                          <span>Details</span>
                        </button>

                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-1 px-2 rounded-lg bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1"
                        >
                          <MessageSquare className="w-3 h-3 fill-slate-950" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-20 text-center text-slate-400">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 mx-auto mb-3">
                  <Heart className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Your Shortlist is Empty</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mb-5">
                  Click the heart icon on any vehicle in our showroom to save and compare cars without signing up.
                </p>
                <button
                  onClick={() => {
                    setIsShortlistOpen(false);
                    const el = document.getElementById('inventory');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Browse Available Cars
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {shortlistedVehicles.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-obsidian-950">
              <a
                href={createWhatsAppUrl(
                  DEALERSHIP_CONFIG.whatsapp,
                  `Hi CAR LINES, I have saved ${shortlistedVehicles.length} cars in my shortlist: ${shortlistedVehicles.map(v => v.name).join(', ')}. Can we discuss pricing and inspection reports?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Enquire on All Shortlisted Cars</span>
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
