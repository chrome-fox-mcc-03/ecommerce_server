const router = require('express').Router();
const AdminController = require('../controllers/admin_controller');

router.post('/login', AdminController.login);

module.exports = router;