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

    pool.query('SELECT * FROM url WHERE url.fullurl = $1', [fullurl], (error, results) => {
        const shorturl = shortid();
        console.log(shorturl);

        if (error) {
            console.log(error);
            return;

        }

        console.log(results);

        if (results.rows.length === 0) {
            const url = {
                fullurl: fullurl,
                shorturl: shorturl,
                count: 1,
            };

            pool.query ('INSERT INTO url (fullurl, shorturl, count) VALUES ( $1 , $2 , $3)',[url.fullurl, url.shorturl , url.count], (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    console.log("Table Successfully Created");
                    return;
                }
            })

            return res.json({ shorturl: shorturl, count: 1 });
        }
        else{
            const short_url = results.rows[0].shorturl;
            const counts = results.rows[0].count;

            pool.query('UPDATE `url` SET counts = $1 WHERE short_url = $2', [counts + 1, short_url], (err, res) => {
                if (err) {
                    console.log("Error updating table");
                    return;
                }
            })
            return res.json({ shorturl: short_url, count: counts + 1 });
            
        }
        
    })
}

const handleGetAnalytics = async (req, res) => {
    pool.query('SELECT * from url WHERE url.shorturl = $1', [req.params.shorturl], (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        else {
            return res.json({});
        }
    })
}

module.exports = {
    handleGenerateNewShortUrl,
};






