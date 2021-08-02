const request = require('supertest');
const app = require('../app');
const { User, Product, Cart, sequelize } = require('../models');
const { queryInterface } = sequelize;
const { encode } = require('../helpers/bcrypt');

let idCustomer1 = 0;
const emailCustomer1 = 'customer1@email.com';
const emailCustomer2 = 'customer2@email.com';
const emailAdmin = 'admin@email.com';
const nameCustomer1 = 'Customer 1';
const nameCustomer2 = 'Customer 2';
const nameAdmin = 'Admin';
const password = encode('qwe');
const role = 'customer';
let products = [];
let cartIds = [];

let wrongCartId = 0;

let tokenCustomer1 = '';
let tokenCustomer2 = '';
let tokenAdmin = '';
let wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mjk3LCJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU4NTExNzQ2OX0.NEe33s0T4SQsZK8PUAXwnbrT07Df85bLCdHHKsU6HiU';

let debugMode = false;
function logThis (message, show) {
	if (debugMode && show) console.log(message);
}

beforeAll(done => {
	logThis(`creating 1st user`, true);
	// create 1st customer
	User.create({
		name: nameCustomer1,
		email: emailCustomer1,
		role,
		password
	})
		.then(result => {
			idCustomer1 = result.id
			logThis(`1st user created`, true);
			// create 2nd customer
			logThis(`creating 2nd user`, true);
			return User.create({
				name: nameCustomer2,
				email: emailCustomer2,
				role,
				password
			})
		})
		.then(_ => {
			logThis(`2nd user created`, true);
			return User.create({
				name: nameAdmin,
				email: emailAdmin,
				role: 'admin',
				password
			})
		})
		.then(_ => {
			logThis(`admin user created`, true);
			
			// get 1st customer token
			logThis(`getting 1st user token`, true);
			return request(app)
				.post('/customer/login')
				.send({
					email: emailCustomer1,
					password
				})
		})
		.then(response => {
			tokenCustomer1 = response.body.token
			logThis(`1st user token= ${tokenCustomer1}`, true);

			logThis(`getting 2nd user token`, true);
			// get 2nd customer token
			return request(app)
			.post('/customer/login')
			.send({
				email: emailCustomer2,
				password
			})
		})
		.then(response => {
			tokenCustomer2 = response.body.token
			logThis(`2nd user token= ${tokenCustomer2}`, true);

			logThis(`getting admin token`, true);
			// get 2nd customer token
			return request(app)
			.post('/admin/login')
			.send({
				email: emailAdmin,
				password
			})
		})
		.then(response => {
			tokenAdmin = response.body.token
			logThis(`2nd user token= ${tokenAdmin}`, true);

			logThis(`seeding product`, true);
			return Product.bulkCreate([{
				name: 'Jam Tangan 1',
				description: 'Ini adalah deskripsi dari sebuah jam tangan',
				stock: 20,
				price: 5000000,
				isActive: true,
				imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=989&q=80',
				createdAt: new Date(),
				updatedAt: new Date()
			}, {
				name: 'Jam Tangan 2',
				description: 'Ini adalah deskripsi dari sebuah jam tangan',
				stock: 30,
				price: 15000000,
				isActive: true,
				imageUrl: 'https://images.unsplash.com/photo-1564088057637-4915616a8a38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
				createdAt: new Date(),
				updatedAt: new Date()
			}])
		})
		.then(result => {
			products = result;
			logThis(products, true)
			logThis(`seeding from product done`, true);
		})
		.catch(err => {
			console.log('this is error from cart test', err);
		})
		.finally(() => {
			done()
		})
})


afterAll(done => {
	logThis('delete data after testing', true)
	queryInterface.bulkDelete('Carts', {})
		.then(_ => {
			return queryInterface.bulkDelete('Products', {})
		})
		.then(_ => {
			return queryInterface.bulkDelete('Users', {})
		})
		.catch(err => {
			console.log(`oops something is wrong in deleting!`, err);
		})
		.finally(() => {
			logThis('deletion done', true)
			done()
		})
})

describe('Cart Testing', () => {
	describe('POST /carts => add a new product to cart', () => {
		describe('success case', () => {
			test('return array of not paid item in users cart', done => {
				request(app)
					.post('/carts')
					.set('token', tokenCustomer1)
					.send({
						UserId: 1,
						ProductId: products[0].id,
						quantity: 3
					})
					.end((err, res) => {
						expect(res.error).toBe(false)
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('carts', expect.any(Array))
						expect(res.body.carts[0]).toHaveProperty('Product', expect.any(Object))
						expect(res.body.carts[0]).toHaveProperty('quantity', 3)
						expect(res.body.carts[0]).toHaveProperty('isPaid', false)
						expect(res.status).toBe(201)
						done()
					})
			})
		})

		describe('error case', () => {
			describe('not authenticated', () => {
				test('should return please login message', done => {
					request(app)
						.post('/carts')
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})
			describe('quantity less than 0', () => {
				test('should return minimum quantity message', done => {
					request(app)
						.post('/carts')
						.set('token', tokenCustomer1)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 0
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Minimum quantity is 1');
							expect(res.body).toHaveProperty('message', 'Invalid Input');
							expect(res.status).toBe(400);
							done();
						})
				})
			})
			describe('quantity null', () => {
				test('should return quantity error message', done => {
					request(app)
						.post('/carts')
						.set('token', tokenCustomer1)
						.send({
							UserId: 1,
							ProductId: products[0].id
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Quantity is required');
							expect(res.body).toHaveProperty('message', 'Invalid Input');
							expect(res.status).toBe(400);
							done();
						})
				})
			})
		})
	})

	describe('GET /carts => get all unpaid item in cart', () => {
		describe('success case', () => {
			test('should return list of items of current unpaid cart item', done => {
				Cart.create({
					UserId: idCustomer1,
					ProductId: products[1].id,
					quantity: 1
				})
					.then(result => {
						request(app)
							.get('/carts')
							.set('token', tokenCustomer1)
							.end((err, res) => {
								expect(res.error).toBe(false)
								expect(err).toBe(null)
								expect(res.body).toHaveProperty('carts', expect.any(Array))
								expect(res.body.carts.length).toBe(2)
								expect(res.body.carts[0]).toHaveProperty('Product', expect.any(Object))
								expect(res.body.carts[0]).toHaveProperty('quantity', 3)
								expect(res.body.carts[0]).toHaveProperty('isPaid', false)
								expect(res.status).toBe(200)
							})
					})
					.catch(err => {
						console.log(err);
						logThis('this is from test')
						logThis(err, true)
					})
					.finally(() => {
						done()
					})
			})
		})

		describe('error case', () => {
			describe('not authenticated', () => {
				test('should return please login message', done => {
					request(app)
						.get('/carts')
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})
		})
	})

	describe('PUT /carts/:id => update quantity', () => {
		describe('success case', () => {
			test('should return list of items of current unpaid cart item', done => {
				Cart.findAll({
					where: { isPaid: false}
				})
					.then(result => {
						cartIds = result.map(el => el.id)
						request(app)
							.put(`/carts/${cartIds[0]}`)
							.set('token', tokenCustomer1)
							.send({
								quantity: 5
							})
							.end((err, res) => {
								expect(err).toBe(null)
								expect(res.error).toBe(false)
								expect(res.body).toHaveProperty('carts', expect.any(Array))
								expect(res.body.carts.length).toBe(2)
								expect(res.body.carts[0]).toHaveProperty('Product', expect.any(Object))
								expect(res.body.carts[0]).toHaveProperty('quantity', 5)
								expect(res.body.carts[0]).toHaveProperty('isPaid', false)
								expect(res.status).toBe(200)
								done()
							})
					})
					.catch(err => {
						console.log(err);
					})
			})
			
		})

		describe('error case', () => {
			describe('unauthenticated', () => {
				test('should return please login message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})
			
			describe('unauthorized', () => {
				test('should return unauthorized message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.set('token', tokenCustomer2)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('You are unauthorized');
							expect(res.body).toHaveProperty('message', 'Unauthorized');
							expect(res.status).toBe(401);
							done();
						})
				})
			})

			describe('wrong role', () => {
				test('should return unauthorized message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.set('token', tokenAdmin)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('You are unauthorized');
							expect(res.body).toHaveProperty('message', 'Unauthorized');
							expect(res.status).toBe(401);
							done();
						})
				})
			})

			describe('diff token', () => {
				test('should return please login message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.set('token', wrongToken)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})
			
			describe('quantity minus value', () => {
				test('should minimum quantity error message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.set('token', tokenCustomer1)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: -1
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Minimum quantity is 1');
							expect(res.body).toHaveProperty('message', 'Invalid Input');
							expect(res.status).toBe(400);
							done();
						})
				})
			})

			describe('quantity null', () => {
				test('should return quantity is required message', done => {
					request(app)
						.put(`/carts/${cartIds[0]}`)
						.set('token', tokenCustomer1)
						.send({
							UserId: 1,
							ProductId: products[0].id
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Quantity is required');
							expect(res.body).toHaveProperty('message', 'Invalid Input');
							expect(res.status).toBe(400);
							done();
						})
				})
			})

			describe('wrong cart id', () => {
				test('should return item not found message', done => {
					request(app)
						.put(`/carts/0`)
						.set('token', tokenCustomer1)
						.send({
							UserId: 1,
							ProductId: products[0].id,
							quantity: 3
						})
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('The Item you are looking for is not found');
							expect(res.body).toHaveProperty('message', 'Item Not Found');
							expect(res.status).toBe(404);
							done();
						})
				})
			})
		})
	})

	
	describe('DELETE /carts => get all unpaid item in cart', () => {
		describe('success case', () => {
			test('return list of items of current unpaid cart item', done => {
				request(app)
					.delete(`/carts/${cartIds[1]}`)
					.set('token', tokenCustomer1)
					.end((err, res) => {
						expect(res.error).toBe(false)
						expect(err).toBe(null)
						expect(res.body).toHaveProperty('message', 'Jam Tangan 2 is removed from your cart')
						expect(res.body).toHaveProperty('carts', expect.any(Array))
						expect(res.body.carts.length).toBe(1)
						expect(res.body.carts[0]).toHaveProperty('Product', expect.any(Object))
						expect(res.body.carts[0]).toHaveProperty('quantity', 5)
						expect(res.body.carts[0]).toHaveProperty('isPaid', false)
						expect(res.status).toBe(200)
						done()
					})
			})
		})


		describe('error case', () => {
			describe('not authenticated', () => {
				test('should return please login message', done => {
					request(app)
						.delete(`/carts/${cartIds[1]}`)
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})

			describe('unauthorized', () => {
				test('should return unauthorized message', done => {
					request(app)
						.delete(`/carts/${cartIds[0]}`)
						.set('token', tokenCustomer2)
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('You are unauthorized');
							expect(res.body).toHaveProperty('message', 'Unauthorized');
							expect(res.status).toBe(401);
							done();
						})
				})
			})

			describe('wrong role', () => {
				test('should return unauthorized message', done => {
					request(app)
						.delete(`/carts/${cartIds[0]}`)
						.set('token', tokenAdmin)
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('You are unauthorized');
							expect(res.body).toHaveProperty('message', 'Unauthorized');
							expect(res.status).toBe(401);
							done();
						})
				})
			})

			describe('diff token', () => {
				test('should return please login message', done => {
					request(app)
						.delete(`/carts/${cartIds[0]}`)
						.set('token', wrongToken)
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('Please login!');
							expect(res.body).toHaveProperty('message', 'Invalid Credential');
							expect(res.status).toBe(401);
							done();
						})
				})
			})
			
			describe('wrong cart id', () => {
				test('should return item not found message', done => {
					request(app)
						.delete(`/carts/0`)
						.set('token', tokenCustomer1)
						.end((err, res) => {
							expect(err).toBe(null);
							expect(res.body.errors.length).toBeGreaterThan(0);
							expect(res.body.errors).toContain('The Item you are looking for is not found');
							expect(res.body).toHaveProperty('message', 'Item Not Found');
							expect(res.status).toBe(404);
							done();
						})
				})
			})
		})
	})

	// describe('PUT /carts/pay => do payment', () => {
	// 	describe('success case', () => {
	// 		test('should return payment success message', done => {
	// 			request(app)
	// 				.get('/carts')
	// 				.set('token', tokenCustomer1)
	// 				.end((err, res) => {
	// 					cartIds = res.body.carts.map(el => el.id)
	// 					expect(res.error).toBe(false)
	// 					expect(err).toBe(null)
	// 					expect(res.body).toHaveProperty('carts', expect.any(Array))
	// 					expect(res.body.carts.length).toBe(0)
	// 					expect(res.status).toBe(200)
	// 				})
	// 		})

	// 		test('should return an empty cart', done => {
	// 			request(app)
	// 				.get('/carts')
	// 				.set('token', tokenCustomer1)
	// 				.end((err, res) => {
	// 					cartIds = res.body.carts.map(el => el.id)
	// 					expect(res.error).toBe(false)
	// 					expect(err).toBe(null)
	// 					expect(res.body).toHaveProperty('carts', expect.any(Array))
	// 					expect(res.body.carts.length).toBe(0)
	// 					expect(res.status).toBe(200)
	// 				})
	// 		})
	// 	})
		
	// 	describe('error case', () => {
	// 		// unauthenticated
	// 		// unauthorized
	// 		// wrong token
	// 		// wrong role
	// 		// diff token
	// 		// balance insufficient
	// 	})
	// })
})