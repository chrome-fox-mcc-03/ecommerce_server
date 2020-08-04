const { Category } = require('../models/index')

class CategoryController {
    static findAll(req, res, next) {
        Category.findAll()
            .then(result => {
                res.status(200).json({ categories: result })
            })
            .catch(next)
    }

    static findOne(req,res,next) {
        let id = req.params.id
        Category.findByPk(id)
            .then(result => {
                res.status(200).json({ category: result})
            })
            .catch(next)
    }

    static create(req, res, next) {
        const category = {
            name: req.body.name
        }
        console.log(category)
        Category.create(category)
            .then(result => {
                res.status(201).json({
                    category: result
                })
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const id = req.params.id
        let category = {
            name: req.body.name
        }
        Category.update(category, { where: { id }, returning: true })
            .then(result => {
                res.status(200).json({ category: result[1][0] })
            })
            .catch(next)
    }

    static delete(req, res, next) {
        const { id } = req.params
        Category.destroy({ where: { id } })
            .then(result => {
                res.status(200).json()
            })
            .catch(next)
    }
}

module.exports = CategoryController