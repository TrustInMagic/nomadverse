'use client';

import React from 'react';
// components
import CustomLink from '@/components/CustomLink';
// mui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
// next
import { useRouter } from 'next/navigation';
// http
import httpClient from '@/api/http-client';
// types
import { ChangeEvent } from 'react';
// -------------------------------------------------- //

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const USER_REGEX = /^[a-zA-Z0-9-_]+$/;

export default function Registration() {
  const [allUsers, setAllUsers] = React.useState([]);
  const [showPassword, setShowPassword] = React.useState(false);

  const [email, setEmail] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');

  const [user, setUser] = React.useState('');
  const [userErr, setUserErr] = React.useState('');

  const [firstName, setFirstName] = React.useState('');

  const [lastName, setLastName] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [pwd, setPwd] = React.useState('');
  const [pwdErr, setPwdErr] = React.useState('');

  const [match, setMatch] = React.useState('');
  const [matchErr, setMatchErr] = React.useState('');

  const router = useRouter();

  React.useEffect(() => {
    (async () => {
      const users = await httpClient.get('users');
      setAllUsers(users);
    })();
  }, []);

  const findDuplicatesInCollection = (
    field: string,
    compare: string
  ): boolean => {
    return allUsers.some((user) => user[field] === compare);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleEmailChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setEmail(newValue);

    if (!EMAIL_REGEX.test(newValue)) {
      setEmailErr('Please enter a valid email address.');
    } else if (findDuplicatesInCollection('email', newValue)) {
      setEmailErr('Email already in use');
    } else {
      setEmailErr('');
    }
  };

  const handleUserChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setUser(newValue);

    if (newValue.length < 6 || newValue.length > 30) {
      setUserErr('Username must be between 6 and 30 characters');
    } else if (!USER_REGEX.test(newValue)) {
      setUserErr(
        'Username must only include underscores, dashes or alphanumeric characters'
      );
    } else if (findDuplicatesInCollection('username', newValue)) {
      setUserErr('Username already in use');
    } else {
      setUserErr('');
    }
  };

  const handlePwdChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setPwd(e.target.value);

    if (newValue.length < 6) {
      setPwdErr('Password must be at least 6 characters long');
    } else {
      setPwdErr('');
    }
  };

  const handleMatchChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    setMatch(e.target.value);

    if (newValue !== pwd) {
      setMatchErr('Passwords do not match');
    } else {
      setMatchErr('');
    }
  };

  const handleSubmitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newUser = {
      email: email,
      password: pwd,
      username: user,
      password_confirm: match,
      first_name: firstName,
      last_name: lastName,
    };

    try {
      const response = await httpClient.post(
        'auth/register',
        JSON.stringify(newUser),
        { 'Content-Type': 'application/json' }
      );

      if (response === 'OK') {
        router.push('registration-success');
      }
    } catch (err) {
      console.error('Error registering user', err);
      setLoading(false);
    }
  };

  return (
    <div className='mt-24 flex flex-col items-center gap-2 max-720:px-10'>
      <span className='font-medium'>Welcome to Nomadverse!</span>
      <div className='text-sm text-center'>
        By continuing, you are creating a Nomadverse account and hereby agree to
        our <br />
        <CustomLink href='' text='User Agreement' color='purple' /> and{' '}
        <CustomLink href='' text='Privacy Policy' color='purple' />.
      </div>
      <div className='flex flex-col max-w-xl w-full mt-6'>
        <form
          className='flex flex-col w-full gap-6'
          onSubmit={handleSubmitForm}
        >
          <TextField
            size='small'
            label='Email'
            variant='outlined'
            required
            color='secondary'
            onChange={(e) => handleEmailChange(e)}
            error={email.length > 0 && emailErr.length > 0}
            helperText={email.length > 0 && emailErr}
          />
          <TextField
            size='small'
            label='Username'
            variant='outlined'
            required
            color='secondary'
            onChange={(e) => handleUserChange(e)}
            error={user.length > 0 && userErr.length > 0}
            helperText={user.length > 0 && userErr}
          />
          <TextField
            size='small'
            label='First Name'
            variant='outlined'
            required
            color='secondary'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            size='small'
            label='Last Name'
            variant='outlined'
            required
            color='secondary'
            onChange={(e) => setLastName(e.target.value)}
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
              onChange={(e) => handlePwdChange(e)}
              error={pwd.length > 0 && pwdErr.length > 0}
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
            <div className='text-xs mt-1 ml-4 text-red-600'>
              {pwd.length > 0 && pwdErr}
            </div>
          </FormControl>
          <FormControl variant='outlined'>
            <InputLabel
              htmlFor='outlined-adornment-password'
              color='secondary'
              size='small'
            >
              Confirm Password
            </InputLabel>
            <OutlinedInput
              size='small'
              label='Confirm Password'
              type={showPassword ? 'text' : 'password'}
              required
              color='secondary'
              onChange={(e) => handleMatchChange(e)}
              error={match.length > 0 && matchErr.length > 0}
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
            <div className='text-xs mt-1 ml-4 text-red-600'>
              {match.length > 0 && matchErr}
            </div>
          </FormControl>
          <div className='relative'>
            <Button
              variant='contained'
              color='secondary'
              sx={{ alignSelf: 'baseline' }}
              type='submit'
              disabled={
                emailErr.length > 0 ||
                email.length === 0 ||
                userErr.length > 0 ||
                user.length === 0 ||
                pwdErr.length > 0 ||
                pwd.length === 0 ||
                matchErr.length > 0 ||
                match.length === 0 ||
                loading
              }
            >
              Sign up
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: 'purple',
                  position: 'absolute',
                  top: '6px',
                  left: '6%',
                }}
              />
            )}
          </div>
        </form>
        <div className='mt-6'>
          {/* eslint-disable-next-line */}
          Already have an account?{' '}
          <CustomLink href='/auth/login' text='Login' color='purple' />
        </div>
      </div>
    </div>
  );
}
