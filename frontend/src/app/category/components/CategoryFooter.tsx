import React from 'react';
// components
import CategoryTag from '@/components/CategoryTag';
// custom hooks
import { useDataContext } from '@/providers/DataProvider';
// -------------------------------------------------- //

export default function CategoryFooter() {
  const { categories } = useDataContext();

  return (
    <div className='mt-14 font-semibold text-lg'>
      <span>Check out the other categories:</span>
      <div className='flex gap-5 mt-4 flex-wrap	'>
        {categories.map((category) => (
          <CategoryTag key={category.name} category={category.name} />
        ))}
      </div>
    </div>
  );
}
