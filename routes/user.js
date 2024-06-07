const express = require('express');

const router = express.Router();
const {handleCreateSignUp , handleUserLogin} = require('../controllers/user');

router.post('/' , handleCreateSignUp);
router.post('/login' ,handleUserLogin );

module.exports = router;