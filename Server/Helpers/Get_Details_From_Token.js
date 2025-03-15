
const {User_Model} = require("../Model/User_Model");
const {Get_user} = require("../Service")

const Get_User_Details_From_Token = async(token)=>{

try {
    if(!token){
        return{
            message:"Session out",
            logout:true,
        }
    }

    const decode = await Get_user(token);

    const user = await User_Model.findById(decode.id).select('-password');

    return user;
}

catch (error) {
    return ({
        message:error.message||error,
        error:true,
    })
}
}

module.exports = {Get_User_Details_From_Token}