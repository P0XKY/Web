const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const dbConection = require('../database')
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');

router.use(cookieSession({
    name: 'session',
    keys: ['key1','key2'],
    maxAge: 3600 * 1000
}))

router.use(express.urlencoded({ extended: false}));

// router.use(bodyParser.urlencoded({ extended: true}));
// router.use(bodyParser.json());

router.get('/register',(req,res)=>{
    res.render('register/register')
});


const ifLoggedIn = (req,res,next)=>{
    if (req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}


router.post('/re',ifLoggedIn,[
    body('user_email','Invalid Email Address!').isEmail().custom((value)=>{
        return dbConection.execute('SELECT user_email FROM users WHERE user_email = ?'[value])
        .then(([rows])=>{
            if (rows.length > 0){
                return Promise.reject('This email already is use!');
            }
            return true;
        })
    }),
    body('user_name','Username is empty!').trim().not().isEmpty(),
    body('user_passwork','The password must be of minimun leng 6 charaters').trim().isLength({ min:6 }),
],
(req,res,next)=>{
    const validaton_result = validationResult(req);
    const { user_id } =req.body;
    const { user_name } =req.body;
    const { user_passwork } =req.body;
    const { user_email } =req.body;
    const sql = 'INSERT INTO users VALUES (?,?,?,?)';
    dbConection.query(sql,[user_id,user_name,user_passwork,user_email],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }else{
            res.render('member/login')
        }
    });
});

module.exports = router;