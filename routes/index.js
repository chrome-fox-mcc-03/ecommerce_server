const router = require("express").Router();
const adminsRouter = require("./admins");
const productsRouter = require("./product");

router.use("/", adminsRouter);
router.use("/products", productsRouter);

module.exports = router;
