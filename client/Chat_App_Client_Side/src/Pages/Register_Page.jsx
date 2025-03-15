import React from 'react';
import { useState } from 'react';
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import UploadFile from '../Helpers/UploadFile';
import axios from "axios"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const url = import.meta.env.VITE_BACKEND_URL;


const Register_Page = () => {
  const [data,setdata] = useState({
    name:"",
    email:"",
    password:"",
    profile_pic:""
  })

const navigate = useNavigate();
  
  const [profile_photo,setProfilePhoto] = useState("");

  const [Password,setPassword] = useState(false);

  const Handle_Password = ()=>{
    setPassword(!Password);
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

//handle profile photo finction
const handle_Profile_Photo = async(e)=>{
  const file = e.target.files[0];

  const uploadPhoto = await UploadFile(file);



  setProfilePhoto(file);

  setdata((prev)=>{
    return {
      ...prev,
      profile_pic:uploadPhoto?.url
    }
  })
}

const Remove_Selected_File = (e)=>{
 e.preventDefault()
 e.stopPropagation()
  
  setProfilePhoto(null);
}

const handleSubmit = async(e)=>{
  e.preventDefault();
  e.stopPropagation();

  const URL =   `${url}/register`

  try {
    const response = await axios.post(URL,data);
    toast.success(response.data.messsage);

   
   if(response.data.success){
    setdata({
      name:"",
      email:"",
      password:"",
      profile_pic:""
    })
    navigate("/email")
   }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }

 
}


  return (
    <div className='mt-12 mb-3'>
    <div className='bg-white w-full max-w-sm md:max-w-md  rounded overflow-hidden p-4 mx-auto'>
      <h1 className='flex items-center justify-center font-semibold text-primary text-2xl'>Welcome to Chat App!</h1>

      <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
        {/* Name  */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="name"></label>
          <input type="text" placeholder='Enter Your Name' name='name' id='name' value={data.name} onChange={handleOnChange} required
          className='bg-slate-100 px-2 py-2 focus:outline-primary' />
        </div>

        {/* Email  */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="email"></label>
          <input type="email" placeholder='Enter Your Email' name='email' id='email' value={data.email} onChange={handleOnChange} required
          className='bg-slate-100 px-2 py-2 focus:outline-primary' />
        </div>

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

        {/* Profile_Pic  */}
        <div className='flex flex-col gap-1'>
          <label htmlFor="profile_pic">


        <div className='h-14 bg-slate-200 flex justify-center items-center rounded border hover:border-primary cursor-pointer '>
          <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
            {profile_photo?profile_photo.name:"Upload Profile Photo"}
          
          </p>
          
            {
              profile_photo?.name &&(<button className='text-lg ml-2 hover:text-red-600 ' onClick={(e)=>{Remove_Selected_File(e)}}><IoClose/></button>)
            }
          
         
        </div>

          </label>


          <input type="file"  name='profile_pic' id='profile_pic' onChange={handle_Profile_Photo}
          className='bg-slate-100 px-2 py-1 focus:outline-primary hidden' />
        </div>

        <button className='bg-primary text-lg px-4 py-1 hover:bg-secondary rounded mt-2 font-semibold text-white leading-relaxed tracking-wide'>
          Register</button>

          <p className=' text-center'>Already have an account ? <Link to={"/email"} className ="hover:text-primary font-semibold">Login</Link></p>
      </form>
    </div>
    </div>
  );
}

export default Register_Page;
