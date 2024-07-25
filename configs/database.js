const {Pool} = require('pg');

const pool = new Pool ({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DBNAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
})

module.exports = pool;