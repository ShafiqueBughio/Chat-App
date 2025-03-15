import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Avater from "../Components/Avater"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SetToken } from '../Redux/UserSlice';

const url = import.meta.env.VITE_BACKEND_URL;

const Check_Password_Page = () => {

  //dispatch hook
  const dispatch = useDispatch();

  const [data,setdata] = useState({
   
    password:"",
    
  })


const navigate = useNavigate();

//Get response data from email page here using useLocaion Hook
const location = useLocation();

//useEffect Hook
useEffect(()=>{
  if(!location?.state?.name){
    navigate('/email')
  }
},[])
 
const [Password,setPassword] = useState(false);


const handleOnChange = (e)=>{


const {name,value} = e.target;

setdata((prev)=>{
  return ({
      ...prev,
    [name]:value
    })
})
}



const handleSubmit = async(e)=>{
  e.preventDefault();
  e.stopPropagation();

  const URL =   `${url}/password`

  try {
    const response = await axios({
      method: 'post',
      url:URL,
     data: {
      userId  : location?.state?._id,
      password:  data.password
      },
      withCredentials : true
    });
    
    toast.success(response?.data?.message);
  

   
   if(response.data.success){
    const token = response?.data?.token
    //dispatch action
    dispatch(SetToken(token))
    localStorage.setItem("token",token);

    setdata({
      password:"",
    })
    navigate("/")
   }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

 
}
  return (
    <div className='mt-12 mb-3'>
    <div className='bg-white w-full max-w-sm md:max-w-md  rounded overflow-hidden p-4 mx-auto'>

        {/* //user Icon  */}
    <div className='w-fit mx-auto flex justify-center items-center flex-col'>
    {
      <Avater
       width = {80}
        height={80}  
        name = {location?.state?.name}
         imageUrl={location?.state?.profile_pic}
         
         />
    }
    <h2 className='font-semibold text-lg mt-1'>{location?.state?.name}</h2>
    </div>  
     

    


      <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
    

         {/* Password  */}
         <div className="flex flex-col gap-1 relative">
            <label htmlFor="password"></label>
            <input
              type={Password ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleOnChange}
              required
              className="bg-slate-100 px-2 py-2 pr-10 focus:outline-primary"
            />
            <span
              onClick={() => setPassword(!Password)}
              className="absolute right-2 top-4 cursor-pointer text-gray-500 w-5 h-5"
            >
              {Password ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>

      

      
      

        <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide'>
         Login</button>

          <p className=' text-center'><Link to={"/forgot-password"} className ="hover:text-primary font-semibold">Forgot Password ?</Link></p>
      </form>
    </div>
    </div>
  );
}

export default Check_Password_Page;
































