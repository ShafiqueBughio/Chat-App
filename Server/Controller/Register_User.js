const {User_Model} = require("../Model/User_Model")
const bcryptjs = require("bcryptjs");
const {Set_User} = require("../Service")

//register user function 
async function Register_User(req,res){
try {
   
    const {name,email,password,profile_pic} = req.body;

//check is user available with this email or not ?
const check_user = await User_Model.findOne({email});

//if user available
if(check_user){
    return(
        res.status(400).json({
            message:"user already exist",
            error:true
        })
    )
}

//if user is not available so create a user 

//convert password into hash password
const salt = await bcryptjs.genSalt(10);
const hash_password = await bcryptjs.hash(password,salt);

const payload = {
    name,
    email,
    profile_pic,
    password:hash_password,
}

const user = new User_Model(payload);
const user_save = await user.save();

const token = Set_User(user_save);

   return res.status(201).json({
        messsage:"user created successfully",
        data:user_save,
        success:true,
    })


}
 catch (error) {
   return res.status(500)
   .json({
    message:error.message||error,
    error:true,
   })
}
}

module.exports = {Register_User};