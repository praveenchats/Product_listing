import React from 'react';
import ProductListing from './ProductListing';
const LandingPage = () => {
  return (
    <div className=' bg-[#ede2e2] font-bold p-20'>
      <h1 className=' text-[40px] text-[#333] mb-10 text-center'>Welcome to Praveen Store</h1>
      <ProductListing />
    </div>
  );
};

export default LandingPage;
