import React from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';
// -------------------------------------------------- //

export default function ContentSkeleton() {
  return (
    <div className='grid grid-rows-2 grid-cols-3 gap-6'>
      <div>
        <Skeleton variant='rectangular' width={'auto'} height={300} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
      </div>
      <div>
        <Skeleton variant='rectangular' width={'auto'} height={300} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
      </div>
      <div className='row-start-1 row-end-3 col-start-2'>
        <Skeleton variant='rectangular' width={'auto'} height={550} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
      </div>
      <div>
        <Skeleton variant='rectangular' width={'auto'} height={300} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
      </div>
      <div>
        <Skeleton variant='rectangular' width={'auto'} height={300} />
        <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
        <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
      </div>
    </div>
  );
}
