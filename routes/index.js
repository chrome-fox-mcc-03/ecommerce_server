const router = require("express").Router();
const usersRouter = require("./user");
const productsRouter = require("./product");

router.use("/", usersRouter);
router.use("/products", productsRouter);

module.exports = router;
