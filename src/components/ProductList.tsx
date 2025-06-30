'use client';
import React, { useState, useMemo } from 'react';
import ProductGrid from './ProductGrid';
import PriceRangeFilter from './ui/PriceRangeFilter';
import { filterProductsByPrice } from '@/lib/utils';
import type { Product } from '../api/fakestore-schemas.ts/product';

const MIN = 0;
const MAX = 1000;

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [range, setRange] = useState<[number, number]>([MIN, MAX]);
  const filtered = useMemo(() => filterProductsByPrice(products, range), [products, range]);

  return (
    <div className="w-full max-w-6xl px-4 mx-auto my-10">
      <PriceRangeFilter
        range={range}
        setRange={setRange}
        filteredCount={filtered.length}
        totalCount={products.length}
      />
      <ProductGrid products={filtered} />
    </div>
  );
}
