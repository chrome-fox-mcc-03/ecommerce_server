const { User } = require("../models");

module.exports = {
  authorization(req, res, next) {
    // check whether they have admin as their role
    User.findOne({
      where: {
        email: req.decoded.email
      }
    })
      .then(found => {
        if (found) {
          if (found.role === "admin") {
            next();
          } else {
            next({
              status: "Unauthorized",
              msg: "Access denied, you do not have admin priviledge"
            });
          }
        } else {
          next({
            status: "Not Found",
            msg: "User not found in our database"
          });
        }
      })
      .catch(next);
  }
};
