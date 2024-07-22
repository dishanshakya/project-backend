const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb)=>{
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
    }
});

const profileStorage = multer.diskStorage({
    destination: (req, res, cb)=> {
        cb(null, 'profilepics/')
    },
    filename: (req, file, cb) =>{
        cb(null, `user${req.user}.png`)
    }
})
const upload = multer({storage: storage});
const profilepic = multer({storage: profileStorage})

module.exports = {
    upload,
    profilepic,
}