import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../Redux/UserSlice';
import { toggleChatColor } from '../Redux/UserSlice';
import { IoClose } from 'react-icons/io5';

const ChatColors = ({chatColorsState}) => {
   
    const Colors = [
        "#3B82F6", "#F87171", "#8B5CF6", "#FFFFFF", "#6366F1",
    "#A3E635", "#14B8A6", "#6366F1", "#9333EA", "#EC4899",
    "#F43F5E", "#10B981", "#06B6D4", "#F59E0B", "#D946EF",
    "#22C55E"
      ];
      
    const dispatch = useDispatch();

    const darkMode = useSelector(state=>state?.user?.darkMode);

    const HandleChangeColor = async(color)=>{
        dispatch(changeColor(color))

       setTimeout(() => {
        dispatch(toggleChatColor());
       }, 1000);
       
    }
    
  return (
    
    <div className='flex justify-center items-center'>
    <div className={`absolute z-10 top-40 `}>
    <div className={`p-6 rounded-xl shadow-lg w-80 ${darkMode?"bg-gray-500 ":"bg-white"}`}>
      <h2 className={`text-lg font-semibold text-center mb-4 ${darkMode ? "text-white":"text-gray-700"}`}>
        Pick a Color
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4 ">
        {Colors.map((color, index) => (
          <div
            key={index}
            className={`w-12 h-12 rounded-full cursor-pointer border-4`}
            style={{ backgroundColor: color }}
            onClick={()=>HandleChangeColor(color)}
          ></div>
        ))}
      </div>
    </div>
    {chatColorsState && 
    <div className={`w-fit p-2 absolute top-0 right-0 hover:text-red-600 cursor-pointer ${darkMode?"text-white":"text-gray-800"}`}
                      onClick={()=>dispatch(toggleChatColor())}> 
                  <IoClose size={25}/>
                      </div>
  }
  </div>
  </div>
  );
}

export default ChatColors;
