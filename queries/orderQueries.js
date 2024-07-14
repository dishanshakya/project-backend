const postorder = 'insert into Orders (order_type, user_id, product_name, price, product_status, description, location, contact, img_src, category)\
\ values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
const recentorders = 'select * from orders order by order_id desc limit 10';
const order = 'select orders.*, username, category_name from orders inner join users\
    on users.user_id = orders.user_id inner join category on orders.category = category.category_id where order_id = $1';
const viewComments = "select * from comments where order_id = $1"
const viewReplies = "select * from replies where comment_id = $1"
const similarOrders = 'select * from orders where order_id != $1 order by order_id desc limit 10';
const search = "select * from orders where product_name ilike '%' || $1 || '%' order by order_id desc limit 10";
const comment = "insert into comments(text, order_id, user_id) values ($1, $2, $3)";
const replies = "insert into replies(text, comment_id, user_id) values ($1, $2, $3)";
const updateComments = "update comments set replies = true where comment_id = $1"
const categories = "select * from category"

module.exports = {
    postorder,
    recentorders,
    order,
    similarOrders,
    search,
    comment,
    viewComments,
    viewReplies,
    replies,
    updateComments,
    categories
}