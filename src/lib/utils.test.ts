import { describe, it, expect } from 'vitest';
import { filterProductsByPrice } from './utils';
import type { Product } from '../api/fakestore-schemas.ts/product';

const products: Product[] = [
  { id: 1, title: 'Cheap', price: 10, description: 'Cheap product', image: '', category: '' },
  { id: 2, title: 'Mid', price: 100, description: 'Mid product', image: '', category: '' },
  {
    id: 3,
    title: 'Expensive',
    price: 999,
    description: 'Expensive product',
    image: '',
    category: '',
  },
  { id: 4, title: 'No Price', price: undefined, description: 'No price', image: '', category: '' },
];

describe('filterProductsByPrice', () => {
  it('returns all products in full range', () => {
    const result = filterProductsByPrice(products, [0, 1000]);
    expect(result.map((p) => p.title)).toEqual(['Cheap', 'Mid', 'Expensive', 'No Price']);
  });

  it('returns only products within a specific range', () => {
    const result = filterProductsByPrice(products, [50, 200]);
    expect(result.map((p) => p.title)).toEqual(['Mid']);
  });

  it('returns empty array if no products in range', () => {
    const result = filterProductsByPrice(products, [2000, 3000]);
    expect(result).toEqual([]);
  });

  it('treats undefined price as 0', () => {
    const result = filterProductsByPrice(products, [0, 0]);
    expect(result.map((p) => p.title)).toEqual(['No Price']);
  });
});
