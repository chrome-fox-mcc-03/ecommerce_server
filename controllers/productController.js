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
                console.log(err, 'ini errorrrrrrr');

                next(err)
            })
    }

}

module.exports = controller