const express = require('express');
const pool = require('./configs/database');

const urlRoute = require('./routes/url');
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

app.use("/url" , urlRoute);

app.listen(port, () => {

    console.log(`Here we go, Engines started at ${port}.`);

})

