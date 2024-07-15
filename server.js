const express = require('express');
const authroutes = require('./routes/authroutes')
const orderroutes = require('./routes/orderroutes')
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config()


const app =express();
const port = 4000;
app.use(express.json());
app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.static('uploads'));
app.use(cookieParser());

app.use('/api/v1/auth', authroutes);
app.use('/api/v1/order', orderroutes);

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})
