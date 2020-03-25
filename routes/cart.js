const cartRoute = require("express").Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const CartController = require("../controllers/CartController")

// BOTH ADMIN & USER NEEDS AUTHENTICATION
cartRoute.use(authentication)

cartRoute.get("/", CartController.showAll)
cartRoute.post("/", CartController.createCart)
cartRoute.patch("/add/:cartId", CartController.add2Cart)
cartRoute.patch("/remove/:cartId", CartController.removeFromCart)
// cartRoute.delete("/", CartController.deleteCart)

module.exports = cartRoute