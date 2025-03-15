const { Conversation_Model } = require("../Model/Conversation_Model");

const GetConversation = async(currentUserId)=>{
    if(currentUserId){
        const currentUserConversation = await Conversation_Model.find({
            '$or':[
                {sender:currentUserId},
                {reciver:currentUserId}
            ]
        }).sort({updatedAt : -1}).populate('message').populate('sender').populate('reciver');

        const conversation = currentUserConversation.map((conversation)=>{

            const countUnseenMsg = conversation?.message?.reduce((prev,curr)=>{
                
              
                const MsgByuser_Id = curr?.msgByUserId?.toString();

                if( MsgByuser_Id !== currentUserId){
                    return prev + (curr?.seen ? 0 : 1)
                }
                else{
                    return prev;
                }

            },0);

            return{
                _id : conversation._id,
                sender : conversation?.sender,
                reciver : conversation?.reciver,
                UnseenMsg : countUnseenMsg,
                lastmsg : conversation.message[conversation.message.length - 1]
            }
        })

        return conversation
    } 
    else{
        return [];
    }
}

module.exports = GetConversation