import React from 'react';
// next
import Link from 'next/link';
// -------------------------------------------------- //

export default function Footer() {
  return (
    <div className='mt-28 bg-black text-slate-100  h-32 p-10 -mx-3 -mb-3 flex justify-center'>
      <div className='grid grid-cols-2 gap-24 max-w-screen-xl'>
        <div className='flex flex-col gap-5'>
          <span className='text-2xl'>Explore Alternatives</span>
          <span className='text-sm'>
            At Nomadverse, we are driven by a boundless curiosity to traverse
            the world, immerse ourselves in the beauty of nature, achieve
            physical and mental wellness, and embrace the serenity of
            mindfulness. Our journey is enriched by a community of fellow
            explorers and enthusiasts – just like you!
          </span>
        </div>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col gap-2'>
            <span className='mb-2'>ABOUT NOMADVERSE</span>
            <Link href='/' className='no-underline text-slate-100'>
              About Us
            </Link>
            <Link href='/' className='no-underline text-slate-100'>
              Our Vision
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='mb-2'>CONTACT US</span>
            <Link href='/' className='no-underline text-slate-100'>
              Advertise
            </Link>
            {/* eslint-disable-next-line */}
            <Link href='/' className='no-underline text-slate-100'>
              Editor's Column
            </Link>
            <Link href='/' className='no-underline text-slate-100'>
              Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
