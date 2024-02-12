const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbConection = require('../database')
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');
const md5 = require('md5');


router.use(express.urlencoded({ extended: false}));

router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

router.get('/register',(req,res)=>{
    res.render('register/register')
});



router.post('/re',(req,res)=>{

    const { user_name } =req.body;
    const { user_email } =req.body;
    const { user_password } =req.body;
    const sql = 'INSERT INTO users(user_id,user_name,user_email,user_password ) VALUES (?,?,?,?)';
    dbConection.query(sql,['',user_name,user_email,md5(user_password)],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.render('member/login')
        }
    });
});

module.exports = router;