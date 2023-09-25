import React from 'react';
// components
import CategoryTag from '@/components/CategoryTag';
// utils
import formatDate from '../../../../utils/dateFormat';
// -------------------------------------------------- //

interface Header {
  category: string;
  title: string;
  date: Date;
  author: string;
}

export default function Header({ category, title, date, author }: Header) {
  const formattedDate = formatDate(date);

  return (
    <div className='flex flex-col gap-4 items-center text-center'>
      <CategoryTag category={category} />
      <span className='text-4xl font-medium'>{title}</span>
      <div className='flex gap-2'>
        <span>{formattedDate}</span>
        <span>|</span>
        <span>{author}</span>
      </div>
    </div>
  );
}
