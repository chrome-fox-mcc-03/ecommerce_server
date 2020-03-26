"use strict"

const { Product, Store } = require('../models/index')

class Controller {
    static createProduct(req, res, next){
        const data = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            store_id: req.params.storeId,
            description: req.body.description,
            img_url: req.body.img_url,
            highlighted: req.body.highlighted
        }
        Product.create(data)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(next)
    }

    static editProduct(req, res, next){
        const data = {
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            category: req.body.category,
            description: req.body.description,
            img_url: req.body.img_url,
            highlighted: req.body.highlighted
        }

        Product.update(data,{
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json({msg: 'Product edited.'})
        })
        .catch(next)
    }

    static deleteProduct(req, res, next){
        Product.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(200).json({msg: 'ok'})
        })
        .catch(next)
    }

    static findProduct(req, res, next){
        Product.findAll({
            where: {
                store_id: req.params.storeId
            },
            order: ['id']
        })
        .then(results => {
            if(results[0]){
                res.status(200).json({data:results})
            }
            else{
                res.status(200).json({data:null})
            }
        })
        .catch(next)
    }

    static findCategory(req, res, next){
        Product.findAll({
            where: {
                store_id: req.params.storeId
            }
        })
        .then(results => {
            let categories = []
            results.forEach(el => {
                if(!categories.includes(el.category)) categories.push(el.category)
            })
            if(categories[0]) res.status(200).json({data:categories})
            else res.status(200).json({data:null})
        })
        .catch(next)
    }

    static getProductById (req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            if(result) {
                res.status(200).json(result)
            }
        })
        .catch(next => console.log(next))
    }

    static findHighlighted (req, res, next) {
        Product.findAll ({
            where: {
                highlighted: true
            },
            include: {
                model: Store
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }

    static findAllProduct (req, res, next) {
        Product.findAll({
            include: {
                model: Store
            }
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(next)
    }
}

module.exports = Controller