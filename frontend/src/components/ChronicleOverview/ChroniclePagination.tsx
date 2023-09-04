'use client';

import React from 'react';
// mui
import Pagination from '@mui/material/Pagination';
// components
import ChronicleOverview from './ChronicleOverview';
// types
import { ChronicleInterface } from '../../../../types/models';
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
    <div className='flex flex-col items-center w-[900px]'>
      <div>
        {chronicles
          .slice(firstChronicleIdx, firstChronicleIdx + 5)
          .map((chronicle) => (
            <ChronicleOverview key={chronicle.title} chronicle={chronicle} />
          ))}
      </div>
      <div className='mt-10'>
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
