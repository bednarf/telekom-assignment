import { render, screen } from '@testing-library/react';
import ProductGrid from './ProductGrid';
import type { Product } from '../api/fakestore-schemas.ts/product';
import React from 'react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

const products: Product[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest.',
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    category: "men's clothing",
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg',
    category: "men's clothing",
  },
  {
    id: 3,
    title: "John Hardy Women's Legends Naga Gold & Silver Bracelet",
    price: 695.0,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    category: 'jewelery',
  },
  {
    id: 4,
    title: 'White Gold Plated Princess',
    price: 9.99,
    description: 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.',
    image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    category: 'jewelery',
  },
  {
    id: 5,
    title: 'No Price Product',
    price: undefined,
    description: 'This product has no price set.',
    image: 'https://fakestoreapi.com/img/placeholder.jpg',
    category: 'misc',
  },
];

describe('ProductGrid filtering', () => {
  it('shows all products by default', () => {
    render(<ProductGrid products={products} />);
    expect(
      screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'),
    ).toBeInTheDocument();
    expect(screen.getByText('Mens Casual Premium Slim Fit T-Shirts')).toBeInTheDocument();
    expect(
      screen.getByText("John Hardy Women's Legends Naga Gold & Silver Bracelet"),
    ).toBeInTheDocument();
    expect(screen.getByText('White Gold Plated Princess')).toBeInTheDocument();
    expect(screen.getByText('No Price Product')).toBeInTheDocument();
  });

  it('handles edge cases: no products in range', () => {
    render(<ProductGrid products={[]} />);
    expect(screen.getByText('No products found.')).toBeInTheDocument();
    // Ensure no product titles are present
    expect(
      screen.queryByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Mens Casual Premium Slim Fit T-Shirts')).not.toBeInTheDocument();
    expect(
      screen.queryByText("John Hardy Women's Legends Naga Gold & Silver Bracelet"),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('White Gold Plated Princess')).not.toBeInTheDocument();
    expect(screen.queryByText('No Price Product')).not.toBeInTheDocument();
  });
});
