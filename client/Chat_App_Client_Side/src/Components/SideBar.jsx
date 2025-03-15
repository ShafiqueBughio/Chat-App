import React from 'react';
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { BiLogOut } from "react-icons/bi";
import Avater from './Avater';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import Edit_UserDetails from './Edit_UserDetails';
import NoUsers from './NoUsers';
import Search_User from './Search_User';
import { useParams } from 'react-router-dom';
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logout } from '../Redux/UserSlice';


const SideBar = () => {

    const user =  useSelector((state=>state?.user));

    const [edit_UserOpen,Set_Edit_UserOpen] = useState(false);

    const [Search_Open,Set_Search_Open] = useState(false);

    const [allusers,Set_allusers] = useState([]);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const socketConnection = useSelector(state=>state?.user?.socketConnection);

     const darkMode = useSelector(state=> state?.user?.darkMode);

    const params = useParams();

    const userId = params.userid;

    useEffect(()=>{
      if(socketConnection){
        socketConnection.emit('sidebar',user?._id)

        socketConnection.on('conversation',(data)=>{

          const conversationUserData = data.map((conv,index)=>{
            //If user chat with his/her self
            if(conv?.reciver?._id === conv?.sender?._id){
              return{
                ...conv,
                userDetails: conv?.sender
              }
            }
            // if user chat with other reciver (person)
            else if(conv?.reciver?._id !== user?._id){
              return{
                ...conv,
                userDetails : conv?.reciver
              }
            }
            // if any other case occurs 
            else{
              return{
                ...conv,
                userDetails : conv?.sender
              }
            }
          })

          Set_allusers(conversationUserData);
        })

        
      }
    },[socketConnection,user,userId])

    const HandleLogout = ()=>{
      dispatch(Logout());
      navigate("/email");
      localStorage.clear();
    }

   

        
  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr]'>
      
      {/* Menu section  */}
    <div className={` w-12 h-full  rounded-br-lg py-5 text-slate-600 flex flex-col justify-between ${darkMode ? "bg-gray-800 text-white":"rounded-tr-lg"}`}>

  {/* upper part        */}
    <div>
                {/* message part  */}
                <NavLink className={({isActive})=>`w-12 h-12 flex justify-center items-center cursor-pointer  rounded mt-2 ${isActive && darkMode ?  "bg-blue-400 hover:bg-blue-500":"bg-slate-200"} `}title='chat'>
    <IoChatbubbleEllipses
    size={20}
  
    />
        </NavLink>

    {/* add friend part  */}
        <div onClick={()=>{Set_Search_Open(true)}} className={`w-12 h-12 flex justify-center items-center cursor-pointer rounded mt-2 ${darkMode ? "hover:bg-blue-500": "hover:bg-slate-200" }`}
          title='Add friend'
          >
      <FaUserPlus
      size={20}
 />
        </div>
    </div>


    {/* Lower Part  */}
    <div className='flex flex-col items-center'>
    {/* user  */}
    <button className='mx-auto ' title={user?.name} onClick={()=>{Set_Edit_UserOpen(true)}}>
        <Avater
        width={40}
        height={40}
        name={user?.name}
        imageUrl = {user?.profile_pic}
        userId = {user?._id}
        />
    </button>

    {/* Logout  */}
   <button className={`w-12 h-12 flex justify-center items-center cursor-pointer rounded mt-2 ${darkMode ? "hover:bg-blue-500": "hover:bg-slate-200"}`}title='logout' onClick={HandleLogout}>
    <span className='-ml-2'>   
    <BiLogOut
   size={20}/>
   </span>
   </button>
    </div>

    </div>

    {/* Show all users on sideBar Section  */}
    <div className={`w-full ${darkMode ?"bg-gray-600 text-white":""}`}>
      <div className={`h-16 flex items-center ${darkMode?"bg-gray-800 text-white":"text-gray-800"}`}>
        <h2 className='text-xl font-bold p-4 '>Message</h2>
      </div>
      <hr />
    <div className={`h-[calc(100vh-65px)] overflow-x-hidden overflow-y-scroll  ${darkMode ? "Scrollbar":"scrollbar"}`}>
    {
      allusers.length === 0 && (<NoUsers/>)
    }
    {/* if users border hover:border-primary */}
    {
      allusers.map((chat,index)=>{
        return(
          <NavLink to={'/'+chat?.userDetails?._id}  key={chat?._id}  className={({ isActive }) => 
            `flex items-center gap-2 py-5 px-2 cursor-pointer rounded my-1 mx-1 ${
              isActive 
                ? darkMode 
                  ? "bg-blue-400 text-white" 
                  : "bg-slate-200 text-gray-800"
                : darkMode 
                  ? "bg-gray-700 hover:bg-gray-800 text-white" 
                  : "bg-slate-100 hover:bg-slate-200 text-gray-800"
            }`
          }>
            {/* show avater  */}
            <div>
              <Avater
              imageUrl={chat?.userDetails?.profile_pic}
              name={chat?.userDetails?.name}
              width={40}
              height={40}
              />
            </div>
            {/* Show name/image/video  */}
            {/* name  */}
            <div >
              <h3 className='text-ellipsis line-clamp-1 font-semibold text-base'>{chat?.userDetails?.name}</h3>
              {/* image */}
              <div className='text-slate-500 text-xs flex items-center gap-1'>
              <div className='flex items-center gap-1'>
                {chat?.lastmsg?.image_url && (
                 <div className='flex items-center gap-1'>
                   <span><FaImage/></span>
                   {!chat?.lastmsg?.text && <span>Image</span>}
                 </div>
                )}
                {/* vide  */}
                {chat?.lastmsg?.video_url && (
                 <div className='flex items-center gap-1'>
                   <span><FaVideo/></span>
                  {!chat?.lastmsg?.text &&  <span>Video</span>}
                 </div>
                )}


              </div>
              {/* text  */}
              <p className={`text-ellipsis line-clamp-1 ${darkMode ? "text-slate-100": "text-gray-600"}`}>{chat?.lastmsg?.text}</p>
              </div>
            </div>
              {/* show unseen messages  */}
              {
                Boolean(chat?.UnseenMsg)&& 
                <p className={`flex justify-center items-center text-xs w-6 h-6 ml-auto p-1  rounded-full ${darkMode ?"bg-blue-500 text-white" :"text-white bg-primary" }`}>{chat?.UnseenMsg}</p>
              }
              
          </NavLink>
        )
      })
    }
    </div>

    </div>

    {/* Edit User Details  */}
    {
        edit_UserOpen && (
            <Edit_UserDetails onClose = {()=>Set_Edit_UserOpen(false)} user = {user} darkMode = {darkMode} />
        )
    }


    {/* search user  */}
    {
      Search_Open && (<Search_User  onClose = {()=>{Set_Search_Open(false)}}/>)
    }



    </div>
  );
}

export default SideBar;
