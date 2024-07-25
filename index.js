const express = require('express');
const pool = require('./configs/database');
const path = require("path");
const cookieParser = require("cookie-parser");

const {handleGetAnalytics} = require('./controllers/url')
const {restrictToLoggedInUserOnly} = require('./middleware/auth');
const app = express();
const port = process.env.PORT;

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

pool.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Database Successfully Connected!!");
    }
})

app.set("view engine" , "ejs" );
app.set("views" , path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/styles', express.static('styles'));

app.use("/" , restrictToLoggedInUserOnly, urlRoute);
app.use("/" , staticRoute);
app.use("/user" , userRoute);

app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

})

