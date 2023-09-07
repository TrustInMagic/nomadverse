'use client';

import React from 'react';
// components
import CustomStepper from './components/CustomStepper';
import PagePreview from './components/PagePreview';
import Separator from './components/Separator';
// -------------------------------------------------- //

export default function Create() {
  const [dividerPosition, setDividerPosition] = React.useState(500);
  const dividerRef = React.useRef(null);
  const stepperRef = React.useRef(null);
  const previewRef = React.useRef(null);

  const onMouseDown = (e) => {
    const initialPos = e.clientX;

    const onMouseMove = (moveE) => {
      const delta = moveE.clientX - initialPos;
      setDividerPosition((prev) => prev + delta);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  React.useEffect(() => {
    if (dividerRef.current && stepperRef.current && previewRef.current) {
      stepperRef.current.style.width = `${dividerPosition}px`;
      previewRef.current.style.width = `calc(100% - ${dividerPosition}px)`;
    }
  }, [dividerPosition]);

  return (
    <div className='mt-24 flex flex-col gap-2 w-full items-center h-full flex-1'>
      <span className='font-bold text-xl'>Welcome to the Writer Suite!</span>
      <span className='text-sm'>
        Add your post details in the editing panel and your changes will be
        reflected in the post preview.
      </span>
      <div className='grid grid-cols-[1fr_0.1fr_1fr] mt-10 justify-items-center flex-1'>
        <div ref={stepperRef}>
          <CustomStepper step={0} />
        </div>
        <div ref={dividerRef} onMouseDown={onMouseDown}>
          <Separator />
        </div>
        <div ref={previewRef}>
          <PagePreview />
        </div>
      </div>
    </div>
  );
}
