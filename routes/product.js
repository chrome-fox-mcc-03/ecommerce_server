const router = require("express").Router();
const { ProductController } = require("../controllers");
const { authentification } = require("../middlewares/authentification");

router.use(authentification);
router.get("/", ProductController.findAll);
router.post("/", ProductController.createNewProduct);
router.get("/:id", ProductController.viewDetail);
router.put("/:id", ProductController.editProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
