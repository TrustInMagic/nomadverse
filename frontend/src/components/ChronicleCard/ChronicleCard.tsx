import React from 'react';
// components
import CategoryTag from './CategoryTag';
import ChronicleCardDetail from './ChronicleCardDetail';
//types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

interface ChronicleProps {
  chronicle: ChronicleInterface;
  idx: number;
}

const imageUrlRegex = /\.(jpeg|jpg|gif|png)$/i;

const urlDecoder = (url: string) => {
  const decoded = url.replace(/&#x2F;/g, '/');
  return decoded;
};

export default function ChronicleCard({ chronicle, idx }: ChronicleProps) {
  console.log(chronicle);
  return (
    <div className='relative cursor-pointer h-100'>
      <div className='relative'>
        {/* eslint-disable-next-line */}
        <img
          className='w-full max-h-80 object-cover'
          alt='Chronicle Image'
          src={
            imageUrlRegex.test(chronicle.image_url)
              ? urlDecoder(chronicle.image_url)
              : '/'
          }
        />
        <CategoryTag category={chronicle.category.name} />
      </div>
      <ChronicleCardDetail
        title={chronicle.title}
        description={chronicle.description}
      />
    </div>
  );
}
