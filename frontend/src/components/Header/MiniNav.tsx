import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// -------------------------------------------------- //

export default function MiniNav() {
  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      <Button variant='contained' color='secondary' size='small'>
        Log in
      </Button>
      <SearchIcon className='cursor-pointer'/>
    </Stack>
  );
}
