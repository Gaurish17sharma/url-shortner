const shortid = require('shortid');
const pool = require('../configs/database');

const handleGenerateNewShortUrl = (req, res) => {
    const body = req.body;
    const fullurl = body.fullurl;

    if (!fullurl) {
        return res.status(400).send({ error: "url is required" });

    }
    
    pool.query('SELECT * FROM `url` WHERE `fullurl` = ?', [fullurl], (error, results) => {
        if (error) {
            console.log("we got error");
            return;
        }

        if (results.length == 0){
            const shorturl = shortid.generate();
            const url = {
                fullurl: fullurl,
                shorturl: shorturl,
                count : 1
            };
            pool.query('INSERT INTO `url` SET ?', url , (err,res) => {
                if (err) {
                    console.log("Error creating table");
                    return;
                }
            })

            return res.send({shorturl : shorturl , count: 1});
        }

    })
}

module.exports = {
    handleGenerateNewShortUrl,
};
