"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/vouchers" className={styles.navLink}>Vouchers</Link>
        </li>
        <li className={styles.navItem}>
          <button onClick={handleLogout} className={styles.navButton}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
