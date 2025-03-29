const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Get_User_Details_From_Token } = require("../Helpers/Get_Details_From_Token");
const { User_Model } = require("../Model/User_Model");
const { Conversation_Model } = require("../Model/Conversation_Model");
const { Messages_Model } = require("../Model/Messages_Model");
const GetConversation = require("../Helpers/GetConversation");
const sendEmailNotification = require("../Helpers/emailService")
const mongoose = require("mongoose");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const app = express();

//Socket connection 

const server = http.createServer(app);

const allowedOrigins = [
    "https://chat-app-frontend-silk-phi.vercel.app"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

const io = new Server(server, {
    cors: {
           origin: allowedOrigins,
    methods: ["POST", "GET", "DELETE"],
        credentials: true,
    }
})

//online user (object store unique values only)
const onlineuser = new Set();

io.on("connection", async (socket) => {
    console.log("user connected", socket.id)

    const token = socket.handshake.auth.token;

    const user = await Get_User_Details_From_Token(token);


    //create a room 
    // socket.join(user?._id.toString());
    socket.join(user?._id?.toString());
    onlineuser.add(user?._id?.toString());

    //Array.from() = > method connvert non-array objects into array 
    io.emit('onlineuser', Array.from(onlineuser));

    socket.on('message_page', async (userId) => {

        if (!isValidObjectId(userId)) {
            console.log("Invalid userId:", userId);
            return socket.emit("error", "Invalid userId");
        }

        const userDetails = await User_Model.findById(userId).select('-password');
        if (!userDetails) return socket.emit("error", "User not found");    //error purpose

        const Payload = {
            _id: userDetails?._id,
            name: userDetails?.name,
            email: userDetails?.email,
            profile_pic: userDetails?.profile_pic,
            online: onlineuser.has(userId),
        }

        socket.emit('message_user', Payload);

        //Get previous message 
        const Get_Conversation = await Conversation_Model.findOne({
            "$or": [
                { sender: user?._id, reciver: userId },
                { sender: userId, reciver: user?._id }
            ]
        }).populate('message').sort({ updatedAt: -1 })


        socket.emit('display messages', Get_Conversation?.message || []);

    })

    socket.on('new message', async (data) => {

        if (!isValidObjectId(data.sender) || !isValidObjectId(data.reciever)) {
            return socket.emit("error", "Invalid sender or receiver ID");
        }

        //check conversation is available or not 
        let conversation = await Conversation_Model.findOne({
            "$or": [
                { sender: data?.sender, reciver: data?.reciever },
                { sender: data?.reciever, reciver: data?.sender },
            ]
        })


        if (!conversation) {
            const createConversation = await Conversation_Model({
                sender: data?.sender,
                reciver: data?.reciever
            })

            conversation = await createConversation.save();
        }

        const message = new Messages_Model({

            text: data?.text,
            image_url: data?.imageUrl,
            video_url: data?.videoUrl,
            msgByUserId: data?.msgByUserId, //sender
            status: "sent"
        })

        const SaveMessage = await message.save();

        const Update_Conversation_Message = await Conversation_Model.updateOne({ _id: conversation?._id },
            {
                $push: { message: SaveMessage?._id }
            })

        // If receiver is online, mark as delivered
        if (onlineuser.has(data?.reciever)) {
            await Messages_Model.updateOne(
                { _id: SaveMessage._id },
                { $set: { status: "delivered" } }
            );

            SaveMessage.status = "delivered"; // Update status locally
        }

        //Get Conversation 
        const Get_Conversation = await Conversation_Model.findOne({
            "$or": [
                { sender: data?.sender, reciver: data?.reciever },
                { sender: data?.reciever, reciver: data?.sender }
            ]
        }).populate('message').sort({ updatedAt: -1 })


        io.to(data?.sender).emit('display messages', Get_Conversation?.message || [])
        io.to(data?.reciever).emit('display messages', Get_Conversation?.message || []);

        //Conversation SHow in sidebar
        const conversation_SideBar_Sender = await GetConversation(data?.sender);
        const conversation_SideBar_Reciver = await GetConversation(data?.reciever);

        io.to(data?.sender).emit('conversation', conversation_SideBar_Sender);
        io.to(data?.reciever).emit('conversation', conversation_SideBar_Reciver);

        // **Send Email Notification if the receiver is offline**
        if (!onlineuser.has(data?.reciever)) {
            const receiver = await User_Model.findById(data?.reciever);
            const sender = await User_Model.findById(data?.sender);

            if (receiver && sender) {
                await sendEmailNotification(sender.email, receiver.email, sender.name, data.text, receiver.name);
            }
        }


    })
    // SideBar Message Display 
    socket.on('sidebar', async (currentUserId) => {

        const conversation = await GetConversation(currentUserId);

        socket.emit('conversation', conversation);
    })

    //Set Unseen Messages
    socket.on('seen', async (MsgByUserId) => {
        //find conversation
        let conversation = await Conversation_Model.findOne({
            "$or": [
                { sender: user?._id, reciver: MsgByUserId },
                { sender: MsgByUserId, reciver: user?._id }
            ]
        })

        const ConversationMsg_Id = conversation?.message || [];

        const UpdateMessage = await Messages_Model.updateMany(
            { _id: { "$in": ConversationMsg_Id }, msgByUserId: MsgByUserId },
            { "$set": { seen: true, status: "seen" } }
        )

        // Fetch updated messages
        const Updated_Conversation = await Conversation_Model.findOne({
            "$or": [
                { sender: user?._id, reciver: MsgByUserId },
                { sender: MsgByUserId, reciver: user?._id }
            ]
        }).populate('message').sort({ updatedAt: -1 });

        // Emit updated messages
        io.to(user?._id?.toString()).emit('display messages', Updated_Conversation?.message || []);
        io.to(MsgByUserId).emit('display messages', Updated_Conversation?.message || []);

        //Conversation SHow in sidebar
        const conversation_SideBar_Sender_seen = await GetConversation(user?._id?.toString());
        const conversation_SideBar_Reciver_seen = await GetConversation(MsgByUserId);

        io.to(user?._id?.toString()).emit('conversation', conversation_SideBar_Sender_seen);
        io.to(MsgByUserId).emit('conversation', conversation_SideBar_Reciver_seen);

    })

    //clear chat 
    socket.on('clear', async (MsgByUserId) => {
        const conversation = await Conversation_Model.findOne({
            '$or': [
                { sender: user?._id, reciver: MsgByUserId }
                , { sender: MsgByUserId, reciver: user?._id }
            ]
        })

        if (!conversation) return;

        //deltete conversation 
        const clearConversation = await Messages_Model.deleteMany({ _id: { "$in": conversation?.message } })

        //update both user conversation list 
        const SenderConversation = await GetConversation(user?._id?.toString());
        const ReciverConversation = await GetConversation(MsgByUserId);

        io.to(user?._id?.toString()).emit('conversation', SenderConversation);
        io.to(MsgByUserId).emit('conversation', ReciverConversation);
    })

    //disconnect
    socket.on("disconnect", () => {
        onlineuser.delete(user?._id)
        console.log("user disconnected", socket.id)
    })

    //typing indicator
    socket.on('typing', (userId) => {
        if (!userId) {
            console.log("User ID is undefined when emitting typing event");
            return;
        }
        socket.broadcast.emit("userTyping", userId);

    })

    socket.on("stopTyping", (userId) => {
        socket.broadcast.emit("stopTyping", userId);
    });
})

module.exports = {
    app,
    server
}
