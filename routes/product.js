const productRoute = require("express").Router()
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const ProductController = require("../controllers/ProductController")

productRoute.use(authentication)
productRoute.post("/", ProductController.create)
productRoute.get("/", ProductController.getAll)
// productRoute.get("/:id", ProductController.getById)


// productRoute.put("/:id", authorization, ProductController.update)
// productRoute.delete("/:id", authorization, ProductController.delete)

module.exports = productRoute