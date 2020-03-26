const { Category } = require('../models')

class CategoryController {
  static findAll (req, res, next) {
    Category.findAll()
      .then(categories => {
        res.status(200).json(categories)
      })
      .catch(next)
  }
}

module.exports = CategoryController