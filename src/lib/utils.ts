import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Product } from '../api/fakestore-schemas.ts/product';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function filterProductsByPrice(products: Product[], range: [number, number]): Product[] {
  return products.filter((p) => (p.price ?? 0) >= range[0] && (p.price ?? 0) <= range[1]);
}
