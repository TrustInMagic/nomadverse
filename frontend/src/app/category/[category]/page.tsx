'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// mui
import CircularProgress from '@mui/material/CircularProgress';
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
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const data = await httpClient.get(`category/${category}`);
        setChroniclesInCategory(data);
        setLoading(false);
      } catch (err) {
        setChroniclesInCategory([]);
        setLoading(false);
      }
    })();
  }, [category]);

  return (
    <div className='mt-20 font-bold text-xl p-4 flex flex-col'>
      <span className='capitalize'>Category: {category}</span>
      {loading ? (
        <CircularProgress color='secondary' className='my-14 ml-14' />
      ) : (
        <div>
          {chroniclesInCategory && (
            <div className='mt-10 flex flex-col gap-6'>
              {chroniclesInCategory.map((chronicle: ChronicleInterface) => (
                <ChronicleOverview
                  key={chronicle.title}
                  chronicle={chronicle}
                />
              ))}
            </div>
          )}
          {chroniclesInCategory && chroniclesInCategory.length === 0 && (
            <span className='my-10 font-normal text-base'>
              No Chronicles yet in this category.
            </span>
          )}
        </div>
      )}
      <CategoryFooter />
    </div>
  );
}
