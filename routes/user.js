const express = require('express');

const router = express.Router();
const {handleCreateSignUp} = require('../controllers/user');

router.post('/' , handleCreateSignUp);

module.exports = router;