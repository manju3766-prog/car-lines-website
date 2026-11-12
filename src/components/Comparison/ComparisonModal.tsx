import React from 'react';
import { X, GitCompare, MessageSquare, Award, Trash2 } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { formatINR, formatKM, createWhatsAppUrl } from '../../utils/formatters';
import { DEALERSHIP_CONFIG } from '../../data/inventory';

export const ComparisonModal: React.FC = () => {
  const { 
    isCompareOpen, 
    setIsCompareOpen, 
    comparedVehicles, 
    removeFromCompare, 
    clearCompare,
    setSelectedVehicle 
  } = useShowroom();

  if (!isCompareOpen) return null;

  if (comparedVehicles.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
        <div className="w-full max-w-md bg-obsidian-900 border border-slate-800 rounded-3xl p-6 text-center text-slate-300">
          <GitCompare className="w-12 h-12 text-gold-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-2">No Cars Selected for Comparison</h3>
          <p className="text-xs text-slate-400 mb-6">
            Select up to 3 cars from our showroom inventory by clicking the compare icon on vehicle cards.
          </p>
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-5 py-2.5 bg-gold-500 text-slate-950 font-bold rounded-xl text-xs"
          >
            Back to Inventory
          </button>
        </div>
      </div>
    );
  }

  // Calculate Best-In-Comparison Highlights (Handling Ties)
  const lowestPrice = Math.min(...comparedVehicles.map(v => v.price));
  const lowestKM = Math.min(...comparedVehicles.map(v => v.km));
  const newestYear = Math.max(...comparedVehicles.map(v => v.year));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setIsCompareOpen(false)}
    >
      <div 
        className="w-full max-w-5xl bg-obsidian-900 border border-slate-700/80 rounded-3xl shadow-2xl relative overflow-hidden my-auto text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-obsidian-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-500">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Side-by-Side Vehicle Comparison
              </h3>
              <p className="text-xs text-slate-400">
                Comparing {comparedVehicles.length} of 3 selected showroom vehicles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearCompare}
              className="p-2 text-slate-400 hover:text-red-400 rounded-xl hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
              title="Clear comparison"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={() => setIsCompareOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Matrix Table Container */}
        <div className="max-h-[75vh] overflow-y-auto p-4 sm:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="py-3 px-4 font-bold text-slate-400 uppercase tracking-wider w-40 min-w-[130px] bg-obsidian-950/60 rounded-l-xl">
                    Vehicle
                  </th>
                  {comparedVehicles.map(v => (
                    <th key={v.id} className="py-3 px-4 min-w-[200px] align-top bg-obsidian-800/60 border-l border-slate-800">
                      <div className="relative group space-y-2">
                        <button
                          onClick={() => removeFromCompare(v.id)}
                          className="absolute -top-1 -right-1 p-1 bg-slate-800 hover:bg-red-500 hover:text-white rounded-md text-slate-400 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={v.imageUrl}
                          alt={v.name}
                          className="w-full h-24 object-cover rounded-xl bg-obsidian-950"
                        />
                        <h4 className="font-bold text-white text-sm line-clamp-1">{v.name}</h4>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">{v.bodyType}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800/80">
                {/* 1. Price */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Asking Price
                  </td>
                  {comparedVehicles.map(v => {
                    const isLowest = v.price === lowestPrice;
                    return (
                      <td key={v.id} className="py-3.5 px-4 border-l border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-white tabular-nums">
                            {formatINR(v.price)}
                          </span>
                          {isLowest && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                              <Award className="w-3 h-3" /> Lowest Price
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 2. Model Year */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Model Year
                  </td>
                  {comparedVehicles.map(v => {
                    const isNewest = v.year === newestYear;
                    return (
                      <td key={v.id} className="py-3.5 px-4 border-l border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{v.year}</span>
                          {isNewest && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-gold-500/20 text-gold-400 border border-gold-500/30">
                              Newest Model
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 3. Kilometres Driven */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Kilometres Driven
                  </td>
                  {comparedVehicles.map(v => {
                    const isLowest = v.km === lowestKM;
                    return (
                      <td key={v.id} className="py-3.5 px-4 border-l border-slate-800">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white tabular-nums">{formatKM(v.km)}</span>
                          {isLowest && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Lowest KM
                            </span>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 4. Fuel Type */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Fuel Type
                  </td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="py-3.5 px-4 border-l border-slate-800 font-bold text-slate-200">
                      {v.fuel}
                    </td>
                  ))}
                </tr>

                {/* 5. Transmission */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Transmission
                  </td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="py-3.5 px-4 border-l border-slate-800 font-bold text-slate-200">
                      {v.transmission}
                    </td>
                  ))}
                </tr>

                {/* 6. Body Type */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Body Type
                  </td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="py-3.5 px-4 border-l border-slate-800 font-bold text-slate-200">
                      {v.bodyType}
                    </td>
                  ))}
                </tr>

                {/* 7. Ownership */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Ownership
                  </td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="py-3.5 px-4 border-l border-slate-800 font-bold text-slate-200">
                      {v.ownership}
                    </td>
                  ))}
                </tr>

                {/* 8. Karnataka RTO */}
                <tr>
                  <td className="py-3.5 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    RTO Registration
                  </td>
                  {comparedVehicles.map(v => (
                    <td key={v.id} className="py-3.5 px-4 border-l border-slate-800 font-bold text-gold-400">
                      {v.rto} {v.rtoLocation ? `(${v.rtoLocation.split(',')[0]})` : ''}
                    </td>
                  ))}
                </tr>

                {/* Actions Row */}
                <tr>
                  <td className="py-4 px-4 font-semibold text-slate-400 bg-obsidian-950/40">
                    Quick Actions
                  </td>
                  {comparedVehicles.map(v => {
                    const whatsappUrl = createWhatsAppUrl(
                      DEALERSHIP_CONFIG.whatsapp,
                      `Hi CAR LINES, I am comparing the ${v.name} (${formatINR(v.price)}). Can you share inspection details and arrange a test drive?`
                    );
                    return (
                      <td key={v.id} className="py-4 px-4 border-l border-slate-800 space-y-2">
                        <button
                          onClick={() => {
                            setIsCompareOpen(false);
                            setSelectedVehicle(v);
                          }}
                          className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
                        >
                          View Full Details
                        </button>
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-2 px-3 rounded-lg bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    );
                  })}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-obsidian-950 flex justify-end">
          <button
            onClick={() => setIsCompareOpen(false)}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};
