const {Pool} = require('pg');

const pool = new Pool ({
    user: 'gaurishsharma',
    host: 'localhost',
    database: 'urlshort',
    password: 'password',
    port: 5432,
})

module.exports = pool;