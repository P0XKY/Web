const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express')
const app = express();
const PORT = 3000;

app.set('views',`${__dirname}/static`);
app.set('view engine','mustache');
app.engine('mustache',mustacheExpress());

require('dotenv').config();

//const dir = path.join(__dirname, 'static')
// const url = path.resolve(__dirname, 'static/index.html')
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let root_path = path.resolve(__dirname,'static')
app.use(express.static(root_path));

//app.use(express.static(dir));

const memberRoutes = require('./router/member');
// const homeRoutes = require('./')

// app.use('',)
app.use('/member',memberRoutes);



const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // waitForConnections: true,
    // connectionLimit: 10,
    // queueLimit: 0
});

app.post('/register',(req,res)=>{
    const { user_id } =req.body;
    const { user_name } =req.body;
    const { user_passwork } =req.body;
    const { user_email } =req.body;
    const sql = 'INSERT INTO users VALUES (?,?,?,?)';
    pool.query(sql,[user_id,user_name,user_passwork,user_email],(err,results)=>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        // res.json({id: results.insertId});
    });
});





app.get('/data',(req,res)=>{
    pool.query('SELECT * FROM device',(error,results,fields)=>{
        if(error){
            console.error(error);
            res.status(500).send('Error database');
        } else{
            res.json(results);
        }
    });
});

// app.get('/loginn',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'static/register.html'))
// })

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'static/home/home.html'))
})

// app.get('/login',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'static/login.html'))
    
// })

// app.get('/',(req,res)=>{
//     res.sendFile(url)
    
// });

app.get('/test',(req,res)=>{
    res.setHeader('Content','text/html')
    res.send('<h1>Test</h1>')
});


app.listen(PORT,() =>{
    console.log(`http://localhost:${PORT}`);
});