import React from 'react';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Logout, SetUser,SetOnlineUser,SetSocketConnection } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import { useLocation } from 'react-router-dom';
import Logo from "../assets/logo.png"
import {io} from "socket.io-client";

const Home = () => {
  const url = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Location = useLocation();

  const user = useSelector(state => state.user);

  const BasePath = Location.pathname === "/";

  




  //fetch users
  const fetchUsers = async () => {
    try {
     const response = await axios.get(`${url}/user-details`, { withCredentials: true });

      //dispatch to redux store
      dispatch(SetUser(response?.data?.data));

      if (response?.data?.data?.logout) {
        dispatch(Logout());
        navigate('/email');
      }


    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }

  useEffect(() => {

    fetchUsers();
  }, [dispatch,navigate])

  //socket conection 
    useEffect(()=>{
    const socketConnection = io(url,{
      auth:{
        token : localStorage.getItem('token')
      }
    })

    socketConnection.on('onlineuser',(data)=>{
     
      dispatch(SetOnlineUser(data))
    })

    //store socketConnection into redux store
    dispatch(SetSocketConnection(socketConnection))

    //disconnect
    return()=>{
      socketConnection.disconnect()
    }
    },[dispatch, url])

  return (
    <div className='grid lg:grid-cols-[300px,1fr] h-screen max-h-screen'>
      {/* sideBar component  */}
      <section className={`bg-white ${!BasePath && "hidden"} lg:block`}>
        <SideBar />
      </section>

      {/* message component  */}
      <section className={`${BasePath && "hidden"}`}>
        <Outlet />
      </section>

    {/* Logo Section */}
      <div className={`${BasePath && "lg:flex"} justify-center items-center flex-col gap-2 hidden`}>
        <div>
        <img 
        src={Logo}
         alt="Logo"
          width={250} />
        </div>
          <p className='text-lg mt-2 text-slate-500'>Select user to send message </p>
      </div>

    </div>
  );
}

export default Home;
