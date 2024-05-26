"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClientLayout from '../../components/ClientLayout';
import styles from './vouchers.module.css';
import withAuth from '../utils/withAuth';

interface Voucher {
  code: string;
  discount: number;
  maxDiscount: number | null;
  minPurchase: number | null;
  paymentMethod: string;
  creationDate: string;
  expiryDate: string | null;
}

interface VouchersProps {
  userRole: string;
}

const Vouchers: React.FC<VouchersProps> = ({ userRole }) => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [currentVoucher, setCurrentVoucher] = useState<Voucher | null>(null);
  const [newVoucher, setNewVoucher] = useState({
    discount: '',
    maxDiscount: '',
    minPurchase: '',
    paymentMethod: '',
    expiryDate: ''
  });

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('http://35.240.180.63/voucher/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVouchers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vouchers');
        setLoading(false);
      }
    };

    fetchVouchers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewVoucher({
      ...newVoucher,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const requestBody = {
        discount: parseFloat(newVoucher.discount) / 100, // Convert discount to 0.0 - 1.0
        maxDiscount: newVoucher.maxDiscount ? parseFloat(newVoucher.maxDiscount) : null,
        minPurchase: newVoucher.minPurchase ? parseFloat(newVoucher.minPurchase) : null,
        paymentMethod: newVoucher.paymentMethod || null,
        expiryDate: newVoucher.expiryDate || null
      };

      if (editMode && currentVoucher) {
        await axios.put(`http://35.240.180.63/voucher/edit`, {
          ...requestBody,
          code: currentVoucher.code,
          creationDate: currentVoucher.creationDate
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post('http://35.240.180.63/voucher/create', requestBody, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setShowForm(false);
      setEditMode(false);
      setCurrentVoucher(null);
      setNewVoucher({
        discount: '',
        maxDiscount: '',
        minPurchase: '',
        paymentMethod: '',
        expiryDate: ''
      });
      // Refresh the voucher list after creation/editing
      const response = await axios.get('http://35.240.180.63/voucher/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVouchers(response.data);
    } catch (err) {
      console.error('Failed to create/edit voucher', err);
    }
  };

  const handleEdit = (voucher: Voucher) => {
    setCurrentVoucher(voucher);
    setNewVoucher({
      discount: (voucher.discount * 100).toString(), // Convert discount to 0-100
      maxDiscount: voucher.maxDiscount ? voucher.maxDiscount.toString() : '',
      minPurchase: voucher.minPurchase ? voucher.minPurchase.toString() : '',
      paymentMethod: voucher.paymentMethod,
      expiryDate: voucher.expiryDate ? voucher.expiryDate : ''
    });
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (code: string) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`http://35.240.180.63/voucher/delete/${code}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh the voucher list after deletion
      const response = await axios.get('http://35.240.180.63/voucher/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVouchers(response.data);
    } catch (err) {
      console.error('Failed to delete voucher', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ClientLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>Existing Vouchers</h1>
        {userRole === 'ADMIN' && (
          <div className={styles.adminActions}>
            <button className={styles.button} onClick={() => {
              setShowForm(!showForm);
              setEditMode(false);
              setCurrentVoucher(null);
            }}>
              {showForm ? 'Cancel' : 'Create New Voucher'}
            </button>
          </div>
        )}
        {showForm && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="number"
              name="discount"
              placeholder="Discount"
              min="0"
              max="100"
              value={newVoucher.discount}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
            <input
              type="number"
              name="maxDiscount"
              placeholder="Max Discount"
              value={newVoucher.maxDiscount}
              onChange={handleInputChange}
              className={styles.input}
            />
            <input
              type="number"
              name="minPurchase"
              placeholder="Min Purchase"
              value={newVoucher.minPurchase}
              onChange={handleInputChange}
              className={styles.input}
            />
            <select
              name="paymentMethod"
              value={newVoucher.paymentMethod}
              onChange={handleInputChange}
              required
              className={styles.input}
            >
              <option value="">Select Payment Method</option>
              <option value="ANY">ANY</option>
              <option value="BANK_TRANSFER">BANK_TRANSFER</option>
              <option value="CREDIT_CARD">CREDIT_CARD</option>
              <option value="DIGITAL_WALLET">DIGITAL_WALLET</option>
            </select>
            <input
              type="date"
              name="expiryDate"
              placeholder="Expiry Date"
              value={newVoucher.expiryDate}
              onChange={handleInputChange}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              {editMode ? 'Update Voucher' : 'Create Voucher'}
            </button>
          </form>
        )}
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Max Discount</th>
              <th>Min Purchase</th>
              <th>Payment Method</th>
              <th>Creation Date</th>
              <th>Expiry Date</th>
              {userRole === 'ADMIN' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.code}>
                <td>{voucher.code}</td>
                <td>{voucher.discount * 100}%</td>
                <td>{voucher.maxDiscount ? `Rp ${voucher.maxDiscount}` : 'N/A'}</td>
                <td>{voucher.minPurchase ? `Rp ${voucher.minPurchase}` : 'N/A'}</td>
                <td>{voucher.paymentMethod}</td>
                <td>{voucher.creationDate}</td>
                <td>{voucher.expiryDate ? voucher.expiryDate : 'N/A'}</td>
                {userRole === 'ADMIN' && (
                  <td>
                    <button className={styles.button} onClick={() => handleEdit(voucher)}>Edit</button>
                    <button className={styles.button} onClick={() => handleDelete(voucher.code)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ClientLayout>
  );
};

export default withAuth(Vouchers);
