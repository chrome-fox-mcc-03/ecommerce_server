const { User } = require('../models');
const { sign } = require('../helpers/jwt');
const { decode } = require('../helpers/bcrypt')

class UserController {
	static adminRegister (req, res, next) {
		let { email, password, name } = req.body;
		let role = 'admin';

		User.create({
			email,
			password,
			name,
			role
		})
			.then(result => {
				let { id } = result;

				let payload = {
					id,
					email,
					role
				}

				let token = sign(payload);

				res.status(201).json({
					token
				})
			})
			.catch(next)
	}

	static adminLogin (req, res, next) {
		let { email, password } = req.body;
		let role = 'admin';

		User.findOne({
			where: { email, role }
		})
			.then(result => {
				if (result) {
					if (decode(password, result.password)) {
						let { id } = result;

						let payload = {
							id, 
							email,
							role
						}

						let token = sign(payload);

						res.status(200).json({
							token
						})
					} else {
						console.log(`error pass`);
						next({
							name: 'Invalid User',
							errors: ['Email/Password combination not match']
						})
					}
				} else {
					console.log(`error email`);
					next({
						name: 'Invalid User',
						errors: ['Email/Password combination not match']
					})
				}
			})
			.catch(next)
	}

	static customerRegister (req, res, next) {
		let { email, password, name } = req.body;
		let role = 'customer';

		User.create({
			email,
			password,
			name,
			role
		})
			.then(result => {
				let { id } = result;

				let payload = {
					id,
					email,
					role
				}

				let token = sign(payload);

				res.status(201).json({
					token
				})
			})
			.catch(next)
	}

	static customerLogin (req, res, next) {	
		let { email, password } = req.body;
		let role = 'customer';

		User.findOne({
			where: { email, role }
		})
			.then(result => {
				if (result) {
					if (decode(password, result.password)) {
						let { id } = result;

						let payload = {
							id, 
							email,
							role
						}

						let token = sign(payload);

						res.status(200).json({
							token
						})
					} else {
						console.log(`error pass`);
						next({
							name: 'Invalid User',
							errors: ['Email/Password combination not match']
						})
					}
				} else {
					console.log(`error email`);
					next({
						name: 'Invalid User',
						errors: ['Email/Password combination not match']
					})
				}
			})
			.catch(next)
	}

	static google (req, res, next) {

	}
}

module.exports = UserController