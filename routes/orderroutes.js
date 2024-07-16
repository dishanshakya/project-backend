const { Router } = require('express');
const multer = require('multer')
const {authenticateUser} = require('../middlewares/auth');
const upload = require('../middlewares/multer')
const {
    postOrder, getRecentOrders, viewOrder, similarOrders, searchController, commentController, viewReplies,
    viewComments, replyController, getCategories
} = require('../controllers/ordercontroller');

const router = Router();


router.post('/postorder',authenticateUser, upload.single('file'), postOrder);
router.get('/recentorders', getRecentOrders);
router.get('/similarorders/:id', similarOrders);
router.get('/categories', getCategories)
router.post('/search', searchController)
router.post('/comments',authenticateUser, commentController)
router.post('/replies',authenticateUser, replyController)
router.get('/replies/:comment_id', viewReplies)
router.get('/comments/:order_id', viewComments)
router.get('/:id', viewOrder);

module.exports = router;
