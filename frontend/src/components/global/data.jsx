import React from 'react';
import TableComponent from './table';

const requestsData = [
  {
    srn: 'SRN12345',
    service: 'Web Development',
    requestRaised: '2024-09-01',
    fulfilled: '2024-09-05',
    status: 'Completed',
  },
  {
    srn: 'SRN67890',
    service: 'App Design',
    requestRaised: '2024-09-10',
    fulfilled: '',
    status: 'Pending',
  },
  {
    srn: 'SRN11223',
    service: 'SEO Optimization',
    requestRaised: '2024-09-07',
    fulfilled: '2024-09-15',
    status: 'Completed',
  },
  {
    srn: 'SRN44556',
    service: 'API Integration',
    requestRaised: '2024-09-12',
    fulfilled: '',
    status: 'Confirmed',
  },
];

function Data() {
  return (
    <div>
      <h1 className='font-bold'>Welcome to the Dashboard</h1>
      <TableComponent initialRequests={requestsData} />
    </div>
  );
}

export default Data;
