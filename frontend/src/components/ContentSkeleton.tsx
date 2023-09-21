import React from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';
// -------------------------------------------------- //

export default function ContentSkeleton() {
  const screenWidth = window.innerWidth;
  return (
    <div className='grid grid-rows-2 grid-cols-3 gap-6 max-1000:grid-cols-2 max-1000:grid-rows-3 max-720:flex max-720:flex-col'>
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
      <div
        className={`${
          screenWidth > 1000 ? 'row-start-1 row-end-3 col-start-2' : ''
        }`}
      >
        <Skeleton
          variant='rectangular'
          width={'auto'}
          height={screenWidth > 1000 ? 550 : 300}
        />
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
