import React from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { CategoryPills } from './CategoryPills';
import { FilterBar } from './FilterBar';
import { VehicleCard } from './VehicleCard';
import { SearchX, RotateCcw, Car } from 'lucide-react';

export const VehicleGrid: React.FC = () => {
  const { filteredVehicles, resetFilters } = useShowroom();

  return (
    <section id="inventory" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-gold-500 font-bold text-xs uppercase tracking-wider mb-2">
            <Car className="w-4 h-4" />
            <span>Bengaluru Live Stock</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Verified Pre-Owned Cars
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Each car undergoes our comprehensive 140-point quality check, verified non-accidental chassis inspection, and transparent paperwork.
          </p>
        </div>
      </div>

      {/* Category Pills (All, SUV, Sedan, Hatchback, MPV) */}
      <CategoryPills className="mb-6" />

      {/* Filter and Sorting Controls Bar */}
      <div className="mb-8">
        <FilterBar />
      </div>

      {/* Vehicle Grid */}
      {filteredVehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      ) : (
        /* Polished Empty State */
        <div className="py-20 px-4 rounded-3xl bg-obsidian-800/60 border border-slate-800 text-center max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto mb-4">
            <SearchX className="w-8 h-8 text-gold-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No Matching Cars Found</h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-6">
            We couldn't find any certified vehicles matching your exact filter criteria. Try adjusting your budget, fuel type, or clear active filters.
          </p>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

    </section>
  );
};
