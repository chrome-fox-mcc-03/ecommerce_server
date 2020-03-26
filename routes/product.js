const productRoute = require("express").Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const ProductController = require("../controllers/ProductController")

// BOTH ADMIN & USER NEEDS AUTHENTICATION
productRoute.use(authentication)

productRoute.get("/", ProductController.getAll)
productRoute.get("/:id", ProductController.getById)




//ONLY ADMIN AUTHORIZED TO CREATE, PUT & DELETE PRODUCT
productRoute.post("/", authorization, ProductController.create)
productRoute.put("/:id", authorization, ProductController.update)
productRoute.delete("/:id", authorization, ProductController.delete)

module.exports = productRoute