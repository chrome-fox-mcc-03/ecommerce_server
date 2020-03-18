const productRoute = require("express").Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const ProductController = require("../controllers/ProductController")


productRoute.get("/", ProductController.getAll)
// productRoute.get("/:id", ProductController.getById)

productRoute.use(authentication)
//ONLY ADMIN AUTHORIZED TO CREATE, PUT & DLETE
productRoute.post("/", authorization, ProductController.create)
productRoute.put("/:id", authorization, ProductController.update)
productRoute.delete("/:id", authorization, ProductController.delete)

module.exports = productRoute