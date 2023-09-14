'use client';

import React from 'react';
// mui
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// custom hooks
import { useAuthContext } from '@/providers/AuthProvider';
// http
import httpClient from '@/api/http-client';
// custom hooks
import { useDataContext } from '@/providers/DataProvider';
// -------------------------------------------------- //

export default function CategoryCreate() {
  const [category, setCategory] = React.useState('');
  const [createSuccess, setCreateSuccess] = React.useState(false);
  const { user } = useAuthContext();
  const { fetchData } = useDataContext();

  const handleClick = async () => {
    if (!user || (user && user.role !== 'admin' && user.role !== 'author')) {
      return;
    } else {
      const newCategory = {
        name: category,
      };

      try {
        const response = await httpClient.post(
          'category/create',
          JSON.stringify(newCategory),
          { 'Content-Type': 'application/json' }
        );

        if (response === 'OK') {
          setCategory('');
          setCreateSuccess(true);
          setTimeout(() => setCreateSuccess(false), 3000);
          fetchData();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className='mt-24 flex flex-col gap-2 w-full items-center h-full flex-1'>
      <span className='font-bold text-xl'>Create new Category</span>
      <span className='text-sm'>
        Create a new Category for your Chronicles.
      </span>
      <form className='flex flex-col mt-10 gap-2'>
        <TextField
          size='small'
          variant='outlined'
          color='secondary'
          label='Category name'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          helperText='NOTE: You must be a verified author to submit a new category '
        />
        <Button
          variant='contained'
          color='secondary'
          onClick={handleClick}
          disabled={
            !category ||
            !user ||
            (user && user.role !== 'admin' && user.role !== 'author')
          }
        >
          Submit Category
        </Button>
      </form>
      {createSuccess && (
        <Alert className='fixed bottom-5' severity='success'>
          {`Successfully created ${category} category!`}
        </Alert>
      )}
    </div>
  );
}
