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

                pool.query('INSERT INTO user ( name , email , password ) VALUES ($1 , $2 , $3)' ,  [user.name, user.email, user.password] , (err) => {
                    if (err){
                        flag = 0;
                        console.log(err);
                        return  res.status(500).json({
                            error: "Database error"
                        })        
                    }
                    else{
                        flag = 1;
                        res.status(200).send({ message: 'User added to database' });
                        console.log("User Successfully Created");
                    }
                })

                if (flag) {
                    const token = jwt.sign(
                        {
                            email: user.email
                        },
                        secret               
                );
                };
            })
        }
    })

}

module.exports = {handleCreateSignUp};