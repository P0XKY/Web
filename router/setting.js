const express = require('express');
const router = express.Router();

router.get('/setting',(req,res)=>{
    res.send('Hello')
    //res.render('upload/upload')
})

module.exports = router;