import React from 'react';
import { X, RotateCcw, Check } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { FuelType, TransmissionType, BodyType } from '../../types/vehicle';
import { formatINR, formatNumber } from '../../utils/formatters';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({ isOpen, onClose }) => {
  const { filters, updateFilter, resetFilters, activeFilterCount } = useShowroom();

  if (!isOpen) return null;

  const handleFuelToggle = (fuel: FuelType) => {
    const next = filters.fuelTypes.includes(fuel)
      ? filters.fuelTypes.filter(f => f !== fuel)
      : [...filters.fuelTypes, fuel];
    updateFilter('fuelTypes', next);
  };

  const handleTransmissionToggle = (trans: TransmissionType) => {
    const next = filters.transmissionTypes.includes(trans)
      ? filters.transmissionTypes.filter(t => t !== trans)
      : [...filters.transmissionTypes, trans];
    updateFilter('transmissionTypes', next);
  };

  const handleBodyTypeToggle = (body: BodyType) => {
    const next = filters.bodyTypes.includes(body)
      ? filters.bodyTypes.filter(b => b !== body)
      : [...filters.bodyTypes, body];
    updateFilter('bodyTypes', next);
  };

  const handleYearToggle = (year: number) => {
    const next = filters.years.includes(year)
      ? filters.years.filter(y => y !== year)
      : [...filters.years, year];
    updateFilter('years', next);
  };

  const availableYears = [2023, 2022, 2021, 2020, 2019];
  const fuelOptions: FuelType[] = ['Petrol', 'Diesel'];
  const transOptions: TransmissionType[] = ['Manual', 'Automatic'];
  const bodyOptions: BodyType[] = ['SUV', 'Sedan', 'Hatchback', 'MPV'];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in" role="dialog" aria-modal="true">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-obsidian-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-obsidian-950">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Filter Inventory
                {activeFilterCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-black bg-gold-500 text-slate-950">
                    {activeFilterCount} Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-400">Refine verified dealership cars</p>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-300">
            
            {/* 1. Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Maximum Budget</span>
                <span className="font-bold text-gold-400 tabular-nums">
                  {formatINR(filters.priceRange[1])}
                </span>
              </div>
              <input
                type="range"
                min="600000"
                max="2000000"
                step="50000"
                value={filters.priceRange[1]}
                onChange={e => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value, 10)])}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹6.0 Lakh</span>
                <span>₹20.0 Lakh</span>
              </div>
            </div>

            {/* 2. Fuel Type */}
            <div>
              <span className="font-bold text-white block mb-2.5">Fuel Type</span>
              <div className="grid grid-cols-2 gap-2">
                {fuelOptions.map(fuel => {
                  const checked = filters.fuelTypes.includes(fuel);
                  return (
                    <button
                      key={fuel}
                      onClick={() => handleFuelToggle(fuel)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border font-semibold transition-all ${
                        checked
                          ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                          : 'bg-obsidian-800 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{fuel}</span>
                      {checked && <Check className="w-4 h-4 text-gold-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Transmission */}
            <div>
              <span className="font-bold text-white block mb-2.5">Transmission</span>
              <div className="grid grid-cols-2 gap-2">
                {transOptions.map(trans => {
                  const checked = filters.transmissionTypes.includes(trans);
                  return (
                    <button
                      key={trans}
                      onClick={() => handleTransmissionToggle(trans)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border font-semibold transition-all ${
                        checked
                          ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                          : 'bg-obsidian-800 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{trans}</span>
                      {checked && <Check className="w-4 h-4 text-gold-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Body Type */}
            <div>
              <span className="font-bold text-white block mb-2.5">Body Type</span>
              <div className="grid grid-cols-2 gap-2">
                {bodyOptions.map(body => {
                  const checked = filters.bodyTypes.includes(body);
                  return (
                    <button
                      key={body}
                      onClick={() => handleBodyTypeToggle(body)}
                      className={`flex items-center justify-between p-2.5 rounded-xl border font-semibold transition-all ${
                        checked
                          ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                          : 'bg-obsidian-800 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>{body}</span>
                      {checked && <Check className="w-4 h-4 text-gold-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. Model Year */}
            <div>
              <span className="font-bold text-white block mb-2.5">Model Year</span>
              <div className="flex flex-wrap gap-2">
                {availableYears.map(year => {
                  const checked = filters.years.includes(year);
                  return (
                    <button
                      key={year}
                      onClick={() => handleYearToggle(year)}
                      className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                        checked
                          ? 'bg-gold-500 text-slate-950 border-gold-500'
                          : 'bg-obsidian-800 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {year}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Kilometres Driven Limit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">Kilometres Driven</span>
                <span className="font-bold text-gold-400 tabular-nums">
                  Up to {formatNumber(filters.maxKm)} km
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="60000"
                step="5000"
                value={filters.maxKm}
                onChange={e => updateFilter('maxKm', parseInt(e.target.value, 10))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>15,000 km</span>
                <span>60,000 km</span>
              </div>
            </div>

          </div>

          {/* Footer Controls */}
          <div className="p-4 border-t border-slate-800 bg-obsidian-950 flex items-center gap-3">
            <button
              onClick={resetFilters}
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All</span>
            </button>

            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gold-500 hover:bg-gold-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg shadow-gold-500/20"
            >
              Apply Filters
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
