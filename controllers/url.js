const shortid = require('shortid');
const pool = require('../configs/database');

const handleGenerateNewShortUrl = async (req, res) => {
    console.log(req.body);
    const fullurl = req.body.fullurl;
    console.log("123");
    console.log(fullurl);

    if (!fullurl) {
        return res.status(400).json({ error: "url is required" });
    }

    pool.query('SELECT * FROM url WHERE fullurl = ?', [fullurl], (error, results) => {
        if (error) {
            console.log("we got error");
            return;
            
        }

        if (results.length === 0){
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

            res.render("result.ejs", { shorturl: shorturl, count: 1 });
        }
        else{
            const short_url = results[0].shorturl;
            const counts = results[0].count;

            pool.query('UPDATE `url` SET counts = ? WHERE short_url = ?', [counts + 1 , short_url] , (err,res) => {
                if (err) {
                    console.log("Error updating table");
                    return;
                }
            })
            res.render("result.ejs", {shorturl: short_url , count : counts + 1});
        }

    })
}

module.exports = {
    handleGenerateNewShortUrl,
};
