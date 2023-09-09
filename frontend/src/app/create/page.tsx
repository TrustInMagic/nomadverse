'use client';

import React from 'react';
// components
import CustomStepper from './components/CustomStepper';
import PagePreview from './components/ChroniclePreview';
import Separator from './components/Separator';
import ChronicleForm from './components/ChronicleForm';
// -------------------------------------------------- //

const MIN_LEFT_WIDTH = 300;
const MIN_RIGHT_WIDTH = 300;

export default function Create() {
  // resizing
  const [leftWidth, setLeftWidth] = React.useState<null | number>(null);
  const [rightWidth, setRightWidth] = React.useState<null | number>(null);
  const [separatorXPosition, setSeparatorXPosition] = React.useState<
    null | number
  >(null);
  const [dragging, setDragging] = React.useState<boolean>(false);
  // stepper
  const [step, setStep] = React.useState(0);
  // chronicle forms

  // refs
  const dividerRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent): void => {
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent): void => {
    if (dragging && leftWidth && rightWidth && separatorXPosition) {
      const newLeftWidth = leftWidth + e.clientX - separatorXPosition;
      const newRightWidth = rightWidth - e.clientX + separatorXPosition;
      setRightWidth(newRightWidth);
      setLeftWidth(newLeftWidth);

      if (newLeftWidth <= MIN_LEFT_WIDTH) {
        setLeftWidth(MIN_LEFT_WIDTH);
      }

      if (newRightWidth <= MIN_RIGHT_WIDTH) {
        setRightWidth(MIN_RIGHT_WIDTH);
      }

      setSeparatorXPosition(e.clientX);
    }
  };

  const onMouseUp = (): void => {
    setDragging(false);
  };

  const navigateToStep = (step: number): void => {
    setStep(step);
  };

  React.useEffect(() => {
    if (dividerRef.current && leftRef.current && rightRef.current) {
      if (!leftWidth) {
        setLeftWidth(leftRef.current?.clientWidth);
        return;
      }
      leftRef.current.style.width = `${leftWidth}px`;

      if (!rightWidth) {
        setRightWidth(rightRef.current?.clientWidth);
        return;
      }
      rightRef.current.style.width = `${rightWidth}px`;
    }
  }, [leftWidth, rightWidth]);

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  });

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });

  return (
    <div className='mt-24 flex flex-col gap-2 w-full items-center h-full flex-1'>
      <span className='font-bold text-xl'>Welcome to the Writer Suite!</span>
      <span className='text-sm'>
        Add your chronicle details in the editing panel and your changes will be
        reflected in the preview.
      </span>
      <div className='flex-1 flex w-3/4'>
        <div ref={leftRef} className='p-5'>
          <CustomStepper step={step} navigate={navigateToStep} />
          <ChronicleForm step={step} setStep={setStep} />
        </div>
        <div ref={dividerRef} onMouseDown={onMouseDown}>
          <Separator />
        </div>
        <div ref={rightRef} className='flex-1 p-5'>
          <PagePreview />
        </div>
      </div>
    </div>
  );
}
