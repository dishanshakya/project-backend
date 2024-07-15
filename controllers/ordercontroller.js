const orderQueries = require('../queries/orderQueries');
const pool = require('../database/db');
const httpError = require('../error/httpError')
const multer = require ('../middlewares/multer');

const postOrder = async (req,res) =>{
    try {
        const user_id = 1;
        const {order_type, product_name, price, description, location, contact, category} = req.body;
        var img_src = `http://localhost:4000/${req.file.filename}`;
        console.log(img_src);
        console.log(req.body)

        if (!order_type || !product_name || !price || !description || !location || !contact || !category)
            throw new httpError('Please provide all data', 400);
        const product_status = 'used';
        try{
        const dbtestnabin = await pool.query(orderQueries.postorder, [order_type, user_id, product_name, price, product_status, description, location, contact, img_src, category]);
        res.status(200).send('successfully posted an order')
        }
        catch (err){
            console.log(err)
            throw new httpError('something went wrong', 500);
        }

    }
    catch(httpError){
        res.status(httpError.status).send(httpError.msg);
    }
}

const getRecentOrders = async (req,res) =>{
    try {
        console.log(req.cookies)
        const orders = await pool.query(orderQueries.recentorders)
        res.status(200).send(JSON.stringify(orders.rows))
    }
    catch(err){
        console.log(err)
        res.status(500).send('something went wrong');
    }
}

const viewOrder = async (req, res) =>{
    try {
        const order_id = req.params.id;
        const order = await pool.query(orderQueries.order, [order_id]);
        const data = order.rows[0]
        res.status(200).send(JSON.stringify(data));
    }
    catch(err){
        console.log(err);
        res.status(500).send('database error');
    }
}

const similarOrders = async (req, res) =>{
    try {
        const order_id = req.params.id;
        const order = await pool.query(orderQueries.similarOrders, [order_id]);
        res.status(200).send(JSON.stringify(order.rows));
    }
    catch(err){
        console.log(err);
        res.status(500).send('database error');
    }
}

const searchController = async (req, res) => {
    try{
        const searchString = req.body.search
        const data = await pool.query(orderQueries.search, [searchString])
        res.status(200).send(JSON.stringify(data.rows))
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}

const commentController = async (req, res) => {
    try {
        const {text, order_id} = req.body
        console.log(req.body)
        const result = await pool.query(orderQueries.comment, [text, order_id, req.user])
        res.status(200).send('commented successfully')
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}

const replyController = async (req, res) => {
    try {
        const {text, comment_id} = req.body
        console.log(req.body)
        const result = await pool.query(orderQueries.replies, [text, comment_id, req.user])
        const update = await pool.query(orderQueries.updateComments, [comment_id])
        res.status(200).send('replied successfully')
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}
    

const viewReplies = async (req, res) => {
    try {
        const comment_id = req.params.comment_id
        const result = await pool.query(orderQueries.viewReplies, [comment_id])
        res.status(200).send(JSON.stringify(result.rows))
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}

const viewComments = async (req, res) => {
    try {
        const order_id = req.params.order_id
        const result = await pool.query(orderQueries.viewComments, [order_id])
        res.status(200).send(JSON.stringify(result.rows))
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}

const getCategories = async (req, res) => {
    try {
        const result = await pool.query(orderQueries.categories)
        res.status(200).send(JSON.stringify(result.rows))
    }
    catch(err) {
        console.log(err)
        res.status(500).send('database error')
    }
}

module.exports = {
    postOrder,
    getRecentOrders,
    viewOrder,
    similarOrders,
    searchController,
    commentController,
    viewReplies,
    viewComments,
    replyController,
    getCategories,
}
