const { Product } = require('../models');
const CustomError = require('../helpers/customError');
const notFound = "Product Not Found!";

class Controller {
    static get(req, res, next) {
        Product.findAll({
            order: [
                ['updatedAt', 'DESC']
            ],
        })
            .then((result) => {
                if (result.length) {
                    res.status(200).json({ data: result })
                } else {
                    throw new CustomError(404, notFound)
                }
            }).catch((err) => {
                console.log(err);
                next(err);
            });
    }

    static getById(req, res, next) {
        Product.findOne({
            where: {
                id: req.params.id
            }
        })
            .then((result) => {
                if (result) {
                    res.status(200).json({ data: result })
                } else {
                    throw new CustomError(404, notFound)
                }
            }).catch((err) => {
                console.log(err);
                next(err);
            });
    }

    static create(req, res, next) {
        Product.create({
            name: req.body.name,
            img_url: req.body.img_url,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        })
            .then((result) => {
                res.status(201).json({ data: result })
            }).catch((err) => {
                console.log(err);
                next(err);
            });
    }

    static update(req, res, next) {
        let data = {
            name: req.body.name,
            img_url: req.body.img_url,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock
        }
        
        if(Number(req.params.id)) {
            Product.update(data, {
                where: {
                    id: req.params.id
                },
                returning: true,
            })
                .then((result) => {
                    res.status(200).json({ data: result[1][0] })
                }).catch((err) => {
                    console.log(err);
                    next(err);
                });
        } else {
            let err = new CustomError(400, "Bad Request")
            next(err)
        }
    }

    static delete(req, res, next) {
        if(Number(req.params.id)){
            Product.destroy({
                where: {
                    id: req.params.id
                },
                returning: true
            })
                .then((result) => {
                    res.status(200).json({ data: "Success delete data!" })
                }).catch((err) => {
                    console.log(err);
                    next(err);
                });
        } else {
            next(new CustomError(400, "Bad Request"))
        }
    }
}

module.exports = Controller;
