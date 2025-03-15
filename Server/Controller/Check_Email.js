const {User_Model} = require("../Model/User_Model");

async function Check_Email(req,res){
try {
 
    const {email} = req.body;

    const checkEmail = await User_Model.findOne({email}).select('-password');

    if(!checkEmail){
        return res.status(404).json({
            message:"user not exist",
            error:true
        })
    }

    //if user exist 
    return res.status(200).json({
        message:"email verified",
        success:true,
        data:checkEmail

    })

} catch (error) {
    return res.status(500).json({
        message:error.message || error,
        error:true
    })
}
}

module.exports = {Check_Email}