'use client';

import React from 'react';
// mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
// providers
import { useAuthContext } from '@/providers/AuthProvider';
// http
import httpClient from '@/api/http-client';
// next
import { useRouter } from 'next/navigation';
// -------------------------------------------------- //

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  if (name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
}

function BackgroundLetterAvatar({ name }: { name: string }) {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar {...stringAvatar(name)} />{' '}
    </Stack>
  );
}

// -------------------------------------------------- //

export default function MiniNav() {
  const router = useRouter();
  const { user, setUser } = useAuthContext();

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
    window.localStorage.removeItem('user');
  };

  const handleProfile = () => {
    router.push('/dashboard');
  };

  const handleNewChronicle = () => {
    router.push('/chronicle/create');
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
          <div onClick={handleClick} className='cursor-pointer'>
            <BackgroundLetterAvatar
              name={`${user.first_name} ${user.last_name}`}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
            />
          </div>
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
            <MenuItem
              onClick={() => {
                handleClose();
                handleNewChronicle();
              }}
            >
              Writer Suite
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
