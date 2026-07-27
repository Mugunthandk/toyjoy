import { Currency } from '../types';

const RATES_FROM_INR: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0094,
  AED: 0.044,
  SGD: 0.016
};

const SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
  GBP: '£',
  AED: 'AED ',
  SGD: 'S$'
};

export function formatPrice(priceINR: number, currency: Currency): string {
  const rate = RATES_FROM_INR[currency] || 1;
  const symbol = SYMBOLS[currency] || '₹';
  const converted = priceINR * rate;

  if (currency === 'INR') {
    return `${symbol}${Math.round(converted).toLocaleString('en-IN')}`;
  }

  return `${symbol}${converted.toFixed(2)}`;
}
