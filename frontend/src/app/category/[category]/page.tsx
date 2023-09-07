'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// -------------------------------------------------- //

export default function Category({ params }) {
  const { name } = params;
  const [chroniclesInCategory, setChroniclesInCategory] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get(`category/${name}`);
      setChroniclesInCategory(data);
    })();
  }, [name]);

  return <div>Category</div>;
}
