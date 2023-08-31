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
  const middlePosition = idx === 2;
  return (
    <div
      className={`relative cursor-pointer h-100 ${
        middlePosition ? 'row-start-1 row-end-3 col-start-2' : ''
      }`}
      style={middlePosition ? { height: '850px' } : {}}
    >
      <div className='relative'>
        {/* eslint-disable-next-line */}
        <img
          className='w-full h-80 object-cover'
          alt='Chronicle Image'
          src={
            imageUrlRegex.test(chronicle.image_url)
              ? urlDecoder(chronicle.image_url)
              : '/'
          }
          style={middlePosition ? { height: '650px' } : {}}
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
