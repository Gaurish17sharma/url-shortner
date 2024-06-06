const express = require('express');

const router = express.Router();

router.get("/" , (req,res) => {
     res.render('home');
})

router.get("/signup" , (req,res) => {
     return res.render('signUp');
});

module.exports = router;