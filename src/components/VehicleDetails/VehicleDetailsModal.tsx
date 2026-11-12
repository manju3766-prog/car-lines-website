import React, { useEffect } from 'react';
import { 
  X, 
  Heart, 
  GitCompare, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { DEALERSHIP_CONFIG } from '../../data/inventory';
import { formatINR, formatKM, createWhatsAppUrl, getQuickEMIEstimate } from '../../utils/formatters';

export const VehicleDetailsModal: React.FC = () => {
  const { 
    selectedVehicle, 
    setSelectedVehicle, 
    isShortlisted, 
    toggleShortlist, 
    isInCompare, 
    addToCompare, 
    removeFromCompare,
    selectForEMI 
  } = useShowroom();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedVehicle(null);
      }
    };
    if (selectedVehicle) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedVehicle, setSelectedVehicle]);

  if (!selectedVehicle) return null;

  const vehicle = selectedVehicle;
  const shortlisted = isShortlisted(vehicle.id);
  const inCompare = isInCompare(vehicle.id);
  const quickEMI = getQuickEMIEstimate(vehicle.price);

  const enquiryText = `Hi CAR LINES, I am interested in the ${vehicle.name} (${vehicle.rto}) listed for ${formatINR(vehicle.price)}. Please share full service history, RC status and test drive timings.`;
  const testDriveText = `Hi CAR LINES, I would like to book a test drive for the ${vehicle.name} (${vehicle.rto}, ${formatINR(vehicle.price)}) at your Outer Ring Road showroom.`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setSelectedVehicle(null)}
    >
      <div 
        className="w-full max-w-4xl bg-obsidian-900 border border-slate-700/80 rounded-3xl shadow-2xl relative overflow-hidden my-auto text-left"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-obsidian-950">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gold-500/10 text-gold-400 border border-gold-500/30">
              {vehicle.bodyType}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Verified Stock ID: #{vehicle.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Compare Toggle */}
            <button
              onClick={() => inCompare ? removeFromCompare(vehicle.id) : addToCompare(vehicle)}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                inCompare
                  ? 'bg-gold-500 text-slate-950 border-gold-400 font-bold'
                  : 'bg-obsidian-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline">{inCompare ? 'Comparing' : 'Compare'}</span>
            </button>

            {/* Shortlist Heart */}
            <button
              onClick={() => toggleShortlist(vehicle.id)}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                shortlisted
                  ? 'bg-pink-500 text-white border-pink-400 font-bold'
                  : 'bg-obsidian-800 text-slate-300 border-slate-700 hover:text-pink-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${shortlisted ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">{shortlisted ? 'Saved' : 'Shortlist'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={() => setSelectedVehicle(null)}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-200">
          
          {/* Main Visual & Key Stats Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Image Showcase */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-obsidian-950 border border-slate-800">
                <img
                  src={vehicle.imageUrl}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-obsidian-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/80 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  140-Point Multi-Point Certified
                </div>
              </div>

              {/* Additional Photos / Gallery Thumbs */}
              {vehicle.additionalImages && vehicle.additionalImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  <img
                    src={vehicle.imageUrl}
                    alt="Main thumbnail"
                    className="h-16 w-full object-cover rounded-xl border-2 border-gold-500 opacity-100"
                  />
                  {vehicle.additionalImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${vehicle.name} angle ${idx + 1}`}
                      className="h-16 w-full object-cover rounded-xl border border-slate-800 opacity-75 hover:opacity-100 transition-opacity"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Overview & Pricing */}
            <div className="lg:col-span-5 space-y-5 bg-obsidian-800/80 border border-slate-800 p-5 rounded-2xl">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                  {vehicle.year} • {vehicle.brand}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {vehicle.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <span>{vehicle.variant}</span>
                  <span>•</span>
                  <span>{vehicle.color || 'Original Factory Color'}</span>
                </div>
              </div>

              {/* Price & EMI Box */}
              <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800/90 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
                      {formatINR(vehicle.price)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Inclusive of RC transfer assistance</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedVehicle(null);
                      selectForEMI(vehicle);
                    }}
                    className="text-right hover:text-gold-400 transition-colors"
                  >
                    <span className="text-[10px] text-slate-400 block">Est. EMI</span>
                    <span className="text-xs font-bold text-gold-400 tabular-nums">
                      ₹{quickEMI.toLocaleString('en-IN')}/mo*
                    </span>
                  </button>
                </div>
              </div>

              {/* Key Specifications Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Kilometres</span>
                  <span className="font-bold text-white tabular-nums">{formatKM(vehicle.km)}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Fuel Type</span>
                  <span className="font-bold text-white">{vehicle.fuel}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Transmission</span>
                  <span className="font-bold text-white">{vehicle.transmission}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Registration & RTO</span>
                  <span className="font-bold text-gold-400">{vehicle.rto} ({vehicle.rtoLocation?.split(',')[0] || 'KA'})</span>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={createWhatsAppUrl(DEALERSHIP_CONFIG.whatsapp, enquiryText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageSquare className="w-4 h-4 fill-slate-950" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={createWhatsAppUrl(DEALERSHIP_CONFIG.whatsapp, testDriveText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 text-center transition-colors"
                  >
                    Book Test Drive
                  </a>

                  <a
                    href={`tel:${DEALERSHIP_CONFIG.phoneRaw}`}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Call Showroom</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Engine & Verified Information */}
          <div className="p-5 rounded-2xl bg-obsidian-800/80 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gold-500 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Verified Vehicle Details & History
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Engine Specifications</span>
                <span className="font-semibold text-white block">
                  {vehicle.engineSpecs || 'Not provided'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Insurance Validity</span>
                <span className="font-semibold text-white block">
                  {vehicle.insuranceValidity || 'Not provided'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-400 block text-[11px]">Ownership Serial</span>
                <span className="font-semibold text-white block">
                  {vehicle.ownership} (Verified on Parivahan)
                </span>
              </div>
            </div>

            {/* Key Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-xs font-semibold text-slate-400 block mb-2">
                  Factory Equipment & Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((feat, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-obsidian-900 border border-slate-700/80 text-[11px] text-slate-300 font-medium"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 5-Category 140-Point Inspection Details */}
          <div className="p-5 rounded-2xl bg-obsidian-800/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gold-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  140-Point Inspection Checklist
                </h3>
                <p className="text-xs text-slate-400">Certified by CAR LINES Senior Automotive Technician</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                140 / 140 Passed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {/* Category 1: Engine & Transmission */}
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">1. Engine & Transmission</span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 38 Checks
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {vehicle.inspection.engineTransmission.details}
                </p>
              </div>

              {/* Category 2: Non-Accidental Chassis */}
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">2. Non-Accidental Chassis</span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 32 Checks
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {vehicle.inspection.nonAccidentalChassis.details}
                </p>
              </div>

              {/* Category 3: Exterior & Tyres */}
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">3. Exterior & Tyres</span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 30 Checks
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {vehicle.inspection.exteriorTyres.details}
                </p>
              </div>

              {/* Category 4: OBD-II Electricals */}
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">4. OBD-II Electricals</span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 22 Checks
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {vehicle.inspection.obdElectricals.details}
                </p>
              </div>

              {/* Category 5: RTO & Legal Clearance */}
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800 md:col-span-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-white">5. RTO & Legal Paperwork Clearance</span>
                  <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 18 Checks
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {vehicle.inspection.rtoLegal.details}
                </p>
              </div>
            </div>
          </div>

          {/* Showroom Visit Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-obsidian-950 to-slate-900 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gold-500/10 border border-gold-500/30 text-gold-500 flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-white block">Inspect Physically at Our Bengaluru Showroom</span>
                <span className="text-slate-400">{DEALERSHIP_CONFIG.address}</span>
              </div>
            </div>

            <a
              href={DEALERSHIP_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-lg text-xs whitespace-nowrap transition-colors"
            >
              Get Directions
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
