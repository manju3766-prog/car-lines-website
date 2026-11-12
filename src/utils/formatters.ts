import { EMICalculation } from '../types/vehicle';
import { DEALERSHIP_CONFIG } from '../data/inventory';

const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat('en-IN');

export function formatINR(amount: number): string {
  return inrFormatter.format(amount);
}

export function formatNumber(val: number): string {
  return numberFormatter.format(val);
}

export function formatKM(km: number): string {
  return `${numberFormatter.format(km)} km`;
}

/**
 * Calculates Reducing Balance Monthly EMI:
 * EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): EMICalculation {
  if (principal <= 0) {
    return {
      vehiclePrice: 0,
      downPayment: 0,
      loanAmount: 0,
      annualInterestRate: annualRate,
      tenureMonths,
      monthlyEMI: 0,
      totalInterest: 0,
      totalRepayment: 0,
      principalPercent: 100,
      interestPercent: 0,
    };
  }

  const monthlyRate = annualRate / (12 * 100);
  let emi = 0;

  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);
    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const roundedEMI = Math.round(emi);
  const totalRepayment = roundedEMI * tenureMonths;
  const totalInterest = Math.max(0, totalRepayment - principal);

  const principalPercent = totalRepayment > 0 ? (principal / totalRepayment) * 100 : 100;
  const interestPercent = totalRepayment > 0 ? (totalInterest / totalRepayment) * 100 : 0;

  return {
    vehiclePrice: principal,
    downPayment: 0,
    loanAmount: principal,
    annualInterestRate: annualRate,
    tenureMonths,
    monthlyEMI: roundedEMI,
    totalInterest,
    totalRepayment,
    principalPercent: Math.round(principalPercent),
    interestPercent: Math.round(interestPercent),
  };
}

/**
 * Standard quick EMI estimate for cards (80% loan, 9.5% p.a., 60 months)
 */
export function getQuickEMIEstimate(price: number): number {
  const loanAmount = Math.round(price * 0.8);
  const res = calculateEMI(loanAmount, 9.5, 60);
  return res.monthlyEMI;
}

/**
 * Live showroom open/closed status strictly in Asia/Kolkata timezone
 * Dealership is open 10:00 AM to 8:00 PM IST daily
 */
export function getShowroomStatusIST(): {
  isOpen: boolean;
  statusText: string;
  timeString: string;
} {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: DEALERSHIP_CONFIG.timezone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    
    // Get hour in 24h format for comparison
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: DEALERSHIP_CONFIG.timezone,
      hour: 'numeric',
      hour12: false,
    });
    
    const currentHour = parseInt(hourFormatter.format(now), 10);
    const isOpen = currentHour >= DEALERSHIP_CONFIG.openingHour && currentHour < DEALERSHIP_CONFIG.closingHour;
    const timeString = formatter.format(now);

    return {
      isOpen,
      statusText: isOpen ? 'Showroom Open Now' : 'Showroom Closed (Opens 10 AM)',
      timeString: `${timeString} IST`,
    };
  } catch {
    return {
      isOpen: true,
      statusText: 'Showroom Open (10 AM - 8 PM)',
      timeString: 'IST',
    };
  }
}

/**
 * Creates encoded WhatsApp URL with pre-filled message
 */
export function createWhatsAppUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
