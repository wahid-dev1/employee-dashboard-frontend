import React from 'react';

const Unauthorized = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
    </div>
  );
};

export default Unauthorized;
