const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express')
const app = express();
const PORT = 3000;
const getDatapost = require('./accout')



// Mustache
app.set('views',`${__dirname}/static`);
app.set('view engine','mustache');
app.engine('mustache',mustacheExpress());
app.use(express.static('static/css'));

// Config database
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname,'static')
app.use(express.static(root_path));
app.use(express.static(path.join(__dirname,'public')))

// router
const registerRouters = require('./router/register');
const memberRouters = require('./router/member');
const resetpassRouters = require('./router/resetpass');





// use router
app.use('/register',registerRouters);
app.use('/member',memberRouters);
app.use('/reset',resetpassRouters);
app.use(getDatapost);

// Home
app.get('/',(req,res)=>{
    res.render('home/home',{posts: res.locals.data})
});


// Test
app.get('/test',(req,res)=>{
    res.setHeader('Content','text/html')
    res.send('<h1>Test</h1>')
});


app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
});