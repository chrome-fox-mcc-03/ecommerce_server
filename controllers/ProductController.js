const { Product } = require('../models/index')

class ProductController {

    static create(req, res, next) {
        console.log(req.file, 'INI FILE')
        const product = {
            name: req.body.name,
            img_url: req.file.filename,
            price: req.body.price,
            stock: req.body.stock,
            CategoryId: req.body.CategoryId
        }
        Product.create(product)
            .then(result => {
                res.status(201).json({ product: result, msg:'Product created!' })
            })
            .catch(next)
    }

    static findAll(req, res, next) {
        Product.findAll()
            .then(result => {
                res.status(200).json({ products: result})
            })
            .catch(next)
    }

    static findOne(req, res, next) {
        const { id } = req.params
        Product.findByPk(id)
            .then(result => {
                if (result) {
                    res.status(200).json({ product: result })
                } else {
                    next({ name: 'productNotFound' })
                }
            })
            .catch(next)
    }

    static edit(req, res, next) {
        const id = req.params.id
        let product
        if (req.file) {
            product = {
                name: req.body.name,
                img_url: req.file.filename,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: req.body.CategoryId
            }
        } else {
            product = {
                name: req.body.name,
                price: +req.body.price,
                stock: +req.body.stock,
                CategoryId: req.body.CategoryId
            }
        }

        Product.update(product, { where: { id }, returning: true })
            .then(result => {
                res.status(200).json({ product: result[1][0] , msg: 'Product updated!'})
            })
            .catch(next)
    }


    static delete(req, res, next) {
        const { id } = req.params
        Product.destroy({ where: { id } })
            .then(result => {
                res.status(200).json({msg: 'Product deleted!'})
            })
            .catch(next)
    }

}

module.exports = ProductController