import React from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/category/${displayText}`);
  };

  return (
    <div
      onClick={(e) => handleClick(e)}
      className={`${
        isOnCard ? 'absolute -bottom-2 left-1/2 transform -translate-x-1/2' : ''
      } bg-white rounded shadow-xl  px-2 py-0.5 custom-shadow w-fit-content hover:scale-105 cursor-pointer`}
    >
      {displayText?.toUpperCase()}
    </div>
  );
}
