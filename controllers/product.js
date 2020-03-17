const { Product } = require('../models');

class ProductController {
	static getAll (req, res, next) {
		Product.findAll()
			.then(products => {
				res.status(200).json(products)
			})
			.catch(next);
	}

	static getById (req, res, next) {

	}

	static create (req, res, next) {
		let { name, description } = req.body;
		let { id } = req.decoded;

		Product.create({
			name,
			description,
			UserId: id
		})
			.then(product => {
				res.status(201).json({
					message: 'Product successfully created',
					product
				})
			})
			.catch(err => {
				console.log(err);
				next(err)
			});
	}

	static update (req, res,next) {

	}

	static delete (req, res,next) {

	}
}

module.exports = ProductController;