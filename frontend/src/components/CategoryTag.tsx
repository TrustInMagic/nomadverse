import React from 'react';
// types
import { CategoryInterface } from '../../../types/models';
// -------------------------------------------------- //

export default function CategoryTag({
  category,
  isOnCard,
}: {
  category: CategoryInterface | string;
  isOnCard?: boolean;
}) {
  const displayText = typeof category === 'string' ? category : category?.name;

  return (
    <div
      className={`${
        isOnCard ? 'absolute -bottom-2 left-1/2 transform -translate-x-1/2' : ''
      } bg-white rounded shadow-xl  px-2 py-0.5 custom-shadow w-fit-content`}
    >
      {displayText?.toUpperCase()}
    </div>
  );
}
