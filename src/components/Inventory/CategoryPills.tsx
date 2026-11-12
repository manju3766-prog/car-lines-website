import React from 'react';
import { useShowroom } from '../../context/ShowroomContext';
import { BodyType } from '../../types/vehicle';

interface CategoryPillsProps {
  className?: string;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({ className = '' }) => {
  const { filters, setCategory, vehicles } = useShowroom();

  const categories: Array<{ id: 'All' | BodyType; label: string }> = [
    { id: 'All', label: 'All Cars' },
    { id: 'SUV', label: 'SUV' },
    { id: 'Sedan', label: 'Sedan' },
    { id: 'Hatchback', label: 'Hatchback' },
    { id: 'MPV', label: 'MPV' },
  ];

  const getCount = (cat: 'All' | BodyType) => {
    if (cat === 'All') return vehicles.length;
    return vehicles.filter(v => v.bodyType === cat).length;
  };

  return (
    <div className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none ${className}`}>
      {categories.map(cat => {
        const isSelected = filters.category === cat.id;
        const count = getCount(cat.id);

        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-gold-500 text-slate-950 border-gold-500 shadow-lg shadow-gold-500/20'
                : 'bg-obsidian-800 text-slate-300 border-slate-700/80 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
                isSelected
                  ? 'bg-slate-950/20 text-slate-950'
                  : 'bg-slate-900 text-gold-400 border border-slate-700'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
