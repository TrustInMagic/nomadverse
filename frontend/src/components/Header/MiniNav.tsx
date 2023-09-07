'use client';

import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// providers
import { useAuthContext } from '@/providers/AuthProvider';
// http
import httpClient from '@/api/http-client';
// next
import { useRouter } from 'next/navigation';
// -------------------------------------------------- //

export default function MiniNav() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

  console.log(user);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const response = await httpClient.post('auth/logout');
      console.log(`Response: ${JSON.stringify(response)}`);
    } catch (err) {
      console.error('Error logging out', err);
    }
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleProfile = () => {
    router.push('/dashboard');
  };

  return (
    <Stack direction='row' spacing={2} alignItems='center'>
      {!user ? (
        <Button
          variant='contained'
          color='secondary'
          size='small'
          onClick={handleLogin}
        >
          Log in
        </Button>
      ) : (
        <div>
          <Button
            id='basic-button'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup='true'
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color='secondary'
          >
            {user.username}
          </Button>
          <Menu
            id='basic-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem
              onClick={() => {
                handleProfile();
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} disabled={user.role !== 'admin'}>
              New Chronicle
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
      <SearchIcon className='cursor-pointer' />
    </Stack>
  );
}
