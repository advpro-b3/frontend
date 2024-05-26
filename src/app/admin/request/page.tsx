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

const updateRequestStatus = async (request: Request) => {
  const response = await fetch(`http://35.197.154.152/api/requests/${request.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error('Failed to update request status');
  }
};

const deleteRequest = async (id: string) => {
  const response = await fetch(`http://35.197.154.152/api/requests/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete request');
  }
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

  const handleUpdateStatus = async (updatedRequest: Request) => {
    try {
      await updateRequestStatus(updatedRequest);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRequest(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id)
      );
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const pendingRequests = requests.filter(request => request.status === 'PENDING');
  const otherRequests = requests.filter(request => request.status !== 'PENDING');

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center px-10 pt-10'>
        <h1 className='text-center text-4xl font-bold'>Requests</h1>
      </div>
      <div className='mt-10'>
        <h2 className='text-2xl font-semibold mb-4 px-10'>Pending Requests</h2>
        {pendingRequests.length === 0 ? (
          <p className='text-center text-lg pt-10'>You currently have no pending requests.</p>
        ) : (
          <ul>
            {pendingRequests.map((request) => (
              <RequestCard key={request.id} request={request} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
      <div className='mt-10'>
        <h2 className='text-2xl font-semibold mb-4 px-10'>Approved/Rejected Requests</h2>
        {otherRequests.length === 0 ? (
          <p className='text-center text-lg pt-10'>You currently have no approved or rejected requests.</p>
        ) : (
          <ul>
            {otherRequests.map((request) => (
              <RequestCard key={request.id} request={request} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
