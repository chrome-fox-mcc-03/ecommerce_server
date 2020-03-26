const { verifyToken } = require("../helpers/jwt");

module.exports = {
  authentification(req, res, next) {
    try {
      req.decoded = verifyToken(req.headers.token);
      next();
    } catch (err) {
      next({
        status: "Unauthorized",
        msg: "Please logged in first before continuing"
      });
    }
  }
};
