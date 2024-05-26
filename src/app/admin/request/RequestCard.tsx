import React from 'react';
import { useRouter } from 'next/navigation';

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
  onUpdateStatus: (request: any) => void;
  onDelete: (id: string) => void;
};

const RequestCard: React.FC<RequestProps> = ({ request, onUpdateStatus, onDelete }) => {
  const router = useRouter();
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  }).format(request.price);

  const handleApprove = () => {
    onUpdateStatus({ ...request, status: 'APPROVED' });
  };

  const handleReject = () => {
    onUpdateStatus({ ...request, status: 'REJECTED' });
  };

  const handleEdit = () => {
    router.push(`/admin/request/edit/${request.id}`);
  };

  const handleDelete = () => {
    onDelete(request.id);
  };

  return (
    <div className='relative p-5 border border-white rounded-lg m-10'>
      <li key={request.id}>
        <button
          onClick={handleDelete}
          className='absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center'
        >
          &times;
        </button>
        <h2 className='font-semibold text-2xl mb-2'>{request.productName}</h2>
        <p>Product Link: {request.productLink}</p>
        <p>Price: {formattedPrice}</p>
        <p>Status: {request.status}</p>
        <div className='flex space-x-4 mt-4'>
          {request.status === 'PENDING' && (
            <>
              <button
                onClick={handleApprove}
                className='px-4 py-2 bg-green-500 text-white rounded-md'
              >
                Approve
              </button>
              <button
                onClick={handleReject}
                className='px-4 py-2 bg-red-500 text-white rounded-md'
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={handleEdit}
            className='px-4 py-2 bg-blue-500 text-white rounded-md'
          >
            Edit
          </button>
        </div>
      </li>
    </div>
  );
};

export default RequestCard;
