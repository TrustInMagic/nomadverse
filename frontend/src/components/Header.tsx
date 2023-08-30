import React from 'react';
// components
import CategoryDropdown from './CategoryDropdown';
// -------------------------------------------------- //

export default function Header() {
  return (
    <div className='flex justify-between'>
      <CategoryDropdown />
      <span>Nomadverse</span>
    </div>
  );
}
