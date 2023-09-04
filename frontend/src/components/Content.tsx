import React from 'react';
// components
import ChronicleCard from './ChronicleCard/ChronicleCard';
// utils
import shuffle from '../../utils/shuffleArray';
// types
import { ChronicleInterface } from '../../../types/models';
// -------------------------------------------------- //

export default function Content({
  chronicles,
}: {
  chronicles: ChronicleInterface[];
}) {
  const shuffledChronicles = shuffle(chronicles);

  return (
    <div className='grid grid-rows-2 grid-cols-3 gap-6'>
      {shuffledChronicles.slice(0, 5).map((chronicle, idx) => (
        <ChronicleCard key={chronicle.title} chronicle={chronicle} idx={idx} />
      ))}
    </div>
  );
}
