const {User_Model} = require("../Model/User_Model")

async function Search_User (req,res){
    try {
    const {search} = req.body;

     //Regular expression used for flexible search ("i": makes the search case sensitive, "g": matches globally across the text)
    const querry = new RegExp(search,"i","g") 
         

    const users = await User_Model.find({
        "$or" : [
            {name: querry},
            {email : querry},
        ]
    }).select("-password")

    return res.json({
        message : "all users",
        data : users,
        success : true,
    })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
        })
    }
}

module.exports = {Search_User}