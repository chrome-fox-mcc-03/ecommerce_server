const { Cart, User } = require("../models");

class CartController {
  static findAll(req, res, next) {
    // find the user first
    User.findOne({
      where: {
        email: req.decoded.email
      }
    })
      .then(found => {
        if (found) {
          return Cart.findAll({
            where: {
              UserId: found.id
            }
          });
        } else {
          next({
            status: "Not Found",
            msg: "User not found in our database"
          });
        }
        // find based on id
      })
      .then(response => {
        res.status(200).json({
          data: response,
          msg: "Successfully fetched Cart"
        });
      })
      .catch(next);
  }

  static create(req, res, next) {
    let { ProductId, quantity } = req.body;
    let existed = false;
    let finalQuantity = 0;
    let createUserId = null;
    let userFound = true;
    // find the user first
    return User.findOne({
      where: {
        email: req.decoded.email
      }
    })
      .then(found => {
        if (found) {
          // find whether the ProductId already existed or not
          createUserId = found.id;
          return Cart.findOne({
            where: {
              ProductId: ProductId,
              UserId: createUserId
            }
          });
        } else {
          userFound = false;
          return false;
        }
      })
      .then(found => {
        if (found) {
          // the same product exist in the cart, add to them
          existed = true;
          finalQuantity = Number(found.quantity) + Number(quantity);
          return Cart.update(
            {
              quantity: finalQuantity
            },
            {
              where: {
                id: found.id
              },
              returning: true
            }
          );
        } else if (userFound) {
          // there's no product in the cart, create a new one
          return Cart.create({
            quantity,
            ProductId,
            quantity,
            UserId: createUserId
          });
        } else {
          return false;
        }
      })
      .then(response => {
        if (existed) {
          // send message that it has been updated
          res.status(200).json({
            msg: "Successfully updated a product in the cart",
            data: {
              id: response[1][0].id,
              quantity: response[1][0].quantity,
              ProductId: response[1][0].ProductId,
              UserId: response[1][0].UserId,
              createdAt: response[1][0].createdAt,
              updatedAt: response[1][0].updatedAt
            }
          });
        } else if (userFound) {
          // send message that it has been created
          res.status(201).json({
            msg: "Successfully added a new item into the cart",
            data: response
          });
        } else {
          next({
            status: "Not Found",
            msg: "User not found in our database"
          });
        }
      })
      .catch(next);
  }

  static delete(req, res, next) {
    Cart.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(() => {
        res.status(200).json({
          msg: "Successfully deleted an item in the cart"
        });
      })
      .catch(next);
  }

  static update(req, res, next) {
    let { quantity } = req.body;
    Cart.update(
      {
        quantity
      },
      {
        where: {
          id: req.params.id
        },
        returning: true
      }
    )
      .then(response => {
        res.status(200).json({
          msg: "Successfully updated a product in the cart",
          data: {
            id: response[1][0].id,
            quantity: response[1][0].quantity,
            ProductId: response[1][0].ProductId,
            UserId: response[1][0].UserId,
            createdAt: response[1][0].createdAt,
            updatedAt: response[1][0].updatedAt
          }
        });
      })
      .catch(next);
  }
}

module.exports = CartController;
