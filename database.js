const mysql = require('mysql2');
const dbConection = mysql.createPool({
    host: 'localhost',//process.env.DB_HOST,
    user: 'root',//process.env.DB_USER,
    password: '',//process.env.DB_PASSWORD,
    database: 'project',//process.env.DB_NAME,
    port: 3306,
});

module.exports = dbConection;