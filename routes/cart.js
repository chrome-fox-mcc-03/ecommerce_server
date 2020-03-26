const cartRoute = require("express").Router()
const authentication = require("../middleware/authentication")
// const authorization = require("../middleware/authorization")
const CartController = require("../controllers/CartController")

// BOTH ADMIN & USER NEEDS AUTHENTICATION
cartRoute.use(authentication)

cartRoute.get("/", CartController.showAllCarts)
cartRoute.get("/history", CartController.showTxnLog)
cartRoute.post("/", CartController.createCart)
cartRoute.patch("/add/:cartId", CartController.addQty)
cartRoute.patch("/remove/:cartId", CartController.reduceQty)
cartRoute.delete("/:cartId", CartController.deleteCart)
cartRoute.patch("/checkout/:cartId", CartController.checkout)
// cartRoute.patch("/bulkcheckout", CartController.massCheckout)

module.exports = cartRoute