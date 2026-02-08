import type { Metadata } from 'next';
import { Inter, Playfair_Display, Syne } from 'next/font/google';
import React from 'react';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WalletWise - Clarity in Your On-Chain Activity',
  description:
    'WalletWise gives you a clear view of your crypto holdings, transparent transaction history, and actionable insights across all your chains—so you can make informed Web3 decisions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
