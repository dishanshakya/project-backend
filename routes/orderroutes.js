const { Router } = require('express');
const multer = require('multer')
const {authenticateUser} = require('../middlewares/auth');
const upload = require('../middlewares/multer')
const {postOrder, getRecentOrders, viewOrder, similarOrders} = require('../controllers/ordercontroller');

const router = Router();


router.post('/postorder',upload.single('file'), postOrder);
router.get('/recentorders', getRecentOrders);
router.get('/similarorders/:id', similarOrders);
router.get('/:id', viewOrder);

module.exports = router;
