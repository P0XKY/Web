const express = require('express');
const router = express.Router();
const dbConection = require('../database')
const md5 = require('md5');

router.get('/reset',(req,res)=>{
    res.render('home/resetpass');
})

router.post('/resetpass',(req,res)=>{
    const {user_email , user_password} = req.body;
    const sqlreset = 'UPDATE users SET user_password = ? WHERE user_email = ?'
    dbConection.query(sqlreset,[md5(user_password),user_email],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message})
        }else{
            // console.log(results)
             res.render('member/login')
        }
    })
})

module.exports = router;