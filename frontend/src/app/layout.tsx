'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import React from 'react';
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// components
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
import RoundedButton from '@/components/RoundedButton';
// providers
import { AuthProvider } from '@/providers/AuthProvider';
import { DataProvider } from '@/providers/DataProvider';
// -------------------------------------------------- //

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode ;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='assets/icon.svg' type='image/x-icon' />
        <title>Nomadverse</title>
      </head>
      <body className={`${inter.className} flex flex-col items-center grow`}>
        <AuthProvider>
          <DataProvider>
            <div className='max-w-screen-2xl w-full mb-32 flex-1 flex flex-col'>
              <Header />
              {children}
            </div>
          </DataProvider>
        </AuthProvider>
        <RoundedButton />
        <Footer />
      </body>
    </html>
  );
}
