"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import styles from './login.module.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://35.240.180.63:81/api/auth/authenticate', { username, password });
            const { token } = response.data;
            Cookies.set('token', token, { expires: 7 }); // Store token in a cookie for 7 days
            router.push('/'); // Redirect to a protected route
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className={styles.root}>
          <div className={styles.container}>
            <h2 className={styles.title}>LOGIN</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
              <button type="submit" className={styles.button}>LOGIN</button>
            </form>
          </div>
        </div>
      );
};

export default Login;