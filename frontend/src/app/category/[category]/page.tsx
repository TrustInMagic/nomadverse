'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import ChronicleOverview from '@/components/ChronicleOverview/ChronicleOverview';
import CategoryFooter from '../components/CategoryFooter';
// types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

interface CategoryProps {
  params: {
    category: string;
  };
}

export default function Category({ params }: CategoryProps) {
  const { category } = params;
  const [chroniclesInCategory, setChroniclesInCategory] = React.useState<
    null | ChronicleInterface[]
  >(null);

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get(`category/${category}`);
      setChroniclesInCategory(data);
    })();
  }, [category]);

  return (
    <div className='mt-20 font-bold text-xl p-4 flex flex-col'>
      <span className='capitalize'>Category: {category}</span>
      {chroniclesInCategory && (
        <div className='mt-10 flex flex-col gap-6'>
          {chroniclesInCategory.map((chronicle: ChronicleInterface) => (
            <ChronicleOverview key={chronicle.title} chronicle={chronicle} />
          ))}
        </div>
      )}
      <CategoryFooter />
    </div>
  );
}
