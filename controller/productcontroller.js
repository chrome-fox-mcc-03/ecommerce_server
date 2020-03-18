const {Product} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {

    static showAll(req, res, next) {
        Product.findAll()
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
        
    }
   
    static createProduct(req, res, next) {
        let {Name, Image_Url, Price, Stock} = req.body
        Product.create({
            Name,
            Image_Url,
            Price,
            Stock
        })
            .then(function(result) {
                let payload = {
                    Name: result.Name,
                    Image_Url: result.Image_Url,
                    Price: result.Price,
                    Stock: result.Stock
                }
                res.status(201).json(payload)
            })
            .catch(function(err) {
                console.log('gagal create')
                next(err)
            })

    }

    static updateProduct(req, res, next) {
        let updateId = req.params.id
        let {Name, Image_Url, Price, Stock} = req.body
        Product.update({
            Name,
            Image_Url,
            Stock,
            Price
        }, {
            where: {
                id: updateId
            }
        })
            .then(function(result) {
                let message = {
                    message: "Berhasil Update"
                }
                res.status(201).json(message)
            })
            .catch(function(err) {
                console.log(err)
                console.log('gagal update')
                next(err)
            })
    }

    static deleteProduct(req, res, next) {
        let deleteId = req.params.id
        console.log(deleteId)
        Product.destroy({
            where: {
                id: deleteId
            }
        })
            .then(function(result) {
                let message = {
                    message: "Berhasil Delete"
                }
                res.status(201).json(message)
            })
            .catch(function(err) {
                console.log('gagal delete')
                console.log(err)
                next(err)
            })
    }

}

module.exports = Controller