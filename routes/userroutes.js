const {Router} = require('express')
const { authenticateUser} = require('../middlewares/auth')
const { passwordChange, profilePicChange } = require('../controllers/usercontroller')
const {profilepic} = require('../middlewares/multer')


const router = Router()

router.post('/change-password', authenticateUser, passwordChange)
router.post('/change-picture', authenticateUser, profilepic.single('file'), profilePicChange)

module.exports = router