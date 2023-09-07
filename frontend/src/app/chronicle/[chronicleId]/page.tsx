'use client';

import React from 'react';
// http
import httpClient from '@/api/http-client';
// components
import Header from '../components/Header';
// utils
import urlDecoder from '../../../../utils/urlDecoder';
// types
import { ChronicleInterface } from '../../../../../types/models';
// -------------------------------------------------- //

export default function ChroniclePage({
  params,
}: {
  [k: string]: { chronicleId: string };
}) {
  const { chronicleId } = params;
  const [chronicle, setChronicle] = React.useState<ChronicleInterface | null>(
    null
  );

  React.useEffect(() => {
    (async () => {
      const data = await httpClient.get(`chronicle/${chronicleId}`);
      setChronicle(data);
    })();
  }, [chronicleId]);

  const decodedImgURL = chronicle ? urlDecoder(chronicle?.image_url) : '/';

  return (
    <>
      {chronicle && (
        <div className='mt-20 w-full flex flex-col items-center leading-7'>
          <Header
            category={chronicle.category}
            title={chronicle.title}
            date={chronicle.date}
            author={chronicle.author.username}
          />
          <div
            style={{
              backgroundImage: `url(${decodedImgURL})`,
              backgroundPosition: 'center center',
            }}
            className='w-full h-[700px] mt-10 bg-cover'
          />
          <div
            className='mt-12 w-2/3 pb-4'
            style={{ borderBottom: 'solid 1px #d6d3d1' }}
          >
            {chronicle.description}
          </div>
        </div>
      )}
    </>
  );
}
