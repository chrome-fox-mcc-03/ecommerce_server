const { Product } = require('../models');
const { getPayload } = require('../helpers/jwt');
const appError = require('../helpers/appError');
const appPayload = require('../helpers/appPayload');

class ProductController {
    static fetchAll(req, res, next) {
        const user = appPayload(getPayload(req.headers.access_token));
        Product.findAll({
            where: {
                UserId: user.id,
            }
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                products: result,
            });
        })
        .catch(next);
    }
};

module.exports = ProductController;