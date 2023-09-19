'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import ChronicleOverview from '@/components/ChronicleOverview/ChronicleOverview';
// next
import { useSearchParams } from 'next/navigation';
// types
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

export default function Search() {
  const [chronicles, setChronicles] = React.useState<[] | ChronicleInterface[]>(
    []
  );
  const search = useSearchParams();

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get(
        `chronicle/search?search=${search.get('search')}`
      );
      setChronicles(data);
    })();
  }, [search]);

  return (
    <div className='mt-20 font-bold text-xl p-4 flex flex-col'>
      <span className='capitalize'>Search: {search.get('search')}</span>
      {chronicles.length > 0 ? (
        <div className='mt-10 flex flex-col gap-6'>
          {chronicles.map((chronicle: ChronicleInterface) => (
            <ChronicleOverview key={chronicle.title} chronicle={chronicle} />
          ))}
        </div>
      ) : (
        <span className='mt-24 self-center font-normal text-base'>{`No chronicles containing "${search.get(
          'search'
        )}" were found.`}</span>
      )}
    </div>
  );
}
