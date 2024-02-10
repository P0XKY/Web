const mysql = require('mysql2');
const dbConection = require('./database')
const getDatapost = (req,res,next) =>{
    const sqlposts = 'SELECT * FROM posts'
    dbConection.query(sqlposts,(error,result,fields)=>{
    if(error)
        console.error(error);
        res.locals.data = result ;
        next();
    });
}
module.exports = getDatapost;