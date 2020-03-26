const { User, Cart } = require("../models");

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
  },

  cartAuthorization(req, res, next) {
    let checkUserId = null;
    User.findOne({
      where: {
        email: req.decoded.email
      }
    })
      .then(userFound => {
        if (userFound) {
          checkUserId = userFound.id;
          // find cart
          return Cart.findOne({
            where: {
              id: req.params.id
            }
          });
        } else {
          return false;
        }
      })
      .then(response => {
        if (response) {
          if (response.UserId === checkUserId) {
            next();
          } else {
            next({
              status: "Unauthorized",
              msg: "Access denied, you cannot access other people's cart"
            });
          }
        } else {
          next({
            status: "Not Found",
            msg: "Item not found in your cart"
          });
        }
      })
      .catch(next);
  }
};
