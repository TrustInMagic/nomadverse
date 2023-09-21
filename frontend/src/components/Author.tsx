import React from 'react';
// mui
import Button from '@mui/material/Button';
// next
import Image from 'next/image';
// -------------------------------------------------- //

export default function Author() {
  return (
    <div className='grid grid-cols-2 gap-24 h-64 justify-items-center items-center px-8 max-720:h-42 max-720:py-0 max-550:flex max-550:flex-row max-550:justify-center max-550:h-auto max-550:py-5'>
      <div className='flex flex-col gap-3'>
        <span className='font-semibold text-xl max-720:text-base'>
          Want to be an author in this blog?
        </span>
        <span className='max-720:hidden'>
          {/* eslint-disable-next-line */}
          Click the 'Apply' button to submit your application and showcase your
          writing skills! We look forward to your contribution.
        </span>
        <span className='text-sm text-slate-500 -mt-2'>
          *Under construction
        </span>
        <div>
          <Button variant='outlined' color='secondary'>
            Apply
          </Button>
        </div>
      </div>
      <div
        className='max-550:hidden'
        style={{ maxWidth: '300px', maxHeight: '200px', justifySelf: 'end' }}
      >
        <Image
          src='/assets/author.png'
          alt='Author image'
          layout='responsive'
          width={200}
          height={200}
          style={{ transform: 'scaleX(-1)' }}
        />
      </div>
    </div>
  );
}
