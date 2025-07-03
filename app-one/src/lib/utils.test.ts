import { describe, it, expect } from 'vitest';
import { parseValue, getValueType } from './utils';

describe('parseValue', () => {
  it('should parse valid integers', () => {
    expect(parseValue('123')).toBe(123);
    expect(parseValue('-456')).toBe(-456);
    expect(parseValue('0')).toBe(0);
  });

  it('should parse valid floats', () => {
    expect(parseValue('123.45')).toBe(123.45);
    expect(parseValue('-67.89')).toBe(-67.89);
    expect(parseValue('0.123')).toBe(0.123);
  });

  it('should parse scientific notation', () => {
    expect(parseValue('1e5')).toBe(100000);
    expect(parseValue('1.5e2')).toBe(150);
    expect(parseValue('2e-3')).toBe(0.002);
  });

  it('should trim whitespace and parse numbers', () => {
    expect(parseValue('  123  ')).toBe(123);
    expect(parseValue('\t456\n')).toBe(456);
  });

  it('should return strings for non-numeric values', () => {
    expect(parseValue('hello')).toBe('hello');
    expect(parseValue('123abc')).toBe('123abc');
    expect(parseValue('abc123')).toBe('abc123');
  });

  it('should return empty string for empty input', () => {
    expect(parseValue('')).toBe('');
    expect(parseValue('   ')).toBe(''); // Whitespace gets trimmed to empty string
  });

  it('should handle edge cases', () => {
    expect(parseValue('Infinity')).toBe('Infinity'); // Infinity is not finite
    expect(parseValue('NaN')).toBe('NaN');
    expect(parseValue('null')).toBe('null');
    expect(parseValue('undefined')).toBe('undefined');
  });
});

describe('getValueType', () => {
  it('should return "number" for numeric strings', () => {
    expect(getValueType('123')).toBe('number');
    expect(getValueType('123.45')).toBe('number');
    expect(getValueType('-67')).toBe('number');
    expect(getValueType('1e5')).toBe('number');
  });

  it('should return "string" for non-numeric strings', () => {
    expect(getValueType('hello')).toBe('string');
    expect(getValueType('123abc')).toBe('string');
    expect(getValueType('')).toBe('string');
    expect(getValueType('Infinity')).toBe('string');
  });
});