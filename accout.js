const mysql = require('mysql2');
const dbConection = require('./database')
const getDatapost = (req,res,next) =>{
    const sqlposts = 'SELECT  users.user_name ,posts.content,posts.times,posts.img,posts.pdf,posts.post_id FROM posts INNER JOIN users ON users.user_id = posts.user_id ORDER BY posts.post_id DESC;'
    dbConection.query(sqlposts,(error,result,fields)=>{
    if(error){
        console.error(error);
    }
        res.locals.data = result ;
        //postid = result[0].post_id;
        //  for(let i=0;i<result.length;i++){
        //      postid = result[i].post_id;
        //     console.log(postid);
        //  }
        
        
        next();
    });
}
module.exports = getDatapost;