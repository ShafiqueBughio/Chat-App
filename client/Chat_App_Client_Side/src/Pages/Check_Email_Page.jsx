import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { PiUserCircle } from "react-icons/pi";

const url = import.meta.env.VITE_BACKEND_URL;

const Check_Email_Page = () => {
  const [data,setdata] = useState({
   
    email:"",
    
  })

const navigate = useNavigate();
  
  

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

  const URL =   `${url}/email`
  
  try {
    const response = await axios.post(URL,data);
    
    toast.success(response?.data?.message);

   
   if(response.data.success){
    setdata({
      email:"",
    })
    navigate("/password",{
      //send response data to password page
      state:response?.data?.data
    })
   }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

 
}
  return (
    <div className='mt-12 mb-3'>
    <div className='bg-white w-full max-w-sm md:max-w-md  rounded overflow-hidden p-4 mx-auto'>

        {/* //user Icon  */}
    <div className='w-fit mx-auto'>
    <PiUserCircle size={80}/>
    </div>
      <h1 className='flex items-center justify-center font-semibold text-primary text-2xl'>Welcome to Chat App!</h1>

    


      <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
    

        {/* Email  */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="email"></label>
          <input type="email" placeholder='Enter Your Email' name='email' id='email' value={data.email} onChange={handleOnChange} required
          className='bg-slate-100 px-2 py-2 focus:outline-primary' />
        </div>

      

      
      

        <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide'>
         Let's Go</button>

          <p className=' text-center'>New User ? <Link to={"/register"} className ="hover:text-primary font-semibold">Register</Link></p>
      </form>
    </div>
    </div>
  );
}

export default Check_Email_Page;
