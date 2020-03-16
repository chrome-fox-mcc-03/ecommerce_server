const router = require('express').Router();
const UserController = require('../controllers/user');
const errorHandler = require('../middlewares/errorHandler');

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.use(errorHandler);

module.exports = router