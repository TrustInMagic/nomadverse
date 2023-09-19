import React from 'react';
// utils
import {urlDecoder} from '../../../utils/decoders';
// components
import CategoryTag from '../CategoryTag';
import ChronicleCardDetail from '../ChronicleCard/ChronicleCardDetail';
// next
import { useRouter } from 'next/navigation';
// types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

export default function ChronicleOverview({
  chronicle,
}: {
  chronicle: ChronicleInterface;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chronicle/${chronicle._id}`);
  };
  return (
    <div className='flex gap-6 cursor-pointer' onClick={handleClick}>
      <div>
        {/* eslint-disable-next-line */}
        <img
          src={urlDecoder(chronicle.image_url)}
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
