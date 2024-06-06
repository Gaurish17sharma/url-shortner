const express = require('express');
const pool = require('./configs/database');
const path = require("path");

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const {handleGetAnalytics} = require('./controllers/url')
const app = express();
const port = 3000;

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
app.use('/styles', express.static('styles'));

app.get('/:shorturl' , handleGetAnalytics);

app.use("/url" , urlRoute);
app.use("/" , staticRoute);

app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

})

