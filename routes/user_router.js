const router = require('express').Router();
const UserRouter = require('../controllers/user_controller');

router.post('/register', UserRouter.register);
router.post('/signin', UserRouter.signIn);

module.exports = router;