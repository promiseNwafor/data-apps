import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to parse value as number or string
export const parseValue = (value: string): string | number => {
  const trimmed = value.trim();
  if (trimmed === '') return trimmed;

  const num = Number(trimmed);
  return !isNaN(num) && isFinite(num) ? num : trimmed;
};

// Helper function to get value type for styling
export const getValueType = (value: string): 'number' | 'string' => {
  const parsed = parseValue(value);
  return typeof parsed === 'number' ? 'number' : 'string';
};
