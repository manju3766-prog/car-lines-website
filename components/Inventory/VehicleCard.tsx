import React, { useState } from 'react';
import { 
  Heart, 
  GitCompare, 
  FileCheck2, 
  MessageSquare, 
  Fuel, 
  Gauge, 
  ShieldCheck, 
  Calendar, 
  Eye,
  Calculator
} from 'lucide-react';
import { Vehicle } from '../../types/vehicle';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_CONFIG } from '../../data/inventory';
import { formatINR, formatKM, getQuickEMIEstimate, createWhatsAppUrl } from '../../utils/formatters';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const { 
    isShortlisted, 
    toggleShortlist, 
    isInCompare, 
    addToCompare, 
    removeFromCompare,
    setSelectedVehicle,
    setInspectionVehicle,
    selectForEMI
  } = useShowroom();

  const [imageError, setImageError] = useState(false);
  const shortlisted = isShortlisted(vehicle.id);
  const inCompare = isInCompare(vehicle.id);
  const quickEMI = getQuickEMIEstimate(vehicle.price);

  const whatsappMessage = `Hi CAR LINES, I am interested in the ${vehicle.name} (${vehicle.rto}) listed at ${formatINR(vehicle.price)}. Please share the 140-point inspection report and test drive schedule.`;
  const whatsappUrl = createWhatsAppUrl(DEALERSHIP_CONFIG.whatsapp, whatsappMessage);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(vehicle.id);
    } else {
      addToCompare(vehicle);
    }
  };

  const handleShortlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleShortlist(vehicle.id);
  };

  return (
    <div 
      className="group bg-obsidian-800/90 hover:bg-obsidian-800 border border-slate-800 hover:border-gold-500/50 rounded-2xl overflow-hidden shadow-xl shadow-black/40 hover:shadow-gold-500/5 transition-all duration-300 flex flex-col relative text-left"
    >
      {/* Vehicle Image Container */}
      <div className="relative aspect-[16/10] bg-obsidian-950 overflow-hidden cursor-pointer" onClick={() => setSelectedVehicle(vehicle)}>
        {!imageError ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.name} - Pre-Owned Car in Bengaluru`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Custom SVG Automotive Silhouette Fallback */
          <div className="w-full h-full flex flex-col items-center justify-center bg-obsidian-900 border-b border-slate-800 p-6 text-slate-500">
            <svg viewBox="0 0 100 50" className="w-24 h-12 text-slate-700" fill="currentColor">
              <path d="M10 32 L22 18 L68 18 L84 32 L92 34 L92 38 L8 38 L8 34 Z" opacity="0.6"/>
              <circle cx="26" cy="38" r="6" />
              <circle cx="74" cy="38" r="6" />
            </svg>
            <span className="text-[11px] font-semibold text-slate-400 mt-2">CAR LINES Certified</span>
          </div>
        )}

        {/* Top Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Category Badge */}
          <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-obsidian-950/80 backdrop-blur-md text-gold-400 border border-gold-500/30">
            {vehicle.bodyType}
          </span>

          {/* Action Buttons: Shortlist & Compare */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* Compare Button */}
            <button
              onClick={handleCompareClick}
              className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
                inCompare
                  ? 'bg-gold-500 text-slate-950 border-gold-400'
                  : 'bg-obsidian-950/80 hover:bg-slate-800 text-slate-300 border-slate-700/80'
              }`}
              title={inCompare ? 'Remove from comparison' : 'Add to compare'}
              aria-label="Compare vehicle"
            >
              <GitCompare className="w-3.5 h-3.5" />
            </button>

            {/* Shortlist Heart Button */}
            <button
              onClick={handleShortlistClick}
              className={`p-2 rounded-lg backdrop-blur-md border transition-all ${
                shortlisted
                  ? 'bg-pink-500/90 text-white border-pink-400'
                  : 'bg-obsidian-950/80 hover:bg-slate-800 text-slate-300 border-slate-700/80 hover:text-pink-400'
              }`}
              title={shortlisted ? 'Remove from shortlist' : 'Add to shortlist'}
              aria-label="Shortlist vehicle"
            >
              <Heart className={`w-3.5 h-3.5 ${shortlisted ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay: 140-Point Certified Tag */}
        <div className="absolute bottom-2.5 left-3 pointer-events-none">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            140-Point Verified
          </span>
        </div>
      </div>

      {/* Card Content: STRICTLY FOLLOWS 6 LINES OF INFORMATION */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-3">
          {/* LINE 1: Vehicle Name and Year */}
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 mb-0.5">
              <Calendar className="w-3 h-3 text-gold-500" />
              <span>{vehicle.year} Model</span>
              <span>•</span>
              <span className="text-slate-300">{vehicle.brand}</span>
            </div>
            <h3 
              onClick={() => setSelectedVehicle(vehicle)}
              className="text-base sm:text-lg font-bold text-white hover:text-gold-400 transition-colors cursor-pointer line-clamp-1"
            >
              {vehicle.name}
            </h3>
          </div>

          {/* LINE 2: Asking Price & Monthly EMI */}
          <div className="flex items-baseline justify-between pt-1 border-t border-slate-800/80">
            <div>
              <span className="text-xl sm:text-2xl font-black text-white tabular-nums tracking-tight">
                {formatINR(vehicle.price)}
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">Fair Transparent Price</span>
            </div>

            {/* Monthly EMI Estimate */}
            <button
              onClick={() => selectForEMI(vehicle)}
              className="text-right group/emi hover:text-gold-400 transition-colors"
              title="Click to calculate EMI for this car"
            >
              <span className="text-[11px] text-slate-400 block flex items-center justify-end gap-1">
                <Calculator className="w-3 h-3 text-gold-500 group-hover/emi:scale-110 transition-transform" />
                Est. EMI
              </span>
              <span className="text-xs font-bold text-gold-400 tabular-nums">
                ₹{quickEMI.toLocaleString('en-IN')}/mo*
              </span>
            </button>
          </div>

          {/* LINES 3, 4, 5: Kilometres, Fuel, Transmission Grid */}
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-obsidian-900/90 border border-slate-800/80 text-[11px]">
            {/* LINE 3: KM Driven */}
            <div className="text-left">
              <span className="text-slate-400 text-[10px] block flex items-center gap-1">
                <Gauge className="w-2.5 h-2.5 text-gold-500" /> KM
              </span>
              <span className="font-bold text-slate-200 tabular-nums">{formatKM(vehicle.km)}</span>
            </div>

            {/* LINE 4: Fuel Type */}
            <div className="text-left border-x border-slate-800/80 px-2">
              <span className="text-slate-400 text-[10px] block flex items-center gap-1">
                <Fuel className="w-2.5 h-2.5 text-gold-500" /> Fuel
              </span>
              <span className="font-bold text-slate-200">{vehicle.fuel}</span>
            </div>

            {/* LINE 5: Transmission */}
            <div className="text-left pl-1">
              <span className="text-slate-400 text-[10px] block">Gearbox</span>
              <span className="font-bold text-slate-200 truncate block">{vehicle.transmission}</span>
            </div>
          </div>

          {/* LINE 6: Ownership & Karnataka RTO */}
          <div className="flex items-center justify-between text-xs text-slate-300 px-1">
            <span className="font-semibold text-slate-300">
              {vehicle.ownership}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-gold-400 font-bold text-[11px]">
              {vehicle.rto} {vehicle.rtoLocation ? `(${vehicle.rtoLocation.split(',')[0]})` : ''}
            </span>
          </div>
        </div>

        {/* Card Action Buttons */}
        <div className="pt-3 border-t border-slate-800 space-y-2">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* View Details Action */}
            <button
              onClick={() => setSelectedVehicle(vehicle)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-gold-400" />
              <span>View Details</span>
            </button>

            {/* 140-Point Report Action */}
            <button
              onClick={() => setInspectionVehicle(vehicle)}
              className="py-2.5 px-3 rounded-xl bg-obsidian-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold border border-slate-700/80 transition-colors flex items-center justify-center gap-1.5"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inspection</span>
            </button>
          </div>

          {/* Direct WhatsApp Enquiry Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-3 rounded-xl bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-whatsapp-500/10 active:scale-[0.98]"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-slate-950" />
            <span>WhatsApp Enquiry</span>
          </a>
        </div>

      </div>
    </div>
  );
};
