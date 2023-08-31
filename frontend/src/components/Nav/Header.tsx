import React from 'react';
// components
import CategoryDropdown from './CategoryDropdown';
import MiniNav from './MiniNav';
// next
import Link from 'next/link';
// -------------------------------------------------- //

export default function Header() {
  return (
    <div className='flex justify-between'>
      <CategoryDropdown />
      <Link href='/' className='no-underline text-slate-900 text-2xl'>
        <span>Nomadverse</span>
      </Link>
      <MiniNav />
    </div>
  );
}
