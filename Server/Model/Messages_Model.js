const mongoose = require("mongoose");

const Messages_Schema  = new mongoose.Schema({
    text:{
        type:String,
        default:"",
    },
    image_url:{
        type:String,
        default:"",
    },
    video_url:{
        type:String,
        default:"",
    },
    msgByUserId:{//sender id
       type:mongoose.Schema.ObjectId,
              required:true,
              ref:"user",
    },
    seen:{
        type:Boolean,
        default:false,
    },
    status:{ 
        type: String, 
        enum: ["sent", "delivered", "seen"],
         default: "sent" 
        }

},{
    timestamps:true,
})

//model
const Messages_Model = mongoose.model('Message',Messages_Schema);

module.exports = {Messages_Model};