const {
    Product
} = require('../models')

class controller {
    static add(req, res, next) {
        let {
            name,
            image_url,
            price,
            stock
        } = req.body
        Product.create({
                name,
                image_url,
                price,
                stock
            })
            .then(result => {
                let data = {
                    id: result.id,
                    name: result.name,
                    image_url: result.image_url,
                    price: result.price,
                    stock: result.stock
                }
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static get(req, res, next) {
        Product.findAll()
            .then(result => {
                console.log(result[0], 'ini result geeeet');

                res.status(200).json(result)
            })
            .catch(err => {
                console.log(err, 'ini erorrr geeeeet');
                next(err)

            })
    }

}

module.exports = controller