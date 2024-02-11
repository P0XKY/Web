const multer = require('multer')
const path = require('path');


const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'./upload/img')
    },
    filename: (req,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})
// const storage = multer.memoryStorage();
let uplaodFile = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 10 }
});

module.exports = uplaodFile;