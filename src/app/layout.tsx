import React from 'react';
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'A Next.js app',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
