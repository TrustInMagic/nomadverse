'use client';

import React from 'react';
// components
import CategoryDropdown from './CategoryDropdown';
import MiniNav from './MiniNav';
// next
import Link from 'next/link';
// -------------------------------------------------- //

export default function Header() {
  return (
    <div className='flex justify-between fixed top-0 left-0 right-0 z-10 bg-white h-8 p-3 max-w-screen-xl ml-auto mr-auto max-460:px-1'>
      <CategoryDropdown />
      <Link
        href='/'
        className='no-underline text-slate-900 text-2xl font-semibold tracking-widest	'
      >
        <span
          style={{ left: '44%' }}
          className='absolute max-720:static max-460:text-xl'
        >
          Nomadverse
        </span>
      </Link>
      <MiniNav />
    </div>
  );
}
