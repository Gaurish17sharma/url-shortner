const  jwt  =  require("jsonwebtoken");
const {secret} = require('../controllers/user');

async function restrictToLoggedInUserOnly(req,res,next) {
    console.log(req.cookie);
    const userId = req.cookies?.jwt;

    if (!userId){
        return res.redirect("/login");
    }
    
    const user = jwt.verify(userId , secret)
    
          req.user = user ;
          next();

}

module.exports = {restrictToLoggedInUserOnly};