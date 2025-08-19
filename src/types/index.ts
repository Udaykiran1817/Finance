export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  panCard: string;
  aadharCard: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Asset {
  id: string;
  type: 'mutual_fund' | 'shares' | 'gold' | 'fixed_deposit' | 'investment';
  name: string;
  currentValue: number;
  investedAmount: number;
  quantity: number;
  purchaseDate: string;
  maturityDate?: string;
  returns: number;
  returnsPercent: number;
}

export interface Liability {
  id: string;
  type: 'home_loan' | 'personal_loan' | 'car_loan' | 'credit_card';
  name: string;
  totalAmount: number;
  remainingAmount: number;
  emiAmount: number;
  interestRate: number;
  startDate: string;
  endDate: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend' | 'interest';
  assetId: string;
  assetName: string;
  amount: number;
  quantity?: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface VerificationStep {
  step: number;
  title: string;
  completed: boolean;
  required: boolean;
}

export interface OTPVerification {
  phone: string;
  otp: string;
  expiresAt: string;
  verified: boolean;
}