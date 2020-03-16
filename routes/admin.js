const router = require ('express').Router() ;
const UserController = require ('../controllers/UserController') ;

router.post('/login', UserController.login) ;
// router.get('/users', AdminController.showUsers) ;

module.exports = router