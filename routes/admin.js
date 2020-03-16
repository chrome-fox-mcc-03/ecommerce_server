const router = require ('express').Router() ;
const UserController = require ('../controllers/UserController') ;
const AdminController = require ('../controllers/AdminController') ;
// const authentication = require ('../middlewares/authentication') ;
// const authorization = require ('../middlewares/authorization') ;

router.post('/login', UserController.login) ;

// router.use (authentication) ;
// router.use (authorization) ;

// router.get('/users', AdminController.showUsers) ;
// router.post('/users', AdminController.addUser) ;
// router.put('/users/:id', AdminController.editUser) ;
// router.delete('/users/:id', AdminController.deleteUser) ;

module.exports = router