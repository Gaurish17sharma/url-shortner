const pool = require('../configs/database');

const handleCreateSignUp = async (req,res) => {
    const {name , email , password} = req.body;
    const  user = {
        name ,
        email,
        password,
        };

    pool.query(' SELECT * from users WHERE email = $1 ' , [email], (err,results) => {
        console.log("a");
        if (err){
            console.log(err);
            return;
        }
        console.log("a");
        if (results.rows.length != 0 ){
            return  res.status(400).json({
                err: "Email already there, No need to register again.",
                });
        }
        else{
            return res.json({
                message: "User successfully created",
            user,});
        }
    })

}

const handleCreatelogin = (req,res) =>{
    const { email , password} = req.body;

}

module.exports = {handleCreateSignUp};