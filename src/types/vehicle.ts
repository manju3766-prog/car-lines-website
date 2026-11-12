export type BodyType = 'SUV' | 'Sedan' | 'Hatchback' | 'MPV';
export type FuelType = 'Petrol' | 'Diesel';
export type TransmissionType = 'Manual' | 'Automatic';

export interface InspectionDetails {
  engineTransmission: {
    status: 'Verified' | 'Certified';
    details: string;
    checkpoints: number;
  };
  nonAccidentalChassis: {
    status: 'Verified' | 'Certified';
    details: string;
    checkpoints: number;
  };
  exteriorTyres: {
    status: 'Verified' | 'Certified';
    details: string;
    checkpoints: number;
  };
  obdElectricals: {
    status: 'Verified' | 'Certified';
    details: string;
    checkpoints: number;
  };
  rtoLegal: {
    status: 'Verified' | 'Certified';
    details: string;
    checkpoints: number;
  };
  totalPoints: number; // e.g. 140
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  bodyType: BodyType;
  fuel: FuelType;
  transmission: TransmissionType;
  km: number;
  ownership: string;
  rto: string;
  rtoLocation?: string;
  imageUrl: string;
  additionalImages?: string[];
  color?: string;
  engineSpecs?: string;
  insuranceValidity?: string;
  features?: string[];
  inspection: InspectionDetails;
  isPopular?: boolean;
}

export interface FilterState {
  category: 'All' | BodyType;
  searchQuery: string;
  priceRange: [number, number]; // min, max
  fuelTypes: FuelType[];
  transmissionTypes: TransmissionType[];
  bodyTypes: BodyType[];
  years: number[];
  brands: string[];
  maxKm: number;
  sortBy: 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc' | 'featured';
}

export interface EMICalculation {
  vehiclePrice: number;
  downPayment: number;
  loanAmount: number;
  annualInterestRate: number;
  tenureMonths: number;
  monthlyEMI: number;
  totalInterest: number;
  totalRepayment: number;
  principalPercent: number;
  interestPercent: number;
}
