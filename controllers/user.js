const pool = require('../configs/database');
const  bcrypt  =  require("bcrypt");
const  jwt  =  require("jsonwebtoken");

const secret = "Admin@123";

const handleCreateSignUp = async (req,res) => {
    const {name , email , password} = req.body;

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
            bcrypt.hash(password , 10, (err,hash) => {
                if (err) {
                    console.log(err);
                    return;
                }
                const  user = {
                    name: name ,
                    email: email,
                    password: hash,
                    };

                var flag = 1;

                pool.query('INSERT INTO users ( name , email , password ) VALUES ($1 , $2 , $3)' ,  [user.name, user.email, user.password] , (err) => {
                    if (err){
                        flag = 0;
                        console.log(err);
                        return  res.status(500).json({
                            error: "Database error"
                        })        
                    }
                    else{
                        flag = 1;
                        console.log("User Successfully Created");
                        return res.redirect("/login");
                        
                    }
                })
            })
        }
    })

}

const handleUserLogin = async (req,res) =>{
    const { email, password } = req.body;

    pool.query(' SELECT * from users WHERE email = $1 ' , [email], (err,results) => {
        if (err){
            console.log(err);
            return;
        }
        if (results.rows.length === 0) {
            res.redirect("/signup");
            return;
                
        }
        else{
            bcrypt.compare(password , results.rows[0].password , (err,results) =>{
                if (err) {
                    res.status(500).json({
                    error: "Server error",
                    });
                }
                else if(results === true){
                    const token = jwt.sign(
                        {
                            email: email
                        },
                        secret
                    );
                    res.cookie("jwt", token, { expires: new Date(Date.now() + 100000)});
                    return res.redirect("/");
                }
                else {
                    return res.render("login", {
                        error: "Invalid Username or Password",
                      });
                };
            })
        }
    })
}



module.exports = {handleCreateSignUp ,handleUserLogin, secret , };