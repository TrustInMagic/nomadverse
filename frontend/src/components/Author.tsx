import React from 'react';
// mui
import Button from '@mui/material/Button';
// next
import Image from 'next/image';
// -------------------------------------------------- //

export default function Author() {
  return (
    <div className='grid grid-cols-2 gap-24 h-64 justify-items-center items-center px-8'>
      <div className='flex flex-col gap-3'>
        <span className='font-semibold text-xl'>
          Want to be an author in this blog?
        </span>
        <span>
          {/* eslint-disable-next-line */}
          Click the 'Apply' button to submit your application and showcase your
          writing skills! We look forward to your contribution.
        </span>
        <span className='text-sm text-slate-500 -mt-2'>*Under construction</span>
        <div>
          <Button variant='outlined' color='secondary'>
            Apply
          </Button>
        </div>
      </div>
      <div
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
