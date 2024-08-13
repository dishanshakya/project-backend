require('dotenv').config();

const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
    const token = jwt.sign({user: payload}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFE
    });
    return token
}


const attachCookieToResponse = ({ res, user }) => {
    console.log(`attaching ${user} into cookie`);
    const token = createJWT(user);
    console.log(token)
    try{
        res.cookie('token', token,  {
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
    } catch(err){console.log(err);}
}

module.exports = { attachCookieToResponse }
