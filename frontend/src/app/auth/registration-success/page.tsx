import React from 'react';
// components
import CustomLink from '@/components/CustomLink';

export default function RegistrationSuccess() {
  return (
    <div className='flex flex-col items-center justify-center mt-44 gap-3'>
      <span>Your account has been created.</span>
      <div>
        Click <CustomLink href='/auth/login' color='purple' text='here'/> to
        log into your brand new account!
      </div>
    </div>
  );
}
