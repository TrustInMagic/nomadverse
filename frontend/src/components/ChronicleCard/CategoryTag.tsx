import React from 'react';
// -------------------------------------------------- //

export default function CategoryTag({ category }: { category: string }) {
  return (
    <div className='absolute -bottom-2 bg-white rounded shadow-xl left-1/2 transform -translate-x-1/2 px-2 py-0.5 custom-shadow '>
      {category.toUpperCase()}
    </div>
  );
}
