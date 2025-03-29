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
       origin: ["https://chat-app-frontend-silk-phi.vercel.app"], // Allow both local and deployed frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
    }
))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://chat-app-frontend-silk-phi.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    
    next();
});

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
