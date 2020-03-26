const router = require("express").Router();
const usersRouter = require("./user");
const productsRouter = require("./product");
const cartsRouter = require("./cart");
const { authentification } = require("../middlewares/authentification");

router.use("/", usersRouter);
router.use(authentification);
router.use("/products", productsRouter);
router.use("/carts", cartsRouter);

module.exports = router;
