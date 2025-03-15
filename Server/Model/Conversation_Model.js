const moongose = require("mongoose");

const Conversation_Scheema = new moongose.Schema({
    sender:{
        type:moongose.Schema.ObjectId,
        required:true,
        ref:"user"
    },
    reciver:{
        type:moongose.Schema.ObjectId,
        required:true,
        ref:"user",
    },
    message:[
        {
            type:moongose.Schema.ObjectId,
            ref:"Message",
        }
    ]
},{
    timestamps:true,
})

const Conversation_Model = moongose.model('conversation',Conversation_Scheema);

module.exports = {Conversation_Model};