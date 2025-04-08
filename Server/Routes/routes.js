const express = require("express");
const {Register_User} = require("../Controller/Register_User")
const {Check_Password} = require("../Controller/Check_Password")
const { User_Details } = require("../Controller/User_Details");
const { Logout_user } = require("../Controller/Logout_User");
const { Update_user_details } = require("../Controller/Update_User_Details");
const { Check_Email } = require("../Controller/Check_Email");
const {Search_User} = require("../Controller/Search_User")



const user_router = express.Router();

user_router.get("/",(req,res)=>{res.json("Hello")})

user_router.post('/email',Check_Email);

user_router.post('/register',Register_User);

user_router.post('/password',Check_Password);

user_router.get('/userDetails',User_Details);

user_router.get('/logout',Logout_user);

user_router.post("/updateUser",Update_user_details);

user_router.post("/searchUser",Search_User);





module.exports = {user_router};
