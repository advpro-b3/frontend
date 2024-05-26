import React from 'react';

type RequestProps = {
  request: {
    id: string;
    productName: string;
    imageLink: string;
    price: number;
    productLink: string;
    currency: string;
    status: string;
  };
};

const RequestCard: React.FC<RequestProps> = ({ request }) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(request.price);

  return (
    <div className='p-5 border border-white rounded-lg m-10'>
      <li key={request.id}>
        <h2 className='font-semibold text-2xl mb-2'>{request.productName}</h2>
        <p>Product Link: {request.productLink}</p>
        <p>Price: {formattedPrice}</p>
        <p>Status: {request.status}</p>
      </li>
    </div>
  );
};

export default RequestCard;
