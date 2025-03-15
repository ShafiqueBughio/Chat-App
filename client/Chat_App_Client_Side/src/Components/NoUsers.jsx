import React from 'react';
import { FiArrowUpLeft } from "react-icons/fi";
import { useSelector } from 'react-redux';

const NoUsers = () => {

  const darkMode = useSelector(state=> state?.user?.darkMode);

  return (
    <div className='mt-12'>
      <div className={`flex justify-center items-center my-4 ${darkMode ?"text-white":"text-slate-400"}`}>
    <FiArrowUpLeft
    size={50}
    className={`${darkMode? "hover:text-blue-400":"hover:text-gray-700"}`}
    />
      </div>
      <p className='text-lg text-center'>Explore users to start a conversation</p>
    </div>
  );
}

export default NoUsers;
