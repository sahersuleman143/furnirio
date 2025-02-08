// Ensure global styles are imported
import { Inter } from 'next/font/google';
import React from 'react';
import Header from './components/header';
import '../styles/style.css';
import Footer from './components/footer';
import { CartProvider } from '../contexts/CartContext'; // CartContext ko import karein

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Your App Title',
  description: 'Your App Description',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap the app with CartProvider */}
        <CartProvider>
          <Header />
          {children} {/* Children pages will go here */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
