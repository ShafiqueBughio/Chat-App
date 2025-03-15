import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toggleClearChat } from '../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import { toggleClearChat_Choice } from '../Redux/UserSlice';

const ClearChat = ({darkMode}) => {

    const dispatch = useDispatch();

    const clearChat_open = useSelector(state=>state?.user?.ClearChat);

    const Handle_SuccessButton = ()=>{
        dispatch(toggleClearChat())
        
        dispatch(toggleClearChat_Choice());
    }

    const Handle_FailureButton = ()=>{
        dispatch(toggleClearChat())
    }

  return (
    <div className={`fixed top-[70px]  left-1/2 transform -translate-x-1/2  w-72 md:w-80 h-24 p-2 z-10 rounded shadow-lg transition duration-700 ease-out ${darkMode?"bg-gray-600 text-white":"bg-white"}`}>
      <div className='flex items-center justify-center mt-2'>
        <p>Are you sure you want to clear chat ?</p>
      </div>
      <div className='flex justify-center items-center'>
        <button className='px-3 py-1 m-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white' onClick={Handle_SuccessButton} value='true'>Yes</button>
        <button className={`px-3 py-1 m-2  cursor-pointer  ${darkMode?"bg-green-500 text-white hover:bg-green-600 ":"bg-green-500 hover:bg-green-600 text-white"}`} onClick={Handle_FailureButton} value='false'>No</button>
      </div>
    </div>
  );
}

export default ClearChat;
