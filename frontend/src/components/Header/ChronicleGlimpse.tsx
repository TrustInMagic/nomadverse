import React from 'react';
// utils
import urlDecoder from '../../../utils/urlDecoder';
import capitalizeWord from '../../../utils/capitalizeWord';
// next
import { useRouter } from 'next/navigation';
// types
import { ChronicleInterface } from '../../../../types/models';
// -------------------------------------------------- //

export default function ChronicleGlimpse({
  chronicle,
  closeDrawer,
}: {
  chronicle: ChronicleInterface;
  closeDrawer: (object: { [k: string]: boolean }) => void;
}) {
  const decodedURL = urlDecoder(chronicle.image_url);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chronicle/${chronicle._id}`);
    closeDrawer({ top: false });
  };

  return (
    <div
      className='cursor-pointer'
      onClick={handleClick}
      onKeyDown={() => closeDrawer({ top: false })}
    >
      <div className='flex gap-3 items-center'>
        {/* eslint-disable-next-line */}
        <img
          src={decodedURL}
          alt='Chronicle Glimpse'
          height='100px'
          width='150px'
        />
        <div className='flex flex-col gap-2'>
          <span className='italic'>
            {capitalizeWord(chronicle.category.name)}
          </span>
          <span className='font-bold'>{chronicle.title}</span>
        </div>
      </div>
    </div>
  );
}
