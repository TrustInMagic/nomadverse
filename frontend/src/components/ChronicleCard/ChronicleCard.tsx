import React from 'react';
// components
import CategoryTag from '../CategoryTag';
import ChronicleCardDetail from './ChronicleCardDetail';
// next
import { useRouter } from 'next/navigation';
// utils
import urlDecoder from '../../../utils/urlDecoder';
//types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

interface ChronicleProps {
  chronicle: ChronicleInterface;
  idx: number;
}

export default function ChronicleCard({ chronicle, idx }: ChronicleProps) {
  const middlePosition = idx === 2;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/chronicle/${chronicle._id}`);
  };

  return (
    <div
      className={`relative cursor-pointer h-10 ${
        middlePosition ? 'row-start-1 row-end-3 col-start-2' : ''
      }`}
      style={middlePosition ? { height: '880px' } : {}}
      onClick={handleCardClick}
    >
      <div className='relative'>
        {/* eslint-disable-next-line */}
        <img
          className='w-full h-80 object-cover'
          alt='Chronicle Image'
          src={urlDecoder(chronicle.image_url)}
          style={middlePosition ? { height: '650px' } : {}}
        />
        <CategoryTag category={chronicle.category.name} isOnCard />
      </div>
      <ChronicleCardDetail
        title={chronicle.title}
        description={chronicle.description}
      />
    </div>
  );
}
