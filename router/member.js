const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const dbConection = require('../database')
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');
const cookie = require('cookie-parser');
const md5 = require('md5');
const getDatapost = require('../accout')
// const getUsers = require('../getUsers')


// use cookie
router.use(cookie());
router.use(getDatapost);
 
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());


// router.use(getUsers);

//  Login.mustache
router.get('/login',(req,res)=>{
    res.render('member/login')
});



// member/login
router.post('/verify',(req,res)=>{
    const {user_name,user_password} = req.body
    const sqluser = 'SELECT * FROM users WHERE user_name = ?  and user_password = ? '
    dbConection.query(sqluser,[user_name,user_password],(err,results)=>{
        if(err){
            console.log(err)
            res.render('member/login')     
        }else{
            if(results.length == 0){
                res.render('member/login',{msg: '!!!Wrong Username or Password!!!'})
            }else{
                res.cookie('user_name',user_name,{maxAge: 600000})
                res.locals.user = results[0];
                res.render('member/home',{data: res.locals.user,posts: res.locals.data})
            }  
        }
    });
});

    


// click home
router.get('/member',(req,res)=>{
    const username = req.cookies.user_name;
    if (username){
       res.render('member/home',{user_name:username,posts: res.locals.data}) 
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
    const sqlinto = 'INSERT INTO posts (user_id,section,content) VALUES (?,?,?);'
    dbConection.query(sqlinto,[user_id , section , Description ],(error,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.json(results)
            res.render('member/home',{msg: 'Succeed'})
        }
    });
});




// Setting

router.get('/setting/:id',(req,res)=>{
    const sqlset = 'SELECT * FROM posts WHERE user_id = '+req.params['id']
    dbConection.query(sqlset,(error,results,fields) => {
        if(error)
           console.error(error);

        res.render('member/setting',{datas: results});
    
        console.log(req.body)
    });
});



router.get('/myposts/:id',(req,res)=>{
    
    const sqlmyposts = 'SELECT * FROM posts WHERE user_id = '+req.params['id']
    dbConection.query(sqlmyposts,(error,results,fields) => {
        if(error)
           console.error(error); 
        
            res.render('member/mypost',{mypost: results});
    });
    
});

router.get('/test',(req,res)=>{
    console.log(req.body);
})



module.exports = router;