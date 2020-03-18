const { Product } = require('../models/index');

module.exports = (req, res, next) => {
  let id = +req.params.id

  Product.findOne({
    where: { id }
  })
    .then(response => {
      if(response) {
        if(response.UserId === req.decoded.id) {
          next()
        }
        else {
          next({
            status: 403,
            msg: "You're not authorized to perform this action!"
          })
        }
      }
      else {
        next({
          status: 404,
          msg: "Product not found"
        })
      }
    })
    .catch(err => {
      next(err)
    })
}