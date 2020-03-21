const router = require("express").Router()
const UserController = require("../controllers/UserController")
// const ProductController = require("../controllers/ProductController")
const productRoute = require("./product.js")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/getAllUsers", UserController.getAllUsers) // for testing

router.use("/products", productRoute)

module.exports = router
