import React from 'react';
// -------------------------------------------------- //

interface ChronicleCardDetail {
  title: string;
  description: string;
  visibleLetters?: number;
  center?: boolean;
}

export default function ChronicleCardDetail({
  title,
  description,
  visibleLetters = 25,
  center = true,
}: ChronicleCardDetail) {
  const words = description.split(' ');

  const trimmedDescription =
    words.length > visibleLetters
      ? `${words.slice(0, visibleLetters).join(' ')}...`
      : description;

  return (
    <div
      className={`mt-5 px-2 flex flex-col ${
        center ? 'items-center' : 'items-start'
      }`}
    >
      <div className={`mb-2 text-xl ${center ? 'text-center' : ''} font-bold`}>
        {title}
      </div>
      <div className={`text-xs ${center ? 'text-center' : ''}`}>
        {trimmedDescription}
      </div>
    </div>
  );
}
