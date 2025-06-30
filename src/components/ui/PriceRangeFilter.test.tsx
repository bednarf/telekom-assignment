import React from 'react';
import { render, screen } from '@testing-library/react';
import PriceRangeFilter from './PriceRangeFilter';
import { describe, it, expect } from 'vitest';

describe('PriceRangeFilter', () => {
  it('renders the price range and counts', () => {
    render(
      <PriceRangeFilter range={[10, 100]} setRange={() => {}} filteredCount={3} totalCount={10} />,
    );
    // Check for the numbers
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText(/Showing\s*3\s*of\s*10\s*products/)).toBeInTheDocument();
  });
});
