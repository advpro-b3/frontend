'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Request = {
  id?: string;
  productName: string;
  imageLink: string;
  price: number;
  productLink: string;
  currency: string;
  status: string;
};

type EditRequestFormProps = {
  id: string;
};

const EditRequestForm: React.FC<EditRequestFormProps> = ({ id }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Request>({
    productName: '',
    imageLink: '',
    price: 0,
    productLink: '',
    currency: 'IDR',
    status: 'PENDING'
  });

  useEffect(() => {
    // Fetch the existing request data
    const fetchRequest = async () => {
      try {
        const response = await fetch(`http://35.197.154.152/api/requests/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch request');
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRequest();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://35.197.154.152/api/requests/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update request');
      }

      router.push('/admin/request');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className="block">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageLink" className="block">Image Link:</label>
            <input
              type="text"
              id="imageLink"
              name="imageLink"
              value={formData.imageLink}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block">Price:</label>
            <div className="flex">
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                required
                className="mt-1 p-2 border rounded-l-md"
                disabled
              >
                <option value="IDR">IDR</option>
                <option value="USD">USD</option>
                <option value="JPY">JPY</option>
              </select>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-r-md"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="productLink" className="block">Product Link:</label>
            <input
              type="text"
              id="productLink"
              name="productLink"
              value={formData.productLink}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <button type="submit" className="py-2 px-4 rounded-md w-full border">Update Request</button>
        </form>
      </div>
    </div>
  );
};

export default EditRequestForm;
