const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express')
const app = express();
const PORT = 3000;

app.set('views',`${__dirname}/static`);
app.set('view engine','mustache');
app.engine('mustache',mustacheExpress());

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname,'static')
app.use(express.static(root_path));

//router
const registerRouters = require('./router/register');
const memberRouters = require('./router/member');
const uploadRouters = require('./router/upload');
const settingRouters = require('./router/setting');

//use router
app.use('/register',registerRouters);
app.use('/member',memberRouters);
app.use('/upload',uploadRouters);
app.use('/setting',settingRouters);

app.get('/',(req,res)=>{
    res.render('home/home')
})

// app.get('/home',(req,res)=>{  
//     res.render('home/home')
// })

app.get('/test',(req,res)=>{
    res.setHeader('Content','text/html')
    res.send('<h1>Test</h1>')
});


app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
});