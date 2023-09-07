import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import CategoryTag from '@/components/CategoryTag';
// types
import { CategoryInterface } from '../../../../../types/models';
// -------------------------------------------------- //

export default function CategoryFooter() {
  const [categories, setCategories] = React.useState<[] | CategoryInterface[]>(
    []
  );

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get('');
      const { categories } = data;
      setCategories(categories);
    })();
  }, []);

  return (
    <div className='mt-14 font-semibold text-lg'>
      <span>Check out the other categories:</span>
      <div className='flex gap-5 mt-4'>
        {categories.map((category) => (
          <CategoryTag key={category.name} category={category.name} />
        ))}
      </div>
    </div>
  );
}
