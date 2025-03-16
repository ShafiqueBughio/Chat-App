import React from 'react';
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import UploadFile from '../Helpers/UploadFile';
import { useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import Loading_Spinner from './Loading_Spinner';
import { IoMdSend } from "react-icons/io";
import moment from "moment"
import { useRef } from 'react';
import ChatOptions from './ChatOptions';
import { useSelector } from 'react-redux';
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";

const MessagePage_SendMessage = ({ socketConnection, userId, user, allMessages, openOptions, darkMode }) => {



  const [OpenImage_Video_Upload, Set_OpenImage_Video_Upload] = useState(false);

  const [message, SetMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })

  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiClick = (emojiObject) => {
    //if emoji otherwise its image url 
    const emojiToUse = emojiObject.emoji || `<img src="${emojiObject.imageUrl}" width="20" style="display: inline-block; vertical-align: middle;" />`;
    SetMessage((prev) => {
      return {
        ...prev,
        text: prev.text + emojiToUse
      }
    }); // Add emoji to the message
    setShowPicker(false); // Close picker after selection
  };

  const [loading, SetLoading] = useState(false);

  const CurrentMsg_Ref = useRef(null);

  const selectedColor = useSelector(state => state?.user?.selectedColor);

  const Handle_OpenImage_Video_Upload = () => {
    Set_OpenImage_Video_Upload(preve => !preve);
  }

  const HandleUploadImage = async (e) => {
    const file = e.target.files[0];

    SetLoading(true);
    //upload on cloudinary
    const uploadPhoto = await UploadFile(file);
    Set_OpenImage_Video_Upload(false);
    SetLoading(false);


    SetMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadPhoto?.url
      }
    })

  }

  const HandleUploadVideo = async (e) => {
    const file = e.target.files[0];

    SetLoading(true);
    //upload on cloudinary
    const uploadVideo = await UploadFile(file);
    Set_OpenImage_Video_Upload(false);
    SetLoading(false);

    SetMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadVideo?.url
      }
    })


  }
  const Handle_CloseImageUpload = () => {
    SetMessage((prev) => {
      return {
        ...prev,
        imageUrl: ""
      }
    })
  }

  const Handle_CloseVideoUpload = () => {
    SetMessage((prev) => {
      return {
        ...prev,
        videoUrl: ""
      }
    })
  }

  const Handle_typedMessage = (e) => {
    const { name, value } = e.target;

    SetMessage(prev => {
      return {
        ...prev,
        text: value
      }
    })

  }

  const Handle_SubmtButton = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', ({
          sender: user?._id,
          reciever: userId,
          text: message?.text,
          imageUrl: message?.imageUrl,
          videoUrl: message?.videoUrl,
          msgByUserId: user?._id,     //sender
        }))
      }

    }

    SetMessage((prev) => {
      return {
        ...prev,
        text: "",
        imageUrl: "",
        videoUrl: ""
      }
    })
  }

  useEffect(() => {
    if (CurrentMsg_Ref.current) {
      CurrentMsg_Ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessages])



  return (
    <>
      <div>
        {/* Show message */}
        <section className={`h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative  ${darkMode ? "bg-gray-700 Scrollbar" : "bg-slate-200 bg-opacity-50"}`}>


          {/* Show all messages here */}
          <div ref={CurrentMsg_Ref} className='flex flex-col gap-2 py-2 mx-2'>
            {allMessages &&
              allMessages.map((msg, index) => {
                return (
                  <div className={`p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md  ${user?._id === msg.msgByUserId ? darkMode ? `ml-auto bg-purple-500 text-white` : "ml-auto bg-purple-500" : darkMode ? "text-white bg-gray-500" : "bg-white"}`}
                    style={{ backgroundColor: (user?._id === msg.msgByUserId) && selectedColor }}
                  >
                    {/* image  */}
                    <div className='w-full'>
                      {
                        msg.image_url &&
                        <img src={msg.image_url} className='w-full h-full object-scale-down' />
                      }
                      {/* video  */}
                      {
                        msg?.video_url &&
                        <video
                          src={msg?.video_url}
                          className='w-full h-full object-scale-down'
                          controls

                        />
                      }
                    </div>
                    <p className='px-2'>{msg.text}</p>
                    <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                  </div>
                )
              })
            }
          </div>
          {/* Upload Image Display */}
          {
            message?.imageUrl && (

              <div className='w-full h-full bg-slate-700 sticky bottom-0  bg-opacity-30 flex justify-center items-center overflow-hidden rounded '>

                {/* close button */}
                <div className={`w-fit p-2 absolute top-0 right-0 hover:text-red-600 cursor-pointer ${darkMode ? "text-white" : "text-gray-800"}`}
                  onClick={Handle_CloseImageUpload}>
                  <IoClose size={25} />
                </div>

                <div className='bg-white p-3'>
                  <img src={message?.imageUrl} alt="uploadImage" className='aspect-square w-full h-full max-w-sm m-2 object-scale-down' />
                </div>

              </div>
            )

          }

          {/* Upload Video Display */}
          {
            message?.videoUrl && (

              <div className='w-full h-full bg-slate-700 sticky bottom-0 bg-opacity-30 flex justify-center items-center overflow-hidden rounded '>

                {/* close button */}
                <div className='w-fit p-2 absolute top-0 right-0 hover:text-red-600 cursor-pointer'
                  onClick={Handle_CloseVideoUpload}>
                  <IoClose size={25} />
                </div>

                <div className='bg-white p-3'>
                  <video
                    src={message?.videoUrl}
                    className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                    controls
                    autoPlay
                    muted
                  />
                </div>

              </div>
            )

          }

          {/* Loading  */}
          {
            loading && (
              <div className='w-full h-full sticky bottom-0 flex justify-center items-center'>
                <Loading_Spinner />
              </div>
            )
          }
        </section>

        {/* Send Messages */}
        <section className={`h-16 flex items-center px-4 ${darkMode ? "bg-gray-600" : "bg-white"}`}>
          {/* upload Image and video */}
          <div className='relative'>
            <button onClick={Handle_OpenImage_Video_Upload} className={`flex justify-center items-center w-11 h-11 rounded-full hover:transition duration-300 cursor-pointer ${darkMode ? "text-white hover:bg-blue-500 hover:text-white " : "hover:bg-primary hover:text-white"}`}>
              <FaPlus size={20} />
            </button>

            {/* Video and Image */}
            {
              OpenImage_Video_Upload &&
              <div className={`${darkMode ? "bg-gray-500 text-white" : "bg-white"} shadow rounded absolute bottom-14 w-36 p-2`}>
                <form>
                  {/* Image */}
                  <label htmlFor="uploadImage" className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer ${darkMode ? "hover:bg-gray-600" : ""} `}>
                    <div className='text-primary'>
                      <FaImage size={18} />
                    </div>
                    <p>Image</p>
                  </label>

                  {/* Video */}
                  <label htmlFor="uploadVideo" className={`flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer  ${darkMode ? "hover:bg-gray-600" : ""}`}>
                    <div className='text-purple-500'>
                      <FaVideo size={18} />
                    </div>
                    <p>Video</p>
                  </label>
                </form>

                <input type="file" id='uploadImage' onChange={HandleUploadImage} className='hidden' />

                <input type="file" id='uploadVideo' onChange={HandleUploadVideo} className='hidden' />
              </div>
            }

          </div>

          {/* Type message */}
          <form className='h-full w-full flex gap-2' onSubmit={Handle_SubmtButton}>
            <input
              type="text"
              placeholder='Message...'
              className={`py-1 px-4 outline-none w-full h-ful font-sans ${darkMode && "bg-gray-600 text-white"}`}
              value={message.text}
              onChange={Handle_typedMessage}
            />
            <div onClick={() => setShowPicker(!showPicker)} className="text-yellow-500 hover:text-yellow-600 my-4 cursor-pointer" >
              <RiEmojiStickerLine size={30} />
            </div>
            <button type='submit' className={`${darkMode ? "text-blue-400 hover:text-blue-600" : "text-white bg-purple-500"}  w-12 flex items-center justify-center h-3/4 my-2 rounded  transition duration-300 ease-in-out 
            hover:scale-105 active:scale-90`}>
              <IoMdSend size={25} />
            </button>
          </form>
          {showPicker && (
            <div
              className={`absolute bottom-16 right-4 z-50 rounded-lg shadow-lg ${darkMode ? "bg-gray-500" : "bg-slate-200"
                }  max-h-[500px] `}
            >
              <div className="p-2 rounded-lg">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            </div>
          )}

        </section>
      </div>
    </>
  );
}

export default MessagePage_SendMessage;
