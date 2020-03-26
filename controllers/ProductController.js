const { Product } = require("../models");

class ProductController {
  static findAll(req, res, next) {
    Product.findAll({
      order: [["id", "ASC"]]
    })
      .then(allData => {
        res.status(200).json({
          status: "OK",
          msg: "Successfully fetched all data",
          data: allData
        });
      })
      .catch(next);
  }

  static createNewProduct(req, res, next) {
    let { name, image_url, stock, price } = req.body;
    Product.create({
      name,
      image_url,
      price,
      stock
    })
      .then(created => {
        res.status(201).json({
          status: "Created",
          msg: "Successfully created a new product",
          data: {
            id: created.id,
            name: created.name,
            image_url: created.image_url,
            price: created.price,
            stock: created.stock
          }
        });
      })
      .catch(next);
  }

  static viewDetail(req, res, next) {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(detailed => {
        if (detailed) {
          res.status(200).json({
            status: "OK",
            msg: "Successfully fetched the data of a single product",
            data: {
              id: detailed.id,
              name: detailed.name,
              image_url: detailed.image_url,
              price: detailed.price,
              stock: detailed.stock
            }
          });
        } else {
          next({
            status: "Not Found",
            msg: "Product not found"
          });
        }
      })
      .catch(next);
  }

  static editProduct(req, res, next) {
    let { name, image_url, price, stock } = req.body;
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (found) {
          return Product.update(
            {
              name,
              image_url,
              price,
              stock
            },
            {
              where: {
                id: req.params.id
              },
              returning: true
            }
          );
        } else {
          return found;
        }
      })
      .then(edited => {
        if (edited) {
          let editedWithData = edited[1][0].dataValues;
          res.status(200).json({
            status: "OK",
            msg: "Successfully updated the product",
            data: {
              id: editedWithData.id,
              name: editedWithData.name,
              image_url: editedWithData.image_url,
              price: editedWithData.price,
              stock: editedWithData.stock
            }
          });
        } else {
          next({
            status: "Not Found",
            msg: "Product not found"
          });
        }
      })
      .catch(next);
  }

  static deleteProduct(req, res, next) {
    let deleted = {};
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(found => {
        if (found) {
          deleted.id = found.id;
          deleted.name = found.name;
          deleted.image_url = found.image_url;
          deleted.price = found.price;
          deleted.stock = found.stock;
          return Product.destroy({
            where: {
              id: req.params.id
            }
          });
        } else {
          return found;
        }
      })
      .then(destroyed => {
        if (destroyed) {
          res.status(200).json({
            status: "OK",
            msg: "Successfully deleted a product",
            data: {
              id: deleted.id,
              name: deleted.name,
              image_url: deleted.image_url,
              price: deleted.price,
              stock: deleted.stock
            }
          });
        } else {
          next({
            status: "Not Found",
            msg: "Product Not Found"
          });
        }
      })
      .catch(next);
  }
}

module.exports = ProductController;
