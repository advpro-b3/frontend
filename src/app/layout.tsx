import React, { ReactNode } from 'react';
import './globals.css';

export const metadata = {
  title: 'My App',
  description: 'A Next.js app',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;

