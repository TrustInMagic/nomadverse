'use client';

import React from 'react';
// components
import CustomLink from '@/components/CustomLink';
// mui
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
// http
import httpClient from '@/api/http-client';
// providers
import { useAuthContext } from '@/providers/AuthProvider';
// next
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// types
import { ChangeEvent } from 'react';
// -------------------------------------------------- //

export default function Login() {
  const [loginErr, setLoginErr] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();
  const search = useSearchParams();
  const { setUser } = useAuthContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmitForm = async (
    e: ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const loginCredentials = {
      email: email,
      password: pwd,
    };

    try {
      const response = await httpClient.post(
        'auth/login',
        JSON.stringify(loginCredentials),
        { 'Content-Type': 'application/json' }
      );
      if (response.username) {
        window.localStorage.setItem('user', JSON.stringify(response));
        setUser(response);
        const prevLocation = search.get('from');
        if (prevLocation) {
          router.push(`${prevLocation}#comments`);
        } else {
          router.push('/');
        }
      }
    } catch (err: any) {
      setLoginErr(err.response.data);
      console.error('Error registering user', err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setLoginErr('');
  }, [email, pwd]);

  return (
    <div className='mt-24 flex flex-col items-center gap-2 max-720:px-10'>
      <span className='font-medium text-center'>Welcome back to Nomadverse!</span>
      <div className='text-sm text-center'>
        By continuing, you agree to our{' '}
        <CustomLink href='' text='User Agreement' color='purple' /> and{' '}
        <CustomLink href='' text='Privacy Policy' color='purple' />.
      </div>
      <div className='flex flex-col max-w-xl w-full mt-6'>
        <div className='mb-3 text-red-600 text-sm ml-3'>{loginErr}</div>
        <form
          className='flex flex-col w-full gap-6'
          onSubmit={handleSubmitForm}
        >
          <TextField
            size='small'
            id='outlined-basic'
            label='Email'
            variant='outlined'
            required
            color='secondary'
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant='outlined'>
            <InputLabel
              htmlFor='outlined-adornment-password'
              color='secondary'
              size='small'
            >
              Password
            </InputLabel>
            <OutlinedInput
              size='small'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              required
              color='secondary'
              onChange={(e) => setPwd(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <div className='relative'>
            <Button
              variant='contained'
              color='secondary'
              sx={{ alignSelf: 'baseline' }}
              type='submit'
              disabled={!email || !pwd || loading}
            >
              Log in
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'purple',
                  position: 'absolute',
                  top: '6px',
                  left: '5%',
                }}
              />
            )}
          </div>
        </form>
        <div className='mt-6'>
          {/* eslint-disable-next-line */}
          Don't have an account yet?{' '}
          <CustomLink
            href='/auth/registration'
            text='Sign up now'
            color='purple'
          />
        </div>
      </div>
    </div>
  );
}
