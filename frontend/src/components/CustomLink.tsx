import React from 'react';
// next
import Link from 'next/link';
// -------------------------------------------------- //

interface CustomLink {
  href: string;
  text: string;
  color: string;
}

export default function CustomLink({ href, text, color }: CustomLink) {
  return (
    <div className='relative inline-block relative-div'>
      <Link
        href={href}
        className={`${
          color === 'purple' ? 'text-purple-700' : ''
        } no-underline`}
      >
        {text}
      </Link>
      <div
        className={`custom-link ${color === 'purple' ? 'bg-purple-700' : ''}`}
      ></div>
    </div>
  );
}
