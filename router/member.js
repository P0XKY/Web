const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

router.get('/login',(req,res)=>{
    res.render('member/login')
    // res.sendFile(path.resolve(__dirname,'../static/member/login.mustache'))
});

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
   
});

router.post('/verify',(req,res)=>{
    const {user_name,user_passwork}=req.body
    const sql = "SELECT * FROM users WHERE user_name = ? and user_passwork = ?"
    pool.query(sql,[user_name,user_passwork],(err,results)=>{
        if(err){
            console.log(err)
            res.render('member/login')
        }else{
            if(results.lenght==0)
                res.render('member/login',{msg: 'Wrog Username or Password'})
            else{
                res.render('member/home')
            }
        }
    })
})

router.get('/member',(req,res)=>{
    res.render('member/member')
});

module.exports = router;