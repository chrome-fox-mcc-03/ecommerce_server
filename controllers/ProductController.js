const { Product } = require('../models')

class ProductController {
    static create(req, res, next) {
        console.log('--- PRODUCT CONTROLLER: ADD PRODUCT ---');
        console.log("REQ BODY IS:");
        console.log(req.body);
        console.log("REQ BODY DATA IS");
        console.log(req.body.data);
        console.log(req.body.data.name);
        
        Product.create(req.body.data)
            .then(response => {
                console.log("NEW PRODUCT HAS BEEN ADDED");
                let newProduct = {
                    name: response.name,
                    image_url: response.image_url,
                    price: response.price,
                    stock: response.stock
                }
                
                res.status(201).json({data: newProduct})
            })
            .catch(err => {
                console.log("ERROR CREATING NEW PRODUCT");
                next(err)
            })
    }

    static getAll(req, res, next) {
        console.log('--- PRODUCT CONTROLLER: SEE ALL PRODUCTS ---');
        Product.findAll()
            .then(response => {
                console.log("VIEWING LIST OF PRODUCTS");
                res.status(200).json({data: response})
            })
            .catch(err => {
                console.log("ERROR VIEWING LIST OF PRODUCTS");
                next(err)
            })
    }
}

module.exports = ProductController