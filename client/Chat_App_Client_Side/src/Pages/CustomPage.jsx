import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomPage = () => {
    const navigate = useNavigate();
  return (
    <div className='bg-red-600 h-screen flex flex-col justify-center items-center text-white text-center px-4'>
      <h2 className='text-6xl font-bold mb-4 font-poppins '>404</h2>
    
      <p className='text-base md:text-lg mb-6'>WE ARE SORRY BUT THE PAGE YOU REQUESTED WAS NOT FOUND</p>

      <div className='bg-white text-red-500 md:px-6 md:py-2 px-3 py-1 rounded-md font-semibold hover:bg-red-500 hover:text-white cursor-pointer' onClick={()=>{navigate('/')}}>Go Home</div>
    </div>
  );
}

export default CustomPage;
