const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// MongoDB connection
const { Connect_MongoDB } = require("./config/MongoDB_Connection");

// Import router
const { user_router } = require("./Routes/routes");
const { app, server } = require("./Sockets/index");

// ✅ Apply CORS Middleware Before Everything Else
app.use(cors({
    origin: "https://chat-app-frontend-eta-flax.vercel.app",
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
}));

// ✅ Explicitly Allow CORS Headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://chat-app-frontend-eta-flax.vercel.app");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// ✅ Handle Preflight Requests (OPTIONS)
app.options("*", cors());

// ✅ Enable JSON and Cookie Parsing
app.use(express.json());
app.use(cookieParser());

// ✅ Apply Routes
app.use(user_router);

// ✅ MongoDB Connection
Connect_MongoDB().then(() => {
    console.log("✅ MongoDB Connected");
}).catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
});

// ✅ Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`🚀 Server started on port: ${PORT}`);
});
