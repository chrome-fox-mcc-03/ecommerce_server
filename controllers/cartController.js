const { Cart, User, Product } = require('../models');
const CustomError = require('../helpers/customError');
const notFound = "Cart Not Found!";

class Controller {
  static get(req, res, next) {
    let UserId = req.userId;
    Cart.findAll({
      where: {
        UserId
      },
      order: [
        ['isPaid', 'ASC']
      ],
      include: [
        {
          model: Product
        }
    ]
    })
      .then((result) => {
        if (result.length) {
          res.status(200).json({ data: result })
        } else {
          throw new CustomError(404, notFound)
        }
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static getById(req, res, next) {
    Cart.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((result) => {
        if (result) {
          res.status(200).json({ data: result })
        } else {
          throw new CustomError(404, notFound)
        }
      }).catch((err) => {
        console.log(err);
        next(err);
      });
  }

  static create(req, res, next) {
    let createObj = {
      UserId: req.userId,
      ProductId: req.body.productId,
      qty: req.body.qty
    }
    let isCreate = true;
    Cart.findOne({
      where: {
        UserId: req.userId,
        ProductId: req.body.productId,
        isPaid: false
      }
    })
      .then((result) => {
        if (result) {
          isCreate = false;
          // let qty = Number(result.qty) + Number(req.body.qty)
          let qty = req.body.qty
          let data = {
            qty
          }
          return Cart.update(data, {
            where: {
              id: result.id
            },
            returning: true,
          })
        } else {
          isCreate = true
          return Cart.create(createObj)
        }
      })
      .then((result) => {
        let status = 200;
        if(isCreate) {
          status = 201
        } else {
          result = result[1][0]
        }
        res.status(status).json({ data: result })
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  }

  // static createOri(req, res, next) {
  //   let UserId = req.userId;
  //   let ProductId = req.body.productId;
  //   let qty = req.body.qty
  //   Cart.create({
  //     UserId,
  //     ProductId,
  //     qty
  //   })
  //     .then((result) => {
  //       res.status(201).json({ data: result })
  //     }).catch((err) => {
  //       console.log(err);
  //       next(err);
  //     });
  // }

  static update(req, res, next) {
    let qty = req.body.qty
    let isPaid = req.body.isPaid
    let data = {
      qty,
      isPaid
    }
    if (Number(req.params.id)) {
      Cart.update(data, {
        where: {
          id: req.params.id
        },
        returning: true,
      })
        .then((result) => {
          res.status(200).json({ data: result[1][0] })
        }).catch((err) => {
          console.log(err);
          next(err);
        });
    } else {
      let err = new CustomError(400, "Bad Request")
      next(err)
    }
  }

  static delete(req, res, next) {
    if (Number(req.params.id)) {
      Cart.destroy({
        where: {
          id: req.params.id
        },
        returning: true
      })
        .then((result) => {
          res.status(200).json({ data: "Success delete data!" })
        }).catch((err) => {
          console.log(err);
          next(err);
        });
    } else {
      next(new CustomError(400, "Bad Request"))
    }
  }
}

module.exports = Controller;
