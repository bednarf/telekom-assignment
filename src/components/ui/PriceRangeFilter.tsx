'use client';
import React, { startTransition } from 'react';
import { Slider } from './slider';

const MIN = 0;
const MAX = 1000;

interface PriceRangeFilterProps {
  range: [number, number];
  setRange: (val: [number, number]) => void;
  filteredCount: number;
  totalCount: number;
}

export default function PriceRangeFilter({
  range,
  setRange,
  filteredCount,
  totalCount,
}: PriceRangeFilterProps) {
  return (
    <div className="flex flex-col gap-4 mb-6 items-center">
      <span className="text-sm text-gray-500 mb-2">
        Price range: <b>${range[0]}</b> - <b>${range[1]}</b>
      </span>
      <Slider
        min={MIN}
        max={MAX}
        step={1}
        value={range}
        onValueChange={(val) => {
          startTransition(() => {
            setRange(val as [number, number]);
          });
        }}
        className="w-64"
      />
      <span className="text-sm text-gray-500">
        Showing {filteredCount} of {totalCount} products
      </span>
    </div>
  );
}
