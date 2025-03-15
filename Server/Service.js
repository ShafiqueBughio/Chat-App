//import dotenv to load environment variables
require('dotenv').config();

const jwt = require("jsonwebtoken");
const Secret_Key = process.env.JWT_SECRET;

//Setuser Function - create token
function Set_User(user){
   return jwt.sign({
        id:user._id,
        email:user.email,
    },Secret_Key,{expiresIn:'1d'})
    
}

//return user id
function Get_user(token){
   if(!token){
      return res.json({
         message:"Session out",
         logout:true
      })
   }
   return jwt.verify(token,Secret_Key);
}

module.exports = {Set_User,Get_user};