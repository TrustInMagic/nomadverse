import React from 'react';
// -------------------------------------------------- //

interface ChronicleCardDetail {
  title: string;
  description: string;
}

export default function ChronicleCardDetail({
  title,
  description,
}: ChronicleCardDetail) {
  const words = description.split(' ');

  const trimmedDescription =
    words.length > 15 ? `${words.slice(0, 25).join(' ')}...` : description;

  return (
    <div className='mt-5 px-2 flex flex-col items-center'>
      <div className='mb-2 text-xl text-center font-bold'>{title}</div>
      <div className='text-xs text-center'>{trimmedDescription}</div>
    </div>
  );
}
