const bcrypt = require('bcrypt')
const pool = require('../database/db')
const userQueries = require('../queries/userQueries')
const authQueries = require('../queries/authQueries')
const HttpError = require('../error/httpError')
const uploadImage = require('../utils/cloudinary')


const passwordChange = async (req, res) => {
    const {currentPassword, newPassword} = req.body
    const user = await pool.query(userQueries.getUserFromId, [req.user])
    const password = user.rows[0].password

    try {
        if(!await bcrypt.compare(currentPassword, password)){
            throw new HttpError('wrong password', 400) 
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        const update = await pool.query(userQueries.changePassword, [hashedNewPassword, req.user])
        res.status(200).send('Password Changed Successfully')
    }
    catch(HttpError){
        console.log(HttpError)
        res.status(400).send('error')
    }
}

const profilePicChange = async (req, res) => {
    
    try {
        const img_src = await uploadImage(req.file, 'profilepics')
        console.log(img_src)
        const results = await pool.query(userQueries.changeProfilePic, [img_src.url, req.user])
        res.status(200).send('Profile Picture Changed Successfully')
    }
    catch (err) {
        console.log(err)
        res.status(400).send('error changing profile pic')
    }
}
module.exports = {
    passwordChange,
    profilePicChange
}