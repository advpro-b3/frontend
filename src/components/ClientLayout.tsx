"use client";

import React from 'react';
import Navbar from './Navbar';

const ClientLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default ClientLayout;
