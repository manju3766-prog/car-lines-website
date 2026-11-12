import React, { useState, useEffect } from 'react';
import { Calculator, MessageSquare, ShieldAlert, ChevronDown } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { calculateEMI, formatINR, createWhatsAppUrl } from '../../utils/formatters';
import { DEALERSHIP_CONFIG } from '../../data/inventory';

export const EMICalculator: React.FC = () => {
  const { vehicles, emiTargetVehicle } = useShowroom();

  // Selection: either a car ID or 'custom'
  const [selectedCarId, setSelectedCarId] = useState<string>(
    vehicles.length > 0 ? vehicles[0].id : 'custom'
  );

  const [customPrice, setCustomPrice] = useState<number>(1000000);
  const [downPayment, setDownPayment] = useState<number>(200000);
  const [tenureMonths, setTenureMonths] = useState<number>(60);
  const [annualRate, setAnnualRate] = useState<number>(9.5);

  // Sync when emiTargetVehicle changes from a vehicle card click
  useEffect(() => {
    if (emiTargetVehicle) {
      setSelectedCarId(emiTargetVehicle.id);
      const defaultDown = Math.round(emiTargetVehicle.price * 0.2); // 20% down
      setDownPayment(defaultDown);
    }
  }, [emiTargetVehicle]);

  // Determine current active vehicle price
  const activeCar = vehicles.find(v => v.id === selectedCarId);
  const currentVehiclePrice = activeCar ? activeCar.price : customPrice;

  // Ensure down payment doesn't exceed vehicle price
  const validatedDownPayment = Math.min(downPayment, Math.round(currentVehiclePrice * 0.9));
  const principalLoanAmount = Math.max(0, currentVehiclePrice - validatedDownPayment);

  // Calculate EMI
  const emiResult = calculateEMI(principalLoanAmount, annualRate, tenureMonths);

  const handleCarSelect = (id: string) => {
    setSelectedCarId(id);
    if (id !== 'custom') {
      const car = vehicles.find(v => v.id === id);
      if (car) {
        setDownPayment(Math.round(car.price * 0.2)); // 20% down payment default
      }
    }
  };

  const handleDownPaymentChange = (val: number) => {
    setDownPayment(Math.min(val, currentVehiclePrice));
  };

  const tenurePresets = [24, 36, 48, 60, 84];

  const carNameDisplay = activeCar ? activeCar.name : `Custom Vehicle (${formatINR(customPrice)})`;

  const whatsappMessage = `Hi CAR LINES, I am checking loan eligibility for ${carNameDisplay}. Estimated price: ${formatINR(currentVehiclePrice)}, Down payment: ${formatINR(validatedDownPayment)}, Tenure: ${tenureMonths} months, Est. EMI: ${formatINR(emiResult.monthlyEMI)}/month. Please assist with bank loan options.`;
  const whatsappUrl = createWhatsAppUrl(DEALERSHIP_CONFIG.whatsapp, whatsappMessage);

  return (
    <section id="emi-calculator" className="py-16 sm:py-24 bg-obsidian-950 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-xs uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Auto Loan Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Vehicle EMI & Loan Calculator
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Calculate accurate monthly repayments using standard reducing-balance bank interest. Check instant loan eligibility with our leading finance partners.
          </p>
        </div>

        {/* Main Calculator Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-obsidian-900 border border-slate-800 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">
          
          {/* Left Column: Interactive Inputs (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-7 text-xs text-slate-300 text-left">
            
            {/* 1. Vehicle Selection Dropdown */}
            <div>
              <label className="font-bold text-white block mb-2 flex items-center justify-between">
                <span>Select Vehicle to Finance</span>
                <span className="text-[11px] text-gold-400 font-semibold">9 Stock Cars + Custom Option</span>
              </label>
              <div className="relative">
                <select
                  value={selectedCarId}
                  onChange={e => handleCarSelect(e.target.value)}
                  className="w-full bg-obsidian-800 border border-slate-700/80 text-white rounded-xl px-4 py-3 appearance-none focus:outline-none focus:border-gold-500 text-xs font-semibold cursor-pointer"
                >
                  {vehicles.map(car => (
                    <option key={car.id} value={car.id}>
                      {car.name} ({car.year}) — {formatINR(car.price)}
                    </option>
                  ))}
                  <option value="custom">★ Enter Custom Vehicle Price</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Custom Price Input (if custom selected) */}
            {selectedCarId === 'custom' && (
              <div className="p-4 rounded-xl bg-obsidian-800/80 border border-gold-500/30 animate-fade-in space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">Custom Vehicle Price</span>
                  <span className="font-bold text-gold-400 tabular-nums">{formatINR(customPrice)}</span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="3000000"
                  step="25000"
                  value={customPrice}
                  onChange={e => {
                    const p = parseInt(e.target.value, 10);
                    setCustomPrice(p);
                    setDownPayment(Math.round(p * 0.2));
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                />
              </div>
            )}

            {/* 2. Down Payment Slider & Value */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-white block">Down Payment</span>
                  <span className="text-[10px] text-slate-400">
                    {Math.round((validatedDownPayment / currentVehiclePrice) * 100)}% of vehicle price
                  </span>
                </div>
                <span className="font-bold text-gold-400 text-sm tabular-nums">
                  {formatINR(validatedDownPayment)}
                </span>
              </div>
              <input
                type="range"
                min={Math.round(currentVehiclePrice * 0.1)}
                max={Math.round(currentVehiclePrice * 0.8)}
                step="10000"
                value={validatedDownPayment}
                onChange={e => handleDownPaymentChange(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>Min: {formatINR(Math.round(currentVehiclePrice * 0.1))} (10%)</span>
                <span>Max: {formatINR(Math.round(currentVehiclePrice * 0.8))} (80%)</span>
              </div>
            </div>

            {/* 3. Loan Tenure (12 to 84 months) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Loan Tenure</span>
                <span className="font-bold text-gold-400 text-sm tabular-nums">
                  {tenureMonths} Months ({ (tenureMonths / 12).toFixed(1) } Years)
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="84"
                step="6"
                value={tenureMonths}
                onChange={e => setTenureMonths(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {tenurePresets.map(months => (
                  <button
                    key={months}
                    onClick={() => setTenureMonths(months)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      tenureMonths === months
                        ? 'bg-gold-500 text-slate-950 font-bold'
                        : 'bg-obsidian-800 text-slate-400 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {months} mo ({months / 12}y)
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Annual Interest Rate (8.5% to 14.5%) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-bold text-white block">Annual Interest Rate</span>
                  <span className="text-[10px] text-slate-400">Competitive pre-owned rates</span>
                </div>
                <span className="font-bold text-gold-400 text-sm tabular-nums">
                  {annualRate.toFixed(1)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="8.5"
                max="14.5"
                step="0.1"
                value={annualRate}
                onChange={e => setAnnualRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>8.5% (Prime Tier)</span>
                <span>14.5% (Standard)</span>
              </div>
            </div>

          </div>

          {/* Right Column: Calculations & WhatsApp Eligibility Check (5 cols on lg) */}
          <div className="lg:col-span-5 bg-obsidian-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-left">
            
            {/* Monthly EMI Callout */}
            <div className="text-center pb-6 border-b border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Estimated Monthly EMI
              </span>
              <span className="text-3xl sm:text-4xl font-black text-white tabular-nums tracking-tight block">
                {formatINR(emiResult.monthlyEMI)}
                <span className="text-sm font-bold text-gold-400"> / month</span>
              </span>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Calculated on reducing-balance method
              </span>
            </div>

            {/* Breakdown Grid */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Vehicle Price</span>
                <span className="font-bold text-white tabular-nums">{formatINR(currentVehiclePrice)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Down Payment</span>
                <span className="font-bold text-white tabular-nums">{formatINR(validatedDownPayment)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Principal Loan Amount</span>
                <span className="font-bold text-emerald-400 tabular-nums">{formatINR(principalLoanAmount)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span className="text-slate-400">Total Interest Payable</span>
                <span className="font-bold text-gold-400 tabular-nums">{formatINR(emiResult.totalInterest)}</span>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Repayment</span>
                <span className="tabular-nums text-white">{formatINR(emiResult.totalRepayment)}</span>
              </div>
            </div>

            {/* Visual Principal vs Interest Split Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Principal ({emiResult.principalPercent}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-500"></span>
                  Interest ({emiResult.interestPercent}%)
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300" 
                  style={{ width: `${emiResult.principalPercent}%` }}
                ></div>
                <div 
                  className="bg-gold-500 h-full transition-all duration-300" 
                  style={{ width: `${emiResult.interestPercent}%` }}
                ></div>
              </div>
            </div>

            {/* WhatsApp Loan Eligibility Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-whatsapp-500 hover:bg-whatsapp-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-whatsapp-500/10 active:scale-95"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Check Loan Eligibility on WhatsApp</span>
              </a>
            </div>

            {/* Mandatory Disclaimer */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-gold-500 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Disclaimer:</strong> Illustrative EMI only. Actual loan approval, interest rates, fees and repayment terms are subject to lender assessment.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
