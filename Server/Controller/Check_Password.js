const {User_Model} = require("../Model/User_Model");
const bcryptjs = require("bcryptjs");
const {Set_User,Get_user} = require("../Service");

//Logi function
async function Check_Password(req,res){
try {
    const {password,userId} = req.body;

    //check is user exist with this email or not ?
    const user = await User_Model.findById(userId);

    if(user){
        const check_password = await bcryptjs.compare(password,user.password);

        if(check_password){
            //create a token 
            const token = Set_User(user);

            const cookieoptions = {
                http:true,
                secure:true,
            }

            res.cookie('token',token,cookieoptions).status(200).json({
                message:"Login successfully",
                token:token,
                success:true,

            })
        }
        else{
            res.status(400).json({
                message:"Kindly Enter correct password",
                error:true,
            })
        }
    }
    else{
        res.status(404).json({
            message:"user not found with this UserId",
            error:true,
        })
    }



} catch (error) {
    return res.status(500).json({
        message:error.message||error,
        error:true,
    })
}
}

module.exports = {Check_Password};