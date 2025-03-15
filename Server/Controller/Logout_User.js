

async function Logout_user(req,res){
    
  try {
    const cookieoptions = {
        http:true,
        secure:true
    }

    return res.cookie('token',"",cookieoptions).status(200).json({
        message:"Session out",
        success:true,

    })
  } catch (error) {
    return res.status(500).json({
        message:error.message || error,
        error:true

    })
  }
}

module.exports = {Logout_user}