'use client';
import React from 'react';
import type { Product } from '../api/fakestore-schemas.ts/product';
import { Card, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-16 text-gray-500">
        <span className="text-lg font-semibold">No products found.</span>
      </div>
    );
  }
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="focus:outline-none focus:ring-2 focus:ring-pink-500 rounded-lg group"
          tabIndex={0}
          aria-label={`View details for ${product.title}`}
        >
          <Card className="flex flex-col h-full transition-transform group-hover:scale-[1.03] group-hover:shadow-lg cursor-pointer">
            <CardContent className="flex flex-col items-center p-4">
              {product.image && (
                <Image
                  src={product.image}
                  width={100}
                  height={100}
                  alt={product.title ?? 'Product image'}
                  className="h-32 object-contain mb-2"
                  style={{ maxWidth: '100%' }}
                />
              )}
              <CardTitle className="text-base text-center font-semibold mb-1 line-clamp-2">
                {product.title}
              </CardTitle>
              <CardDescription className="text-xs text-gray-500 text-center mb-2 line-clamp-1">
                {product.description}
              </CardDescription>
              <p className="text-pink-600 font-bold mb-0">${product.price?.toFixed(2)}</p>
            </CardContent>
            <CardFooter>{/* Actions or link to detail page */}</CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
