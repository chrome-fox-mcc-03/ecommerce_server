const { Product } = require('../models')

module.exports = {
  isAdmin(req, res, next) {
    const { role } = req.decoded

    role ? next() : next({
      status: 403,
      message: 'this action for admin only!'
    })
  },
  isExist(req, res, next) {
    const { id } = req.params

    Product.findOne({
      where: { id }
    })
      .then(data => {
        if (data) {
          req.product = data.dataValues
          next()
        } else {
          next({
            status: 404,
            message: 'product not found'
          })
        }
      })
      .catch(next)
  }
}