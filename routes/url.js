const express = require('express');

const router = express.Router();

const {handleGenerateNewShortUrl, handleGetAnalytics} = require('../controllers/url');

router.post('/', handleGenerateNewShortUrl);
router.get('/:shorturl' , handleGetAnalytics);


module.exports = router;