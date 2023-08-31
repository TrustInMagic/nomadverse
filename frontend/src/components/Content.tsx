'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import ChronicleCard from './ChronicleCard/ChronicleCard';
// types
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

export default function Content() {
  const [chronicles, setChronicles] = React.useState<[] | ChronicleInterface[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get('');
      const { chronicles } = data;
      setChronicles(chronicles);

      console.log(chronicles);
    })();
  }, []);

  return (
    <div className='grid grid-rows-2 grid-cols-3 gap-6'>
      {chronicles.slice(0, 5).map((chronicle, idx) => (
        <ChronicleCard key={chronicle.title} chronicle={chronicle} idx={idx} />
      ))}
    </div>
  );
}
