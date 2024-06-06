const pool = require('../configs/database');

const handleCreateSignUp = async (req,res) => {
    const {name , email , password} = req.body;

    pool.query('SELECT * from users WHERE users.email = $1 ' , [email], (err,results) => {
        if (err){
            console.log(err);
            return;
        }
        if (results.rows.length != 0 ){
            return  res.status(400).json({
                err: "Email already there, No need to register again.",
                });
        }
        else{
            const  user  = {
                name ,
                email,
                password,
                };

            return res.render("home"); 
        }
    })

}

module.exports = {handleCreateSignUp};