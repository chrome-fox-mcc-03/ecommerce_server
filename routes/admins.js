const router = require("express").Router();
const { AdminController } = require("../controllers");

router.post("/register", AdminController.register);
router.post("/login", AdminController.login);

module.exports = router;
