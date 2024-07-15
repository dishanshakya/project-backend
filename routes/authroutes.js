const { Router } = require('express');
const { register, login, checkValidity } = require('../controllers/authcontroller');
const { authenticateUser } = require('../middlewares/auth');

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/tokenvalidity', authenticateUser, checkValidity)

module.exports = router;