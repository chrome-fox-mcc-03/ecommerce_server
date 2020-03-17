const { Category } = require('../models')

module.exports = 
  class CategoryController {
    static findAll (req, res, next) {
      Category.findAll()
        .then(categories => res.status(200).json({ categories }))
        .catch(next)
    }

    static findByPk (req, res, next) {
      const { categoryId } = req.params
      Category.findByPk(categoryId)
        .then(category => {
          if (!category) {
            throw {
              status: 400,
              message: 'Category not found'
            }
          } else {
            res.status(200).json({ category })
          }
        })
        .catch(next)
    }
  }