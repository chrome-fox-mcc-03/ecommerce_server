const {Product, Cart, Order} = require('../models')
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
        console.log(req.body, req.params.id)
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
                console.log('BERHASIL UPDATEEEEE')
                console.log(result)
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
                console.log("BERHASIL DELETE")
                res.status(201).json(message)
            })
            .catch(function(err) {
                console.log('gagal delete')
                console.log(err)
                next(err)
            })
    }
//ECMS PORTO 4 Client(Cart,Order,Checkout)
    static getCart(req, res, next) {
        Cart.findAll({
            where: {
                UserId: req.authenticated.id
            },
            include: ['Product', 'User']
        })
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static addCart(req, res, next) {
        let data = req.body
        console.log(data)
        Cart.findOne({
            where: {
                ProductId : data.ProductId,
                UserId : data.UserId
            }
        })
            .then(function(result) {
                if(result) {
                    data.Quantity = Number(data.Quantity)+ Number(result.Quantity)
                    return Cart.update(data, {
                        where: {
                            ProductId: data.ProductId,
                            UserId: data.UserId
                        }
                    })
                }
                else {
                    //data dijabarin
                    return Cart.create(data)
                }
                
            })
            .then(function(result) {
                res.status(201).json(result)
            })
    }
    
    static updateCart(req, res, next) {
        console.log('MASUKKKK UPDATE CART')
        let UpdateId = req.params.id
        Cart.update({
            UserId: req.body.UserId,
            ProductId: req.body.ProductId,
            Quantity: req.body.Quantity
        }, {
            where: {
                id: UpdateId
            }
        })
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static deleteCart(req, res, next) {
        console.log('MASUKKKK DELETE')
        let DeleteId = req.params.id
        console.log(`THIS IS ${DeleteId}`)
        Cart.destroy({
            where: {
                id: DeleteId
            }
        })
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static checkout(req, res, next) {
        let data;
        let UpdatedProduct;
        let ordercreate
        Cart.findAll({
            where: {
                UserId : req.authenticated.id
            }
        })
            .then(function(result) {
                data = result
                //promise all
                //data untuk isi cart nya
                let promises = []
                //PROMISE ALL START
                for(let i = 0; i < result.length; i++) {
                    console.log(result[i].ProductId)
                    const promise = new Promise(function(resolve, reject) {
                        Product.findOne({
                            where: {
                                id: result[i].ProductId
                            }
                        })
                            .then(function(product) {
                                if(product) {
                                    if(product.Stock >= result[i].Quantity) {
                                        product.Stock = Number(product.Stock) - Number(result[i].Quantity)
                                        resolve(product)
                                    }
                                    else {
                                        reject({
                                            msg: "Insufficient Stock",
                                            id: product.id,
                                            Stock: product.Stock
                                        })
                                    }
                                }
                                else {
                                    reject({
                                        msg: "Product with this id not found",
                                        id: result[i].ProductId
                                    })
                                }
                            })
                            .catch(function(err) {
                                reject(err)
                            })
                    })
                    promises.push(promise)
                }
                //PROMISE ALL END
                return Promise.all(promises)
            })
            .then(function(result) {
                UpdatedProduct = result
                let updateprom = []
                for(let i = 0; i < result.length; i++) {
                    const updprom = new Promise(function(resolve, reject) {
                        Product.update({
                            Name: result[i].Name,
                            Image_Url: result[i].Image_Url,
                            Price: result[i].Price,
                            Stock: result[i].Stock
                        }, {
                            where: {
                                id: result[i].id
                            }
                        })
                        .then(function(result) {
                            console.log(result)
                            resolve(result) 
                        })
                        .catch(function(err) {
                            reject(err)
                        })
                    })
                    updateprom.push(updprom)
                }
                return Promise.all(updateprom)

            })
            .then(function(result) {
                //Promise All Order Create
                let orderpromise = []
                for(let i = 0; i < data.length; i++) {
                    const ordpromise = new Promise(function(resolve, reject) {
                        Order.create({
                            UserId: data[i].UserId,
                            ProductId: data[i].ProductId ,
                            Quantity: data[i].Quantity,
                            TotalPrice: Number(data[i].Quantity) * UpdatedProduct[i].Price,
                        })
                            .then(function(result) {
                                resolve(result)
                            })
                            .catch(function(err) {
                                reject(err)
                            })
                    })
                    orderpromise.push(ordpromise)
                }
                return Promise.all(orderpromise)
            })
            .then(function(result) {
                ordercreate = result
                return Cart.destroy({
                    where: {
                        UserId: req.authenticated.id
                    }
                })
            })
            .then(function(result) {
                res.status(201).json(ordercreate)
            })
            .catch(function(err) {
                console.log(err)
                next(err)
            })
    }
    
    static getOrder(req, res, next) {
        Order.findAll({
            where: {
                UserId: req.authenticated.id
            }
        })
            .then(function(result) {
                res.status(200).json(result)
            })
            .catch(function(err) {
                next(err)
            })
    }

}

module.exports = Controller