const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const dbConection = require('../database')
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');
const cookie = require('cookie-parser')

router.use(cookie());


router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

//  Login.mustache
router.get('/login',(req,res)=>{
    res.render('member/login')
});

// home.mustache
router.post('/verify',(req,res)=>{
    const {user_name,user_passwork,user_email} = req.body
    const sql = "SELECT * FROM users WHERE user_name = ?  and user_passwork = ? "
    dbConection.query(sql,[user_name,user_passwork,user_email],(err,results)=>{
        if(err){
            console.log(err)
            res.render('member/login')
                
        }else{
            if(results.length == 0){
                
                res.render('member/login',{msg: '!!!Wrong Username or Password!!!'})

            }else{
                
                res.cookie('user_name',user_name,{maxAge: 60000})
                res.render('member/home',{user_name,user_email})
                
            }
        }
    });
});


// click home
router.get('/member',(req,res)=>{
    const username = req.cookies.user_name;
    if (username){
       res.render('member/home',{user_name:username}) 
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
    
    res.render('upload/upload')
})

module.exports = router;