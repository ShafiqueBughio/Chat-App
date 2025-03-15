import React, { useEffect } from 'react';
import { IoMdImages } from "react-icons/io";
import { IoIosColorPalette } from "react-icons/io";
import { useState } from 'react';
import UploadFile from '../Helpers/UploadFile';
import { IoCloudyNight } from "react-icons/io5";
import { MdOutlineLightMode } from "react-icons/md";
import {toggleTheme} from "../Redux/UserSlice"
import { MdDeleteForever } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux';  //useSelector : use to selct state item from redux store, useDispatch : Dispatch action
import { toggleChatColor } from '../Redux/UserSlice';
import { toggleChatOption } from '../Redux/UserSlice';
import { toggleClearChat } from '../Redux/UserSlice';


const ChatOptions = ({chatColorsState}) => {

    const dispatch = useDispatch();

    const darkMode = useSelector(state=> state?.user?.darkMode);

    const selectedColor = useSelector(state=> state?.user?.selectedColor);

    const [UploadWallpaper,SetUpload_Wallpaper] = useState({
            wallpaperUrl:""
          })
    
    const HandleUploadWallpaper = async(e)=>{
        const file = e.target.files[0];
        
        // SetLoading(true);
        //upload on cloudinary
        const uploadPhoto = await UploadFile(file);
        // Set_OpenImage_Video_Upload(false);
        // SetLoading(false);
   

        SetMessage((prev)=>{
          return {
            ...prev,
            wallpaperUrl:uploadPhoto?.url
          }
        })
        
      }

      useEffect(()=>{
        dispatch(toggleChatOption())
      },[darkMode,chatColorsState])

      const HandleClearChat = ()=>{
        dispatch(toggleClearChat());
        dispatch(toggleChatOption());
      }

  return (
    <div>
         <div className={` bg-opacity-100 absolute z-10 shadow rounded w-36 p-2 top-[66px] right-3 ${darkMode ? "bg-gray-600 text-white ":"bg-white"}`}>
                
                    {/* Image */}
                    {/* <div className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer ${darkMode?"hover:bg-gray-500 hover:text-gray-800":""}`}>
                      <div className='text-primary'>
                        <IoMdImages size={18}/>
                      </div>
                      <p>Wallpaper</p>
                    </div> */}
                  

                    <div>
                    {/* chatColors */}
                    <div className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer ${darkMode?"hover:bg-gray-500 hover:text-gray-800":""}`} onClick={()=>dispatch(toggleChatColor())}>
                      <div style={{color: selectedColor?selectedColor:"#9333EA"}}>
                        <IoIosColorPalette size={18}/>
                      </div>
                      <p>Chat color</p>
                    </div>

                    {/* Modes */}
                    <div className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer ${darkMode?"hover:bg-gray-500 hover:text-gray-800":""}`} onClick={()=>dispatch(toggleTheme())}>
                      <div className={`${darkMode ? "text-yellow-400": "text-secondary"}`}>
                        {
                            darkMode?<IoCloudyNight size={18}/>: <MdOutlineLightMode size={18}/>
                        }
                      </div>
                      <p>{darkMode?"Night":"Light"}</p>
                    </div>

                    {/* Clear Chat  */}
                    <div className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer ${darkMode?"hover:bg-gray-500 hover:text-gray-800":""}`} onClick={HandleClearChat}>
                      <div className={` ${darkMode ? "text-red-500":"text-red-500"}`}>
                        <MdDeleteForever size={18}/>
                      </div>
                      <p>Clear chat</p>
                    </div>
                    </div>
      
                  <input type="file" id='uploadImage' onChange={HandleUploadWallpaper} className='hidden'/>
                </div>   
    </div>
  );
}

export default ChatOptions;
