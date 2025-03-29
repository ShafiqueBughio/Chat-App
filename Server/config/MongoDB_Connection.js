const mongoose = require("mongoose");

//function
async function Connect_MongoDB(){
   try {
    await mongoose.connect(process.env.MONGO_URL)

    const connection = mongoose.connection      //tell status of connection

    //if connected
    connection.on('connected',()=>{
        console.log("connect to DB");
    })

    //else not connected
    connection.on('error',(error)=>{
        console.log("Something is wrong in mongoDb",error);
    })

   } catch (error) {
    console.log("Something is wrong ",error);
   }
}

module.exports = {Connect_MongoDB};