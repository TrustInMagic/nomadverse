import React from 'react';
// next
import Link from 'next/link';
// -------------------------------------------------- //

export default function Footer() {
  return (
    <div
      className='bg-black text-slate-100  h-32 flex justify-center p-10'
      style={{ width: 'calc(100% - 80px)' }}
    >
      <div className='grid grid-cols-2 gap-24 max-w-screen-xl max-460:gap-10'>
        <div className='flex flex-col gap-5'>
          <span className='text-xl max-850:text-base'>
            Explore the world, explore yourself
          </span>
          <span className='text-sm max-1000:text-xs max-550:hidden'>
            At Nomadverse, we are driven by a boundless curiosity to traverse
            the world
            <span className='max-720:hidden'>
              , immerse ourselves in the beauty of nature, achieve physical and
              mental wellness, and embrace the serenity of mindfulness. Our
              journey is enriched by a community of fellow explorers and
              enthusiasts – just like you!
            </span>
          </span>
        </div>
        <div className='grid grid-cols-2 text-sm max-720:text-xs gap-5'>
          <div className='flex flex-col gap-2'>
            <span className='mb-2'>
              ABOUT <span className='max-720:hidden'>NOMADVERSE</span>
            </span>
            <Link href='/' className='no-underline text-slate-100'>
              About Us
            </Link>
            <Link href='/' className='no-underline text-slate-100'>
              Our Vision
            </Link>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='mb-2'>
              CONTACT <span className='max-550:hidden'>US</span>
            </span>
            <Link href='/' className='no-underline text-slate-100'>
              Advertise
            </Link>
            <Link href='/' className='no-underline text-slate-100'>
              {/* eslint-disable-next-line */}
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
