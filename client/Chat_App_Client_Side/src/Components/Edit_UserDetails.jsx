import React from 'react';
const url = import.meta.env.VITE_BACKEND_URL;
import { useState,useRef } from 'react';
import Avater from './Avater';
import UploadFile from '../Helpers/UploadFile';
import { SetUser } from '../Redux/UserSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Edit_UserDetails = ({onClose,user,darkMode}) => {

  const navigate = useNavigate();

  //dispatch 
  const dispatch = useDispatch();

    
  const [data,setdata] = useState({
   
    name:   user?.name,
     profile_pic:   user?.profile_pic
    
  })

  

  const Upload_PhotoRef = useRef();

  const handle_Open_UploadPhoto = ()=>{
    
    Upload_PhotoRef.current.click();
  }

  const handleOnChange = (e)=>{


    const {name,value} = e.target;
    
    setdata((prev)=>{
      return ({
          ...prev,
        [name]:value
        })
    })
    }

    const handleUploadPhoto = async(e)=>{
        const file = e.target.files[0];

        const uploadPhoto = await UploadFile(file);
      
      
        setdata((prev)=>{
          return {
            ...prev,
            profile_pic:uploadPhoto?.url
          }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        e.stopPropagation();
      
        const URL =   `${url}/updateUser`
      
        try {
          const response = await axios({
            method: 'post',
            url:URL,
           data: {
            name  : data?.name,
            profile_pic:  data?.profile_pic
            },
            withCredentials : true
          });

         toast.success(response?.data?.message);

         if(response.data.success){
         
          //dispatch action
          dispatch(SetUser(response?.data?.data))
          
          setTimeout(() => {
            onClose();
          }, 1000);
         }
        } 
        catch (error) {
          // toast.error(error?.response?.data?.message);
          console.log(error?.message);
        
        }
      
       
      }
  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
   
   <div className={` p-4 py-6 m-1 w-full max-w-sm rounded ${darkMode?"bg-gray-600 text-white":"bg-white"}`}>
    <h2 className='font-semibold'>Profile Details</h2>
    <p className='text-sm text-slate-400'>Edit user details</p>


    <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-semibold'>Name  </label>
            <input
             type="text"
            name='name'
            id='name'
            value={data.name}
            onChange={handleOnChange}
            className={`w-full py-1 px-2 focus:outline-primary border-0.5 ${darkMode?"bg-gray-600  rounded focus:outline-blue-500":""}`}
            />
        </div>

        <div>
            
           <div className='font-semibold'>Photo</div>
           <div className=' my-1 cursor-pointer flex items-center gap-4'>
           <Avater
            name={data?.name}
            imageUrl= {data?.profile_pic}
            width={40}
            height={40}
            />

            <label htmlFor="profile_pic">
            <button className='font-semibold hover:underline ' type='button' onClick={()=>{handle_Open_UploadPhoto()}}>Change photo</button>
            <input
             type="file"
             id='profile_pic'
             onChange={handleUploadPhoto}
             ref={Upload_PhotoRef}
              className='hidden' />
              </label>
           </div>
        </div>
        <hr />
        <div className='flex gap-2 w-fit ml-auto mt-2'>
<button 
className={`px-4 py-1 rounded  ${darkMode?"border-blue-500 border text-white hover:bg-blue-500":"border-primary border text-primary hover:bg-primary hover:text-white"}`}
onClick={()=>{onClose()}}>
    Cancel</button>

<button onClick={handleSubmit} className={` px-4 py-1 rounded   ${darkMode?"border-blue-500 border bg-blue-500 hover:bg-blue-600":"border-primary border text-white bg-primary hover:bg-secondary"}`} >
    Save</button>

        </div>
    </form>
    </div>
    </div>
  );
}

export default Edit_UserDetails;
