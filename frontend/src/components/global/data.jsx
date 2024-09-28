import React from 'react';
import TableComponent from './table';


function Data() {
  return (
    <div>
      <h1 className='font-bold'>Welcome to the Dashboard</h1>
      <TableComponent initialRequests={requestsData} />
    </div>
  );
}

export default Data;
