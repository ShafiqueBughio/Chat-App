import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Avater from './Avater';
import { HiDotsVertical } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import MessagePage_SendMessage from './MessagePage_SendMessage';
import BackgroundImage from "../assets/wallapaper.jpeg"
import ChatOptions from './ChatOptions';
import ChatColors from './ChatColors';
import { toggleChatOption } from '../Redux/UserSlice';
import { useDispatch } from 'react-redux';
import ClearChat from './ClearChat';
import { addTypingUser,removeTypingUser } from '../Redux/UserSlice';
// import Wallpaper from './Wallpaper';





const Message_Page = () => {

  const [UserData,SetUserData] = useState({
    name:"",
    email:"",
    profile_pic : "",
    _id:"",
    online : false
  })

  const[allMessages,SetallMessages] = useState([]);

  const [openOptions,SetOpenOptions] = useState(false);

  const [typing,SetTyping] = useState(false);

  // const [typingUser, setTypingUser] = useState("");

  const dispatch = useDispatch();

  const params = useParams();
  
  const userId = params.userid;
  
  const socketConnection = useSelector(state=>state?.user?.socketConnection);

  const darkMode = useSelector(state=> state?.user?.darkMode);

  const user = useSelector(state=>state?.user);

   const chatColorsState = useSelector(state=>state?.user?.chatColor);

   const chatOption = useSelector(state=>state?.user?.chatOption)

   const clearChat  = useSelector(state=>state?.user?.clearChat)

   const ClearChat_Choice = useSelector(state=>state?.user?.ClearChat_Choice);

   const Typing = useSelector(state=>state?.user?.typing);


  useEffect(()=>{
    if(socketConnection){
      socketConnection.emit('message_page',userId);

      socketConnection.emit('seen',userId);

      socketConnection.on('message_user',(userDetails)=>{
        SetUserData(userDetails);
      })

      socketConnection.on('display messages',(data)=>{
       SetallMessages(data); 
      })

      if(ClearChat_Choice){
        socketConnection.emit('clear',userId);
      }
      socketConnection.on("userTyping", (typingUserId) => {
        if (typingUserId !== user?._id) { // ✅ Exclude current user
          dispatch(addTypingUser(typingUserId));
        }
      });
    
      socketConnection.on("stopTyping", (typingUserId) => {
       dispatch(removeTypingUser(typingUserId))
      });
    
      return () => {
        socketConnection.off("userTyping");
        socketConnection.off("stopTyping");
      };
    }
  },[socketConnection,userId,user])


  return (
    <>
      {/* wallpaper  */}
      {/* {
      wallpaper && <Wallpaper darkMode={darkMode}/>
    } */}
    {/* chatOptions Page */}
    {
            chatOption && <ChatOptions chatColorsState = {chatColorsState}/>
          }
    
    {/* chatColors  */}
    {
      chatColorsState && <ChatColors chatColorsState={chatColorsState}/>
    }
    {/* clear Chat  */}
    {
      clearChat && <ClearChat darkMode = {darkMode}/> 
    }
  
    <div style={{backgroundImage: darkMode?"":`url(${BackgroundImage})`}} className='bg-no-repeat bg-cover'>
      <header className={`sticky h-16 top-0 flex justify-between items-center px-4 ${darkMode ? "bg-gray-800 text-white":"bg-white "}`}>
      <div className='flex items-center gap-4'>
        <Link to='/' className={`lg:hidden hover:text-primary ${darkMode && "hover:text-blue-500"}`}>
        <IoIosArrowBack size={25}/>
        </Link>
        <div>
          <Avater
          width={50}
          height={50}
          imageUrl={UserData?.profile_pic}
          name={UserData?.name}
          userId = {UserData?._id}
          />
        </div>

        <div>
          <h3 className='font-semibold text-lg my-0 text-ellipsis line-clamp-1'>{UserData?.name}</h3>

          <p className='-my-2 text-sm'>
            {UserData.online ? Typing.length>0 ? <span className='text-primary'>Typing...</span>:<span className='text-primary'>Online</span>
            :<span className='text-slate-400'>offline</span>}
          </p>
        </div>
      </div>

      <div>
        <button className={`cursor-pointer hover:text-primary ${darkMode &&"hover:text-blue-500"}`} onClick={()=>dispatch(toggleChatOption())}>
          <HiDotsVertical/>
        </button>
      </div>
      </header>

      {/* Show all messages here */}
    <MessagePage_SendMessage openOptions = {openOptions} socketConnection = {socketConnection} userId = {userId} user= {user} allMessages = {allMessages} darkMode = {darkMode} typing={typing} SetTyping = {SetTyping}/>

  
 
    </div>
    </>
  );
}

export default Message_Page;
