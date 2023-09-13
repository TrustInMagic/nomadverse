import React from 'react';
// mui
import Button from '@mui/material/Button';
// -------------------------------------------------- //

interface DashboardFieldProps {
  field: string;
  fieldValue: string;
  buttonText: string;
  role?: boolean;
}

export default function DashboardField({
  field,
  fieldValue,
  buttonText,
  role,
}: DashboardFieldProps) {
  return (
    <div className='flex flex-col gap-2'>
      <span className='font-medium'>{field}</span>
      <span className='mb-3'>{fieldValue}</span>
      {!role ? (
        <Button variant='outlined' color='secondary' size='small'>
          {buttonText.toUpperCase()}
        </Button>
      ) : fieldValue === 'admin' || fieldValue === 'writer' ? (
        ''
      ) : (
        <Button variant='outlined' color='secondary' size='small'>
          {buttonText.toUpperCase()}
        </Button>
      )}
    </div>
  );
}
