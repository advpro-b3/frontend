"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
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
          {isAuthenticated ? (
            <button onClick={handleLogout} className={styles.navButton}>Logout</button>
          ) : (
            <Link href="/login" className={styles.navLink}>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
