import React, { useState } from 'react';
import { SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';
import { useShowroom } from '../../context/ShowroomContext';
import { FilterDrawer } from './FilterDrawer';
import { FuelType, TransmissionType } from '../../types/vehicle';

export const FilterBar: React.FC = () => {
  const { filters, updateFilter, resetFilters, activeFilterCount, filteredVehicles, vehicles } = useShowroom();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleFuel = (fuel: FuelType) => {
    const next = filters.fuelTypes.includes(fuel)
      ? filters.fuelTypes.filter(f => f !== fuel)
      : [...filters.fuelTypes, fuel];
    updateFilter('fuelTypes', next);
  };

  const toggleTransmission = (trans: TransmissionType) => {
    const next = filters.transmissionTypes.includes(trans)
      ? filters.transmissionTypes.filter(t => t !== trans)
      : [...filters.transmissionTypes, trans];
    updateFilter('transmissionTypes', next);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-slate-800 text-xs">
        
        {/* Left: Quick Filter Toggles & All Filters Button */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Main Filter Drawer Button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold transition-all border ${
              activeFilterCount > 0
                ? 'bg-gold-500/10 border-gold-500 text-gold-400'
                : 'bg-obsidian-800 border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-gold-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Quick Fuel Toggles */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-800">
            {(['Petrol', 'Diesel'] as FuelType[]).map(fuel => {
              const active = filters.fuelTypes.includes(fuel);
              return (
                <button
                  key={fuel}
                  onClick={() => toggleFuel(fuel)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                    active
                      ? 'bg-gold-500 text-slate-950 border-gold-500 font-bold'
                      : 'bg-obsidian-800/80 text-slate-400 border-slate-700/60 hover:text-slate-200'
                  }`}
                >
                  {fuel}
                </button>
              );
            })}
          </div>

          {/* Quick Transmission Toggles */}
          <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-800">
            {(['Automatic', 'Manual'] as TransmissionType[]).map(trans => {
              const active = filters.transmissionTypes.includes(trans);
              return (
                <button
                  key={trans}
                  onClick={() => toggleTransmission(trans)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all border ${
                    active
                      ? 'bg-gold-500 text-slate-950 border-gold-500 font-bold'
                      : 'bg-obsidian-800/80 text-slate-400 border-slate-700/60 hover:text-slate-200'
                  }`}
                >
                  {trans}
                </button>
              );
            })}
          </div>

          {/* Clear Filters (if any) */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-2.5 py-1.5 text-slate-400 hover:text-gold-400 transition-colors ml-1"
              title="Clear all active filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort Dropdown */}
        <div className="flex items-center gap-4 ml-auto">
          <span className="text-slate-400 hidden lg:inline">
            Showing <strong className="text-white">{filteredVehicles.length}</strong> of {vehicles.length} cars
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-gold-500" />
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value as any)}
              className="bg-obsidian-800 border border-slate-700/80 text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-gold-500 text-xs font-medium cursor-pointer"
            >
              <option value="featured">Featured Stock</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="year-desc">Newest Model</option>
              <option value="km-asc">Lowest Kilometres</option>
            </select>
          </div>
        </div>

      </div>

      <FilterDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
