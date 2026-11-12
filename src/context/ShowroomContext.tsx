import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, FilterState, BodyType } from '../types/vehicle';
import { SEED_VEHICLES } from '../data/inventory';

const INITIAL_FILTERS: FilterState = {
  category: 'All',
  searchQuery: '',
  priceRange: [500000, 2000000],
  fuelTypes: [],
  transmissionTypes: [],
  bodyTypes: [],
  years: [],
  brands: [],
  maxKm: 60000,
  sortBy: 'featured',
};

interface ShowroomContextType {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  // Shortlist
  shortlistIds: string[];
  shortlistedVehicles: Vehicle[];
  toggleShortlist: (id: string) => void;
  isShortlisted: (id: string) => boolean;
  clearShortlist: () => void;
  isShortlistOpen: boolean;
  setIsShortlistOpen: (open: boolean) => void;
  // Comparison
  comparisonIds: string[];
  comparedVehicles: Vehicle[];
  addToCompare: (vehicle: Vehicle) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  isCompareOpen: boolean;
  setIsCompareOpen: (open: boolean) => void;
  // Modals
  selectedVehicle: Vehicle | null;
  setSelectedVehicle: (vehicle: Vehicle | null) => void;
  inspectionVehicle: Vehicle | null;
  setInspectionVehicle: (vehicle: Vehicle | null) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;
  isCityModalOpen: boolean;
  setIsCityModalOpen: (open: boolean) => void;
  // EMI Calculator trigger
  emiTargetVehicle: Vehicle | null;
  selectForEMI: (vehicle: Vehicle) => void;
  // Filters
  filters: FilterState;
  setCategory: (cat: 'All' | BodyType) => void;
  setSearchQuery: (query: string) => void;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  activeFilterCount: number;
}

const ShowroomContext = createContext<ShowroomContextType | undefined>(undefined);

export const ShowroomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles] = useState<Vehicle[]>(SEED_VEHICLES);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  
  // Modals state
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [inspectionVehicle, setInspectionVehicle] = useState<Vehicle | null>(null);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [emiTargetVehicle, setEmiTargetVehicle] = useState<Vehicle | null>(null);

  // Shortlist state persisted in localStorage
  const [shortlistIds, setShortlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('car_lines_shortlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('car_lines_shortlist', JSON.stringify(shortlistIds));
    } catch (e) {
      console.warn('Unable to persist shortlist to localStorage', e);
    }
  }, [shortlistIds]);

  // Comparison state persisted in localStorage
  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('car_lines_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('car_lines_compare', JSON.stringify(comparisonIds));
    } catch (e) {
      console.warn('Unable to persist comparison to localStorage', e);
    }
  }, [comparisonIds]);

  const toggleShortlist = (id: string) => {
    setShortlistIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isShortlisted = (id: string) => shortlistIds.includes(id);

  const clearShortlist = () => setShortlistIds([]);

  const addToCompare = (vehicle: Vehicle) => {
    if (comparisonIds.includes(vehicle.id)) {
      return;
    }
    if (comparisonIds.length >= 3) {
      alert('You can compare a maximum of 3 vehicles at a time.');
      return;
    }
    setComparisonIds(prev => [...prev, vehicle.id]);
  };

  const removeFromCompare = (id: string) => {
    setComparisonIds(prev => prev.filter(item => item !== id));
  };

  const isInCompare = (id: string) => comparisonIds.includes(id);

  const clearCompare = () => setComparisonIds([]);

  const setCategory = (category: 'All' | BodyType) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const setSearchQuery = (searchQuery: string) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const selectForEMI = (vehicle: Vehicle) => {
    setEmiTargetVehicle(vehicle);
    const emiSection = document.getElementById('emi-calculator');
    if (emiSection) {
      emiSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter count
  const activeFilterCount = (
    (filters.category !== 'All' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0) +
    filters.fuelTypes.length +
    filters.transmissionTypes.length +
    filters.bodyTypes.length +
    filters.years.length +
    filters.brands.length +
    (filters.maxKm < 60000 ? 1 : 0) +
    (filters.priceRange[0] > 500000 || filters.priceRange[1] < 2000000 ? 1 : 0)
  );

  // Filtered and sorted vehicles
  const filteredVehicles = vehicles
    .filter(vehicle => {
      // Category filter (pills)
      if (filters.category !== 'All' && vehicle.bodyType !== filters.category) {
        return false;
      }

      // Search query (Brand, Model, Name, Year, RTO code)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesBrand = vehicle.brand.toLowerCase().includes(query);
        const matchesModel = vehicle.model.toLowerCase().includes(query);
        const matchesName = vehicle.name.toLowerCase().includes(query);
        const matchesYear = vehicle.year.toString().includes(query);
        const matchesRTO = vehicle.rto.toLowerCase().replace('-', '').includes(query.replace('-', '')) ||
                           vehicle.rto.toLowerCase().includes(query);
        const matchesBody = vehicle.bodyType.toLowerCase().includes(query);

        if (!matchesBrand && !matchesModel && !matchesName && !matchesYear && !matchesRTO && !matchesBody) {
          return false;
        }
      }

      // Price range
      if (vehicle.price < filters.priceRange[0] || vehicle.price > filters.priceRange[1]) {
        return false;
      }

      // Fuel types
      if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(vehicle.fuel)) {
        return false;
      }

      // Transmission
      if (filters.transmissionTypes.length > 0 && !filters.transmissionTypes.includes(vehicle.transmission)) {
        return false;
      }

      // Body types (multi-select filter)
      if (filters.bodyTypes.length > 0 && !filters.bodyTypes.includes(vehicle.bodyType)) {
        return false;
      }

      // Years
      if (filters.years.length > 0 && !filters.years.includes(vehicle.year)) {
        return false;
      }

      // Brands
      if (filters.brands.length > 0 && !filters.brands.includes(vehicle.brand)) {
        return false;
      }

      // Max KM
      if (vehicle.km > filters.maxKm) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'year-desc':
          return b.year - a.year;
        case 'km-asc':
          return a.km - b.km;
        case 'featured':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });

  const shortlistedVehicles = vehicles.filter(v => shortlistIds.includes(v.id));
  const comparedVehicles = vehicles.filter(v => comparisonIds.includes(v.id));

  return (
    <ShowroomContext.Provider
      value={{
        vehicles,
        filteredVehicles,
        shortlistIds,
        shortlistedVehicles,
        toggleShortlist,
        isShortlisted,
        clearShortlist,
        isShortlistOpen,
        setIsShortlistOpen,
        comparisonIds,
        comparedVehicles,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isCompareOpen,
        setIsCompareOpen,
        selectedVehicle,
        setSelectedVehicle,
        inspectionVehicle,
        setInspectionVehicle,
        isAccountModalOpen,
        setIsAccountModalOpen,
        isCityModalOpen,
        setIsCityModalOpen,
        emiTargetVehicle,
        selectForEMI,
        filters,
        setCategory,
        setSearchQuery,
        updateFilter,
        resetFilters,
        activeFilterCount,
      }}
    >
      {children}
    </ShowroomContext.Provider>
  );
};

export const useShowroom = () => {
  const context = useContext(ShowroomContext);
  if (!context) {
    throw new Error('useShowroom must be used within a ShowroomProvider');
  }
  return context;
};
