import React from 'react';
// components
import CategoryTag from '@/components/CategoryTag';
// custom hooks
import { useAuthContext } from '@/providers/AuthProvider';
// markdown
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// utils
import formatDate from '../../../../../utils/dateFormat';
// -------------------------------------------------- //

interface PagePreviewProps {
  title: string;
  body: string;
  category: string;
  displayImg: string;
}

export default function PagePreview({
  title,
  body,
  category,
  displayImg,
}: PagePreviewProps): JSX.Element {
  const formattedDate = formatDate(new Date());
  const { user } = useAuthContext();

  return (
    <div className='flex flex-col items-center'>
      <div>
        <CategoryTag category={category} />
      </div>
      <div className='mt-4 text-lg font-bold'>{title}</div>
      <div className='flex gap-2 mt-2'>
        <span>{formattedDate}</span>
        <span>|</span>
        <span>{user?.username}</span>
      </div>
      <div className='mt-4 '>
        {/* eslint-disable-next-line */}
        <img src={displayImg} alt='Cover Image' className='max-w-full' />
      </div>
      <div className='mt-6'>
        {/* eslint-disable-next-line */}
        <ReactMarkdown children={body} remarkPlugins={[remarkGfm]} />
      </div>
    </div>
  );
}
