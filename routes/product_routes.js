const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const multer = require('multer');
const authentication = require('../middlewares/authentication')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

router.use(authentication)

const upload = multer({ storage })
router.post('/', upload.single('image'), ProductController.create)
router.get('/', ProductController.findAll)
router.get('/:id', ProductController.findOne)
router.put('/:id', upload.single('image'), ProductController.edit)
router.delete('/:id', ProductController.delete)

module.exports = router