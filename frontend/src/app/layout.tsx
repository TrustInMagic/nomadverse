'use client'

import './globals.css';
import { Inter } from 'next/font/google';
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// components
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
// providers
import { AuthProvider } from '@/providers/AuthProvider';
// -------------------------------------------------- //

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col items-center`}>
        <AuthProvider>
          <div className='max-w-screen-2xl w-full mb-48'>
            <Header />
            {children}
          </div>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
