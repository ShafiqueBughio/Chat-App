const mongoose = require("mongoose");

const User_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Provide name"],
    },
    email:{
        type:String,
        required:[true,"provide email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Provide password"],
    },
    profile_pic:{
        type:String,
        default:"",
    }


},{timestamps:true,}
)

//Model
const User_Model = mongoose.model('user',User_Schema);

module.exports = {User_Model};