'use client';

import React from 'react';
// components
import CustomStepper from './components/CustomStepper';
import PagePreview from './components/ChroniclePreview';
import Separator from './components/Separator';
import ChronicleForm from './components/ChronicleForm';
// types
import { SelectChangeEvent } from '@mui/material';
import { Error } from './components/ChronicleForm';
// custom hooks
import { useAuthContext } from '@/providers/AuthProvider';
import { useDataContext } from '@/providers/DataProvider';
// http
import httpClient from '@/api/http-client';
// next
import { useRouter } from 'next/navigation';
// -------------------------------------------------- //

const MIN_LEFT_WIDTH = 300;
const MIN_RIGHT_WIDTH = 300;

type customError = {
  title: string;
  message: string;
};

export default function ChronicleCreate() {
  // resizing

  const [leftWidth, setLeftWidth] = React.useState<null | number>(null);
  const [rightWidth, setRightWidth] = React.useState<null | number>(null);
  const [separatorXPosition, setSeparatorXPosition] = React.useState<
    null | number
  >(null);
  const [dragging, setDragging] = React.useState<boolean>(false);
  // stepper
  const [step, setStep] = React.useState(0);
  // refs
  const dividerRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLDivElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent): void => {
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };

  const onMouseMove = (e: MouseEvent): void => {
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

  // input data form handlers & state

  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [displayImg, setDisplayImg] = React.useState('');
  const [errors, setErrors] = React.useState<Error[] | []>([]);
  const { user } = useAuthContext();
  const { fetchData } = useDataContext();

  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value as string);
    setErrors([]);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBody(event.target.value as string);
    setErrors([]);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    setErrors([]);
  };

  const handleDisplayImgChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayImg(event.target.value as string);
    setErrors([]);
  };

  const setFilteredErrors = (newErr: customError): void => {
    setErrors((prev) => {
      const filteredErrors = prev.filter(
        (err) => err.message !== newErr.message
      );
      return [...filteredErrors, newErr];
    });
  };

  const validateFormFields = () => {
    if (title.trim().length === 0) {
      const newErr = { title: 'title', message: 'Tittle cannot be empty.' };
      setFilteredErrors(newErr);
    }
    if (body.trim().length === 0) {
      const newErr = { title: 'body', message: 'Body cannot be empty.' };
      setFilteredErrors(newErr);
    }
    if (category.length === 0) {
      const newErr = {
        title: 'category',
        message: 'Category cannot be empty.',
      };
      setFilteredErrors(newErr);
    }
    if (displayImg.length === 0) {
      const newErr = {
        title: 'image',
        message: 'Display Image cannot be empty.',
      };
      setFilteredErrors(newErr);
    }
  };

  const handleSubmitChronicle = async () => {
    validateFormFields();

    if ((user && user.role !== 'admin' && user.role !== 'author') || !user) {
      return;
    } else {
      const newChronicle = {
        title: title,
        description: body,
        image_url: displayImg,
        category: category,
      };

      if (errors.length === 0) {
        try {
          const response = await httpClient.post(
            'chronicle/create',
            JSON.stringify(newChronicle),
            { 'Content-Type': 'application/json' }
          );

          if (response[0].title) {
            router.push(`/chronicle/${response[0]._id}`);
            fetchData();
          }
        } catch (err) {
          console.error(err);
        }
      }
      return;
    }
  };

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
          <ChronicleForm
            step={step}
            setStep={setStep}
            handleTitleChange={handleTitleChange}
            handleBodyChange={handleBodyChange}
            handleCategoryChange={handleCategoryChange}
            handleDisplayImgChange={handleDisplayImgChange}
            title={title}
            body={body}
            category={category}
            displayImg={displayImg}
            handleSubmitChronicle={handleSubmitChronicle}
            errors={errors}
          />
        </div>
        <div ref={dividerRef} onMouseDown={onMouseDown}>
          <Separator />
        </div>
        <div ref={rightRef} className='flex-1 p-5'>
          <PagePreview
            title={title}
            body={body}
            category={category}
            displayImg={displayImg}
          />
        </div>
      </div>
    </div>
  );
}
