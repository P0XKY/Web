const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const dbConection = require('../database')
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');
const cookie = require('cookie-parser');
const md5 = require('md5');
const getData = require('../accout')

// use cookie
router.use(cookie());
router.use(getData);
 
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

//  Login.mustache
router.get('/login',(req,res)=>{
    res.render('member/login')
});

// member/login
router.post('/verify',(req,res)=>{
    const {user_name,user_password,user_email} = req.body
    let sql = "SELECT * FROM users WHERE user_name = ?  and user_password = ? "
    dbConection.query(sql,[user_name,user_password,user_email],(err,results)=>{
        if(err){
            console.log(err)
            res.render('member/login')     
        }else{
            if(results.length == 0){
                res.render('member/login',{msg: '!!!Wrong Username or Password!!!'})
            }else{
                res.cookie('user_name',user_name,{maxAge: 600000})
                res.render('member/home',{data: results,posts: res.locals.data})
            }
        }
    });
});

    
// click home
router.get('/member',(req,res)=>{
    const username = req.cookies.user_name;
    if (username){
       res.render('member/home',{posts: res.locals.data}) 
    }
    else {
        res.redirect('/member/login')
    } 
});


// Logout
router.get('/logout',(req,res)=>{
    const username = req.cookies.user_name;
    if (username){
        res.clearCookie('username')
    }
    res.redirect('/')
});

// Upload Post
router.get('/upload',(req,res)=>{
    res.render('member/upload')
});

router.post('/upload',(req,res)=>{
    const {user_id , section , Description } = req.body
    let sql = 'INSERT INTO posts (user_id,section,content) VALUES (?,?,?);'
    dbConection.query(sql,[user_id , section , Description ],(error,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.json(results)
            res.render('member/home',{msg: 'Succeed'})
        }
    });
});

// Setting
router.get('/setting',(req,res)=>{
    res.render('member/setting')
    //res.render('upload/upload')
})

router.get('/post',(req,res)=>{
    
})



module.exports = router;