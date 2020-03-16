const router = require('express').Router();
const UserController = require('../controllers/user');
const errorHandler = require('../middlewares/errorHandler');

router.post('/signup', UserController.signUp);
// res.status(201).json({ token: '910jkrj1pr3901', name: 'Hannah' })
router.use(errorHandler);

module.exports = router