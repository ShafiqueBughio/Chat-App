import React from 'react';
import { PiUserCircle } from "react-icons/pi";
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';

const Avater = ({ userId, name, imageUrl, width , height }) => {

  const onlineUser = useSelector(state=>state?.user?.onlineUser);

   //avater color 
   const [avater_color,set_avater_color] = useState("");

   const colors = ["bg-green-200","bg-red-400","bg-orange-300","bg-amber-300","bg-lime-300","bg-emerald-300"];
   
   useEffect(()=>{
     const random_num = Math.floor(Math.random()*colors.length);
     set_avater_color(colors[random_num]);
   },[])
     

    //name = "shafique bughio"
    let avater_name = "";

    if(name){
         const split_name = name.split(" ");            //split_name = ["shafique","bughio"]

        if(split_name.length>1){
            avater_name = split_name[0][0]+split_name[1][0];
        }
        else{
            avater_name = split_name[0][0];
        }
    }


   //check is user online?
   const isOnline = onlineUser.includes(userId);
  
   
  return (
    <div className={`text-slate-800  rounded-full  text-xl font-bold relative `}style={{ width:width+"px", height:height+"px" }}>
      {imageUrl ? (
        <img
          src={imageUrl}
          width={width}
          height={height}
          alt={name}
          className="w-full h-full object-cover rounded-full" 
        />
      ) : name ? (
        <div className={`overflow-hidden rounded-full flex justify-center items-center text-lg ${avater_color} `} style={{ width:width+"px", height:height+"px" }}>
          {avater_name}
        </div>
      ) : (
        <PiUserCircle size={width} />
      )}

      {
        isOnline && <div className='bg-green-600 p-1 absolute rounded-full bottom-8 -right-1 z-10' ></div>
      }
    </div>
  );
};

export default Avater;
