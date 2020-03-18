const router = require("express").Router();
const { ProductController } = require("../controllers");
const { authentification } = require("../middlewares/authentification");
const { authorization } = require("../middlewares/authorization");

router.use(authentification);
router.get("/", ProductController.findAll);
router.post("/", authorization, ProductController.createNewProduct);
router.get("/:id", ProductController.viewDetail);
router.put("/:id", authorization, ProductController.editProduct);
router.delete("/:id", authorization, ProductController.deleteProduct);

module.exports = router;
