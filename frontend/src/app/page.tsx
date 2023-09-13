'use client';

import React from 'react';
// components
import Content from '@/components/Content';
import Author from '@/components/Author';
import ChroniclePagination from '@/components/ChronicleOverview/ChroniclePagination';
import Socials from '@/components/Socials';
import ContentSkeleton from '@/components/ContentSkeleton';
import PaginationSkeleton from '@/components/PaginationSkeleton';
// custom hooks
import { useDataContext } from '@/providers/DataProvider';
// -------------------------------------------------- //

export default function Home() {
  const { chronicles, isLoading } = useDataContext();

  return (
    <div className='mt-14 p-3'>
      <div>
        {!isLoading ? <Content chronicles={chronicles} /> : <ContentSkeleton />}
      </div>
      <div
        className='mt-14'
        style={{
          borderBottom: 'solid 1px #d6d3d1',
          borderTop: 'solid 1px #d6d3d1',
        }}
      >
        <Author />
      </div>
      <div className='mt-14 flex flex-col items-center'>
        {!isLoading ? (
          <ChroniclePagination chronicles={chronicles} />
        ) : (
          <PaginationSkeleton />
        )}
      </div>
      <div className='mt-28 flex flex-col items-center'>
        <Socials />
      </div>
    </div>
  );
}
