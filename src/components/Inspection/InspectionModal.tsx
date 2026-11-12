import React from 'react';
import { X, ShieldCheck, Wrench, Layers, Eye, Cpu, FileCheck } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';

export const InspectionModal: React.FC = () => {
  const { inspectionVehicle, setInspectionVehicle } = useShowroom();

  if (!inspectionVehicle) return null;

  const vehicle = inspectionVehicle;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      onClick={() => setInspectionVehicle(null)}
    >
      <div 
        className="w-full max-w-3xl bg-obsidian-900 border border-slate-700/80 rounded-3xl shadow-2xl relative overflow-hidden my-auto text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-obsidian-950">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                140-Point Inspection Verification Report
              </h3>
              <p className="text-xs text-slate-400">
                {vehicle.name} ({vehicle.rto}) • Single Owner Certified
              </p>
            </div>
          </div>

          <button
            onClick={() => setInspectionVehicle(null)}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            aria-label="Close inspection modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6 space-y-6 text-xs text-slate-300">
          
          <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider block">
                CAR LINES Quality Standard
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Each checkpoint has been physically verified by our technicians on Outer Ring Road, Bengaluru.
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl font-black text-emerald-400">140 / 140</span>
              <span className="text-[10px] text-slate-400 block font-semibold">Checkpoints Cleared</span>
            </div>
          </div>

          {/* 5 Specific Categories */}
          <div className="space-y-4">
            {/* Category 1 */}
            <div className="p-4 rounded-2xl bg-obsidian-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Wrench className="w-4 h-4 text-gold-500" />
                  <span>1. Engine & Transmission (38 Checkpoints)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  PASSED
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {vehicle.inspection.engineTransmission.details}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>✓ Compression & Cold Start</span>
                <span>✓ Turbo / Injector Performance</span>
                <span>✓ Clutch / Gear Shifting Mesh</span>
                <span>✓ Radiator & Coolant Lines</span>
              </div>
            </div>

            {/* Category 2 */}
            <div className="p-4 rounded-2xl bg-obsidian-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Layers className="w-4 h-4 text-gold-500" />
                  <span>2. Non-Accidental Chassis (32 Checkpoints)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  PASSED
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {vehicle.inspection.nonAccidentalChassis.details}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>✓ Apron & Cross-Member Alignment</span>
                <span>✓ Original A, B, C Pillars</span>
                <span>✓ Zero Structural Rework</span>
                <span>✓ Underbody Corrosion Check</span>
              </div>
            </div>

            {/* Category 3 */}
            <div className="p-4 rounded-2xl bg-obsidian-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Eye className="w-4 h-4 text-gold-500" />
                  <span>3. Exterior & Tyres (30 Checkpoints)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  PASSED
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {vehicle.inspection.exteriorTyres.details}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>✓ Paint Thickness & Uniformity</span>
                <span>✓ All 4 Tyres + Spare Depth</span>
                <span>✓ Factory Glass Code Verification</span>
                <span>✓ Suspension Bushings & Dampers</span>
              </div>
            </div>

            {/* Category 4 */}
            <div className="p-4 rounded-2xl bg-obsidian-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Cpu className="w-4 h-4 text-gold-500" />
                  <span>4. OBD-II Electricals (22 Checkpoints)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  PASSED
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {vehicle.inspection.obdElectricals.details}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>✓ ECU / OBD-II Scanner Diagnostics</span>
                <span>✓ Alternator Charging & Battery Health</span>
                <span>✓ Airbags & ABS Wheel Sensors</span>
                <span>✓ Infotainment & Air Conditioning</span>
              </div>
            </div>

            {/* Category 5 */}
            <div className="p-4 rounded-2xl bg-obsidian-800 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <FileCheck className="w-4 h-4 text-gold-500" />
                  <span>5. RTO & Legal Clearance (18 Checkpoints)</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                  PASSED
                </span>
              </div>
              <p className="text-slate-300 text-xs">
                {vehicle.inspection.rtoLegal.details}
              </p>
              <div className="pt-2 text-[11px] text-slate-400 grid grid-cols-2 gap-2">
                <span>✓ Parivahan RC Record Authenticity</span>
                <span>✓ Hypothecation NOC Verification</span>
                <span>✓ Valid Road Tax in Karnataka</span>
                <span>✓ Form 29 & 30 Ready for Transfer</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong className="text-white block mb-1">Authentic Inspection Standard:</strong>
            All inspection checkpoints are conducted strictly in-house at CAR LINES. We never falsify scores or promise unverified third-party warranties. You are warmly invited to bring your trusted independent mechanic to test drive and inspect this car anytime during showroom hours.
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-obsidian-950 flex justify-end">
          <button
            onClick={() => setInspectionVehicle(null)}
            className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl text-xs"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};
