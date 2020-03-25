const router = require("express").Router()
const UserController = require("../controllers/UserController")
const cartRoute = require("./cart.js")
const productRoute = require("./product.js")


router.post("/register", UserController.register)
router.post("/login", UserController.login)
router.get("/getAllUsers", UserController.getAllUsers) // for testing

router.use("/products", productRoute)
router.use("/carts", cartRoute)
module.exports = router
