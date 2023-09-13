import React from 'react';
// mui
import Skeleton from '@mui/material/Skeleton';
// -------------------------------------------------- //

const CustomSkeleton = () => (
  <div className='flex gap-6 items-center'>
    <Skeleton variant='rectangular' width={400} height={250} />
    <div className='flex flex-col'>
      <Skeleton
        variant='text'
        sx={{ fontSize: '1rem', width: '300px', height: '30px' }}
      />
      <Skeleton
        variant='text'
        sx={{ fontSize: '1rem', width: '300px', height: '80px' }}
      />
    </div>
  </div>
);

export default function PaginationSkeleton() {
  return (
    <div className='flex flex-col items-center w-[900px] gap-7'>
      {Array.from({ length: 5 }, (v, i) => i).map((value) => (
        <CustomSkeleton key={value} />
      ))}
    </div>
  );
}
