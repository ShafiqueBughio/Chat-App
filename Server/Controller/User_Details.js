
const {Get_user} = require("../Service");
const {User_Model} = require("../Model/User_Model");

async function User_Details(req,res){

try {
    const token =  req.cookies.token;

    const token_data =  Get_user(token);

    const user = await User_Model.findById(token_data.id).select('-password');

    return res.status(200).json({
        message:"user details",
        data:user
    })
}

catch (error) {
    return res.status(500).json({
        message:error.message||error,
        error:true
    })
}
}

module.exports = {User_Details}