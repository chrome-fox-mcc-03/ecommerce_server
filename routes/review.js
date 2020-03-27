const router = require ('express').Router() ;
const ReviewController = require ('../controllers/ReviewController') ;
const authentication = require ('../middlewares/authentication') ;

router.use(authentication)
router.get('/:productId', ReviewController.showByProduct)
router.post('/', ReviewController.addReview)

module.exports = router