const { Product } = require('../models');

class ProductController {
	static getAll (req, res, next) {
		Product.findAll()
			.then(products => {
				res.status(200).json({ products })
			})
			.catch(err => {
				next(err)
			});
	}

	static getById (req, res, next) {
		let { id } = req.params

		Product.findOne({
			where: { id }
		})
			.then(product => {
				if (product) {
					res.status(200).json({ product })
				} else {
					next({
						name: 'PageNotFound',
						model: 'Product'
					})
				}
			})
			.catch(err => {
				next(err)
			});
	}

	static create (req, res, next) {
		let { name, description, stock, price, imageUrl, isActive } = req.body;
		
		Product.create({
			name,
			description,
			stock,
			price,
			imageUrl,
			isActive
		})
			.then(product => {
				res.status(201).json({
					message: 'Product successfully created',
					product
				})
			})
			.catch(err => {
				next(err)
			});
	}

	static update (req, res,next) {
		let { name, description, stock, price, imageUrl, isActive } = req.body
		let { id } = req.params

		Product.update({
			name, description, stock, price, imageUrl, isActive
		}, {
			where: { id },
			returning: true
		})
			.then(result => {
				if (result[0] === 0) {
					next({
						name: 'PageNotFound',
						model: 'Product'
					})
				} else {
					res.status(200).json({
						message: 'Product successfully created',
						product: result[1]
					})
				}
			})
			.catch(err => {
				next(err)
			})
	}

	static delete (req, res,next) {

	}
}

module.exports = ProductController;