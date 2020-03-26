const router = require("express").Router();
const { CartController } = require("../controllers");
const { cartAuthorization } = require("../middlewares/authorization");

router.get("/", CartController.findAll);
router.post("/", CartController.create);
router.put("/:id", cartAuthorization, CartController.update);
router.delete("/:id", cartAuthorization, CartController.delete);

module.exports = router;
