const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const dbConection = require('../database');
const cookieSession = require('cookie-session');
const {body,validationResult} = require('express-validator');
const cookie = require('cookie-parser');
const md5 = require('md5');
const getDatapost = require('../accout');
const uplaodFile = require('../middleware/upload')

router.use(cookie());
router.use(getDatapost);
 
router.use(bodyParser.urlencoded({ extended: true}));
router.use(bodyParser.json());

router.use(express.urlencoded({extended: true}));
router.use(express.json({extended: true}));



// router.use(getUsers);

//  Login.mustache
router.get('/login',(req,res)=>{
    res.render('member/login')
});


let gloResults = null;
let userid = null;
let username = null;
// member/login
router.post('/verify',(req,res)=>{
    const {user_email,user_password} = req.body
    // const user = req.cookie.user_id;
    const sqluser = 'SELECT * FROM users WHERE user_email = ?  and user_password = ? '
    dbConection.query(sqluser,[user_email,user_password],(err,results)=>{
        if(err){
            console.log(err)
            res.render('member/login')     
        }else{
            if(results.length == 0){
                res.render('member/login',{msg: '!!!Wrong Username or Password!!!'})
            }else{
                res.cookie('user_email',user_email,{maxAge: 600000})
                gloResults = results;
                userid = results[0].user_id;
                username = results[0].user_name;
                res.render('member/home',{data: gloResults,posts: res.locals.data})
            }  
        }
    });
});

    


// click home
router.get('/verify',(req,res)=>{
    const username = req.cookies.user_email;
    if (username){
       res.render('member/home',{user_name:username,posts: res.locals.data}) 
    }
    else {
        res.redirect('/member/login')
    } 
});




// Logout
router.get('/logout',(req,res)=>{
    const username = req.cookies.user_email;
    if (username){
        res.clearCookie('username')
    }
    res.redirect('/')
});



// Upload Post


router.post('/verify/upload',uplaodFile.array('file',10),(req,res)=>{
    //  if(!req.file){
    //      return res.status(400).send({msg:'No file uploaded.'});
    //  }
    const {content} = req.body
    const sqlinto = 'INSERT INTO posts (post_id,user_id,content,times,pdf,img) VALUES (?,?,?,?,?,?);'
    dbConection.query(sqlinto,['',userid , content ,'',req.files[0].filename,req.files[1].filename],(error,results)=>{
        if(error){
            return res.status(500).json({error: error.message});
        }else{
            //return res.render('member/home',{msg: 'Succeed'})
            // console.log(req.files);
            // console.log(">>",fileName)
            // console.log(">>>",fileData)
            //res.redirect('/member/verify')
            var filename = req.files[0].filename;
            res.status(200).json({
                code:200,
                message: "success",
                results:{
                    purename: filename,
                    fullpath: "http://localhost:3000/upload/img/" + filename
                }
            })
            //req.files.forEach(file => {
                console.log(req.files[0].filename); // ชื่อของไฟล์
                console.log(req.files[1].filename); // ประเภทของไฟล์
                //console.log(file.size); // ขนาดของไฟล์
            //});
            
        }
    });
   
    
});

// router.post('/upload',upload.single('file'))



// Setting

router.get('/verify/setting',(req,res)=>{
    const sqlset = 'SELECT * FROM users WHERE user_id = '+userid
    dbConection.query(sqlset,(error,results,fields) => {
        if(error)
           console.error(error);

        res.render('member/setting',{datas: results,data: gloResults});
    

    });
});



router.get('/verify/myposts',(req,res)=>{
    
    const sqlmyposts = 'SELECT users.user_name ,posts.content,posts.times,posts.img,posts.pdf FROM posts INNER JOIN users ON users.user_id = posts.user_id WHERE posts.user_id ='+userid
    dbConection.query(sqlmyposts,(error,results,fields) => {
        if(error)
           console.error(error); 
            res.render('member/mypost',{mypost: results,data: gloResults,datass: userid});
    });
    
});

router.get('/test',(req,res)=>{
     res.render('test',{data: gloResults})
    // console.log(userid);
    // console.log(gloResults);
    // console.log(username);
    // gloResults.forEach(result => {
    //     console.log(result);
    // });
})



module.exports = router;