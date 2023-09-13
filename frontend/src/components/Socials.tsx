import React from 'react';
// next
import Image from 'next/image';
// -------------------------------------------------- //

export default function Socials() {
  return (
    <div className='flex flex-col gap-2 items-center'>
      <span className='text-2xl font-bold'>THE NOMADVERSE COMUNITY</span>
      <span>Follow us on socials</span>
      <div className='mt-4 flex gap-6'>
        <Image
          alt='fb'
          src='/assets/socials/facebook.svg'
          width={30}
          height={30}
          className='cursor-pointer'
        />
        <Image
          alt='insta'
          src='assets/socials/instagram.svg'
          width={30}
          height={30}
          className='cursor-pointer'
        />
        <Image
          alt='twitter'
          src='assets/socials/twitter.svg'
          width={30}
          height={30}
          className='cursor-pointer'
        />
        <Image
          alt='youtube'
          src='assets/socials/youtube.svg'
          width={30}
          height={30}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}
