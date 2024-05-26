'use client'

import React, { useEffect, useState } from 'react';
import RequestCard from './RequestCard';
import Link from 'next/link';

type Request = {
  id: string;
  productName: string;
  imageLink: string;
  price: number;
  productLink: string;
  currency: string;
  status: string;
};

const fetchRequests = async (): Promise<Request[]> => {
  const response = await fetch('http://35.197.154.152/api/requests');
  if (!response.ok) {
    throw new Error('Failed to fetch requests');
  }
  return response.json();
};

const Page = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (err) {
        console.log(err);
      }
    };

    getRequests();
  }, []);

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center px-10 pt-10'>
        <h1 className='text-center text-4xl font-bold'>Your Requests</h1>
        <Link href="/request/create">
          <button className='px-5 py-2 border rounded-lg'>Create Request</button>
        </Link>
      </div>
      <div className='mt-10'>
        {requests.length === 0 ? (
          <p className='text-center text-lg pt-20'>You currently have no requests.</p>
        ) : (
          <ul>
            {requests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
