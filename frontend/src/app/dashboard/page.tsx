'use client';

import React from 'react';
// providers
import { useAuthContext } from '@/providers/AuthProvider';
// components
import DashboardField from './components/DashboardField';
// next
import { redirect } from 'next/navigation';
// -------------------------------------------------- //

export default function Account() {
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (!user) {
      redirect('/');
    }
  });

  if (!user) {
    return;
  }

  return (
    <div className='mt-28 flex flex-col items-center gap-14'>
      <div className='flex flex-col items-center gap-2'>
        <span className='font-bold text-xl'>Hello, {user?.username}</span>
        <span>Welcome to your dashboard!</span>
        <span className='mt-3 text-xs text-center'>
          Note: This page is still under construction. Some features might not
          be available.
        </span>
      </div>
      <div className='flex flex-col w-2/4 max-720:w-full max-720:items-center max-460:items-baseline'>
        <span className='font-bold text-xl mb-5'>User Information</span>
        <div className='self-baseline grid grid-cols-2 gap-8 max-720:self-center max-460:flex max-460:flex-col max-460:self-baseline max-460:mx-5'>
          <DashboardField
            field='First Name:'
            fieldValue={user.first_name}
            buttonText='change first name'
          />
          <DashboardField
            field='Last Name:'
            fieldValue={user.last_name}
            buttonText='change last name'
          />
          <DashboardField
            field='Username:'
            fieldValue={user.username}
            buttonText='change username'
          />
          <DashboardField
            field='Email:'
            fieldValue={user.email}
            buttonText='change email'
          />
          <DashboardField
            field='Role:'
            fieldValue={user.role}
            role={true}
            buttonText='become a writer'
          />
        </div>
      </div>
    </div>
  );
}
