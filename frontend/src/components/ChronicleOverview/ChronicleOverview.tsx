import React from 'react';
// utils
import urlDecoder from '../../../utils/urlDecoder';
// components
import CategoryTag from '../CategoryTag';
import ChronicleCardDetail from '../ChronicleCard/ChronicleCardDetail';
// types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;

export default function ChronicleOverview({
  chronicle,
}: {
  chronicle: ChronicleInterface;
}) {
  return (
    <div className='flex gap-6'>
      <div>
        {/* eslint-disable-next-line */}
        <img
          src={
            imageUrlRegex.test(chronicle.image_url)
              ? urlDecoder(chronicle.image_url)
              : '/'
          }
          alt='Chronicle'
          height='250px'
          width='400px'
        />
      </div>
      <div className='flex flex-col justify-center'>
        <CategoryTag category={chronicle.category} />
        <ChronicleCardDetail
          description={chronicle.description}
          title={chronicle.title}
          visibleLetters={35}
          center={false}
        />
      </div>
    </div>
  );
}
