// import React, { useState } from 'react';
// import { GrGallery } from "react-icons/gr";
// import { CgColorPicker } from "react-icons/cg";
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import bg_1 from "../assets/bg-1.jpg"
// import bg_2 from "../assets/bg-2.jpg"
// import bg_3 from "../assets/bg-3.jpg"
// import bg_4 from "../assets/bg-4.jpg"
// import bg_5 from "../assets/bg-5.jpg"
// import bg_6 from "../assets/bg-6.jpg"
// import bg_7 from "../assets/bg-7.jpg"
// import bg_8 from "../assets/bg-8.jpg"
// import bg_9 from "../assets/bg-9.jpg"
// import bg_10 from "../assets/bg-10.jpg"
// import bg_11 from "../assets/bg-1.jpg"
// import bg_12 from "../assets/bg-2.jpg"
// import bg_13 from "../assets/bg-3.jpg"
// import bg_14 from "../assets/bg-4.jpg"
// import bg_15 from "../assets/bg-5.jpg"
// import bg_16 from "../assets/bg-6.jpg"
// import bg_17 from "../assets/bg-7.jpg"
// import bg_18 from "../assets/bg-8.jpg"
// import bg_19 from "../assets/bg-9.jpg"
// import bg_20 from "../assets/bg-10.jpg"
// import ChatColors from './ChatColors';
// import { toggle_BgColor, toggleWallpaper } from '../Redux/UserSlice';
// import { toggleChatColor } from '../Redux/UserSlice';


// const Wallpaper = ({darkMode}) => {
//     const images = [bg_1,bg_2,bg_3,bg_4,bg_5,bg_6,bg_7,bg_8,bg_9,bg_10,bg_11,bg_12,bg_13,bg_14,bg_15,bg_16,bg_17,bg_18,bg_19,bg_10]; 

    

//     const [Solid_Color,Set_Solid_Color] = useState(false);

 
    

//     const Colors = [
//         "#3B82F6", "#F87171", "#8B5CF6", "#FFFFFF", "#6366F1",
//     "#A3E635", "#14B8A6", "#6366F1", "#9333EA", "#EC4899",
//     "#F43F5E", "#10B981", "#06B6D4", "#F59E0B", "#D946EF",
//     "#22C55E"
//       ];
      
//     const dispatch = useDispatch();

//     const chatColor = useSelector(state=>state?.user?.chatColor);

//     const wallpaper = useSelector(state=>state?.user?.chatColor);

//     const Handle_Toggle_Solid = ()=>{
//         Set_Solid_Color(!Solid_Color);

//         setTimeout(() => {
//             dispatch(toggleWallpaper())
//         }, 1000);
//     }

//     const HandleChangeColor = async(color)=>{
//         dispatch(toggle_BgColor(color))

//        setTimeout(() => {
//         dispatch(toggleChatColor());
//        }, 1000);
       
//     }
//   return (

    
    
//           <div className="relative flex justify-center">
//             {/* Solid Color Picker (Toggle) */}
//             {Solid_Color && (
//                  <div className='flex justify-center items-center'>
//                     <div className={`absolute z-10 top-40 `}>
//                     <div className={`p-6 rounded-xl shadow-lg w-80 ${darkMode?"bg-gray-500 ":"bg-white"}`}>
//                       <h2 className={`text-lg font-semibold text-center mb-4 ${darkMode ? "text-white":"text-gray-700"}`}>
//                         Pick a Color
//                       </h2>
//                       <div className="flex flex-wrap justify-center items-center gap-4 ">
//                         {Colors.map((color, index) => (
//                           <div
//                             key={index}
//                             className={`w-12 h-12 rounded-full cursor-pointer border-4`}
//                             style={{ backgroundColor: color }}
//                             onClick={()=>HandleChangeColor(color)}
//                           ></div>
//                         ))}
//                       </div>
//                     </div>
//                     {chatColor && 
//                     <div className={`w-fit p-2 absolute top-0 right-0 hover:text-red-600 cursor-pointer ${darkMode?"text-white":"text-gray-800"}`}
//                                       onClick={()=>dispatch(toggleChatColor())}> 
//                                   <IoClose size={25}/>
//                                       </div>
//                   }
//                   </div>
//                   </div>
//             )}

//         {/* Picture  */}
//       <section className={`md:h-[calc(100vh-160px)] h-[calc(100vh-210px)] max-h-screen w-2/3 lg:mx-16 sm:mx-40 my-24 md:my-20 overflow-x-hidden overflow-y-scroll scrollbar absolute z-10 shadow-xl rounded-lg ${darkMode?"bg-gray-600 Scrollbar":"bg-white bg-opacity-70"}`}>

//       <div className='flex flex-col  items-start justify-center gap-4 mx-6 my-4'>
//         {/* Gallery  */}
//         <form className='w-full '>
//             <label className='flex items-center flex-wrap md:gap-8 gap-4   h-14 px-4 hover:bg-slate-200 cursor-pointer rounded'>
//             <div  className='text-purple-500'><GrGallery size={25}/></div>
//             <p className='md:text-lg text-base'>Choose Image</p>
//             </label>
//         </form>

//         {/* solid colors  */}
//         <label className='flex items-center flex-wrap gap-4 md:gap-8  w-full h-14 px-4 hover:bg-slate-200 cursor-pointer rounded' onClick={Handle_Toggle_Solid}>
//         <div  className='text-primary'>
//             <CgColorPicker size={25}/>
//         </div>
//         <p className='md:text-lg text-base'>Set a color</p>
//         </label>

//         {/* show wallpapers images */}

        
//    <div className='flex justify-around gap-3 items-center flex-wrap cursor-pointer hover:'>
//     {
//          images.map((image, index) => (
//             <div key={index} className='w-24 h-32 rounded-xl overflow-hidden transition duration-300 hover:brightness-110'>
//                 <img src={image} alt={`image-${index}`} className="w-full h-full object-cover rounded-xl" />
//             </div>
//         ))
//     }
//    </div>

        
       
//       </div>
  
//       </section>

     
//     </div>
//   );
// }

// export default Wallpaper;
