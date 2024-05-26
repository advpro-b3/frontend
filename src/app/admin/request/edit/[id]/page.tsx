import React from 'react';
import EditRequestForm from './EditRequestForm';

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  return (
    <EditRequestForm id={params.id} />
  );
}
