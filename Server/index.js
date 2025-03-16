const express = require("express");
const cors = require("cors");
const cookie_parser = require("cookie-parser");

require("dotenv").config();
//mongodb connection
const {Connect_MongoDB} = require("./config/MongoDB_Connection")
//import router
const {user_router} = require("./Routes/routes");
const {app,server} = require("./Sockets/index")

// const app = express();

app.use(cors(
    {
        // origin:process.env.FRONTEND_URL,
        origin:"",
        methods: ["POST","GET"],
        credentials:true,//
    }
))

// app.get("/",(req,res)=>{
//   res.send("Hello")
// })
app.use(express.json()); // To handle JSON requests

app.use(cookie_parser());


app.use(user_router);

const PORT = process.env.PORT || 8080;

//MongoDb Connection
Connect_MongoDB().then(()=>{
    console.log("MongoDB Connected");
 
})

server.listen(PORT,()=>{
    console.log(`server started on port :${PORT}`)
})
