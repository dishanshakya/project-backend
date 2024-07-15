require('dotenv').config();

const jwt = require('jsonwebtoken');
const HttpError = require('../error/httpError');

const authenticateUser = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if (!token) {
            throw new HttpError("Authentication Invalid", 401);
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch(httpError){
        console.log(httpError)
        res.status(400).send('token invalid');
    }

}

module.exports = {
    authenticateUser
}