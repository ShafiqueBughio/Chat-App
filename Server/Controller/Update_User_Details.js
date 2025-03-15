const {Get_user} = require("../Service")
const {User_Model} = require("../Model/User_Model")

async function Update_user_details(req,res){
try {
  
    const token = req.cookies.token;

    const token_data = Get_user(token);     //id,email

    const user = await User_Model.findById(token_data.id);

    const {name,profile_pic} = req.body;

    const update_user = await User_Model.updateOne({_id:user._id},{name,profile_pic});

    const user_information = await User_Model.findById(user._id);

    return res.status(200).json({
        message:"user updated succesfully",
        data:user_information,
        success:true,
    })  
}
 catch (error) {
    return res.status(500).json({
        message:error.message||error,
        error:true
    })
}
}

module.exports = {Update_user_details}