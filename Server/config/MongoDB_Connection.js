const mongoose = require("mongoose");

// Function to connect MongoDB
async function Connect_MongoDB() {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB successfully!");

        // Handle connection errors after successful connection
        mongoose.connection.on("error", (error) => {
            console.error("❌ MongoDB Connection Error:", error);
        });

    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Stop the server if DB connection fails
    }
}

module.exports = { Connect_MongoDB };
