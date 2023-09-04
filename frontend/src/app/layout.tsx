import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// fonts
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// components
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';
// -------------------------------------------------- //

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nomadverse',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col items-center`}>
        <div className='max-w-screen-2xl w-full mb-48'>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
