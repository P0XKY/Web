const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express')
const app = express();
const PORT = 3000;

// Mustache
app.set('views',`${__dirname}/static`);
app.set('view engine','mustache');
app.engine('mustache',mustacheExpress());

// Config database
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname,'static')
app.use(express.static(root_path));

// router
const registerRouters = require('./router/register');
const memberRouters = require('./router/member');

// connect database
const dbConection = require('./database');
const { error, time } = require('console');
const { Result } = require('express-validator');

// use router
app.use('/register',registerRouters);
app.use('/member',memberRouters);


// Home
app.get('/',(req,res)=>{
    const sql = 'SELECT * FROM post'
     dbConection.query(sql,(error,result,fields)=>{
        if(error){
            console.error(error);
        }else{
            
            section = result[0].section
            Description = result[0].Description
            times = result[0].times
            
            
            res.render('home/home',{'section': section,Description,times})
        } 
    });
});



// Test
app.get('/test',(req,res)=>{
    res.setHeader('Content','text/html')
    res.send('<h1>Test</h1>')
});


app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
});