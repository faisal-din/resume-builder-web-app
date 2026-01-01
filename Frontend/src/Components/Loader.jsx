import React from 'react';

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='animate-spin rounded-full size-12 border-4 border-t-transparent border-gray-400'></div>
    </div>
  );
};

export default Loader;
