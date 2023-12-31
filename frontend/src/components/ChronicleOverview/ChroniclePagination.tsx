'use client';

import React from 'react';
// mui
import Pagination from '@mui/material/Pagination';
// components
import ChronicleOverview from './ChronicleOverview';
// types
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

const CHRONICLES_ON_PAGE = 5;

export default function ChroniclePagination({
  chronicles,
}: {
  chronicles: ChronicleInterface[];
}) {
  const [displayPage, setDisplayPage] = React.useState<number>(1);

  const pageNumber = Math.ceil(chronicles.length / CHRONICLES_ON_PAGE);
  const firstChronicleIdx =
    displayPage === 1 ? 0 : (displayPage - 1) * CHRONICLES_ON_PAGE;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setDisplayPage(value);
  };

  return (
    <div className='flex flex-col items-center w-[900px] max-1000:w-[500px] max-720:w-[500px] max-550:w-[350px] max-300:w-[200px]'>
      <div className='flex flex-col gap-7'>
        {chronicles
          .slice(firstChronicleIdx, firstChronicleIdx + 5)
          .map((chronicle) => (
            <ChronicleOverview key={chronicle.title} chronicle={chronicle} />
          ))}
      </div>
      <div className='mt-20'>
        <Pagination
          count={pageNumber}
          variant='outlined'
          color='secondary'
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

