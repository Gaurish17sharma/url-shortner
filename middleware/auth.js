const  jwt  =  require("jsonwebtoken");
const {secret} = require('../controllers/user');

async function restrictToLoggedInUserOnly(req,res,next) {
    console.log(req.cookie);
    const {userId} = req.cookie.jwt;

    if (!userId){
        return res.redirect("/login");
    }
    
    const user = jwt.verify(userId , secret , (err) => {
        if(err){
            console.log(err);
            return;
          }

          req.user = user ;
          next();

    }) 
}

module.exports = {restrictToLoggedInUserOnly};