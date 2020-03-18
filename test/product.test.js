const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { User } = require('../models');
const { sign } = require('../helpers/jwt');

const request = require('supertest');
const app = require('../app');

let adminToken = '';
let customerToken = '';
let firstId = 0;
let secondId = 0;

afterAll(done => {
	queryInterface.bulkDelete('Products', {})
		.then(() => {
			return queryInterface.bulkDelete('Users', {});
		})
		.then(() => {
			done();
		})
		.catch(err => done(err));
})

beforeAll(done => {
	// get register a User
	request(app)
		.post('/admin/register')
		.send({
			name: 'admin',
			email: 'admin@email.com',
			password: 'pass'
		})
		.end((err, res) => {
			if (err) done(err);
			if (res) {
				adminToken = res.body.token;

				request(app)
					.post('/customer/register')
					.send({
						name: 'customer',
						email: 'customer@email.com',
						password: 'pass'
					})
					.end((err, res) => {
						if (err) done(err);
						if (res) {
							customerToken = res.body.token;
							done();
						}
					})
			}
		})
})

describe('POST /products', () => {
	
	describe('success case', () => {
		test('return object of product', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: 'Product',
					description: 'This is description',
					stock: 50,
					price: 50000,
					imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
					isActive: true
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body).toHaveProperty('product', expect.any(Object));
					expect(res.body.product).toHaveProperty('id', expect.any(Number));
					expect(res.body.product).toHaveProperty('name', expect.any(String));
					expect(res.body.product).toHaveProperty('description', expect.any(String));
					expect(res.body.product).toHaveProperty('stock', 50);
					expect(res.body.product).toHaveProperty('price', 50000);
					expect(res.body.product).toHaveProperty('isActive', true);
					expect(res.body.product).toHaveProperty('imageUrl', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')
					expect(res.body.product).toHaveProperty('createdAt', expect.any(String));
					expect(res.body.product).toHaveProperty('updatedAt', expect.any
					(String));
					expect(res.body).toHaveProperty('message', 'Product successfully created');
					expect(res.status).toBe(201);
					done();
				})
		})

		test('test default imageUrl', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: 'Product',
					description: 'This is description',
					stock: 50,
					price: 50000,
					imageUrl: '',
					isActive: true
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body).toHaveProperty('product', expect.any(Object));
					expect(res.body.product).toHaveProperty('id', expect.any(Number));
					expect(res.body.product).toHaveProperty('name', expect.any(String));
					expect(res.body.product).toHaveProperty('description', expect.any(String));
					expect(res.body.product).toHaveProperty('stock', 50);
					expect(res.body.product).toHaveProperty('price', 50000);
					expect(res.body.product).toHaveProperty('isActive', true);
					expect(res.body.product).toHaveProperty('imageUrl', 'https://www.digopaul.com/wp-content/uploads/related_images/2015/09/08/placeholder_2.jpg')
					expect(res.body.product).toHaveProperty('createdAt', expect.any(String));
					expect(res.body.product).toHaveProperty('updatedAt', expect.any
					(String));
					expect(res.body).toHaveProperty('message', 'Product successfully created');
					expect(res.status).toBe(201);
					done();
				})
		})
	})

	describe('error case', () => {
		test('not authenticated', done => {
			request(app)
				.post('/products')
				.send({
					name: 'Product',
					description: 'This is description'
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Please login!');
					expect(res.body).toHaveProperty('message', 'Invalid Credential')
					expect(res.status).toBe(401);
					done();
				})
		})

		test('wrong role authorization', done => {
			request(app)
				.post('/products')
				.set('token', customerToken)
				.send({
					name: 'Product',
					description: 'This is description'
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('You are unauthorized');
					expect(res.body).toHaveProperty('message', 'Unauthorized')
					expect(res.status).toBe(401);
					done();
				})
		})

		test('empty name, stock, price, imageUrl, isActive', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: '',
					description: '',
					stock: '',
					imageUrl: '',
					isActive: ''
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Name is required');
					expect(res.body.errors).toContain('Stock must be at least 0');
					expect(res.body.errors).toContain('Price must be at least 0');
					expect(res.body.errors).toContain('isActive is invalid');
					expect(res.body).toHaveProperty('message', 'Invalid Input')
					expect(res.status).toBe(400);
					done();
				})
		})

		test('null name, stock, price, imageUrl, isActive', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({ })
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Name is required');
					expect(res.body.errors).toContain('Stock must be at least 0');
					expect(res.body.errors).toContain('Price must be at least 0');
					expect(res.body.errors).toContain('isActive is required');
					expect(res.body).toHaveProperty('message', 'Invalid Input')
					expect(res.status).toBe(400);
					done();
				})
		})

		test('minus value of stock & price', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: 'Product',
					description: 'This is description',
					stock: -1,
					price: -1,
					imageUrl: '',
					isActive: true
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Stock must be at least 0');
					expect(res.body.errors).toContain('Price must be at least 0');
					expect(res.body).toHaveProperty('message', 'Invalid Input')
					expect(res.status).toBe(400);
					done();
				})
		})
	})
})

describe('GET /products', () => {
	beforeAll(done => {
		request(app)
			.post('/products')
			.send({
				name: 'Product1',
				description: 'This is description1',
				stock: 50,
				price: 50000,
				imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
				isActive: true
			})
			.end((err, res) => {
				if (err) done(err);
				if (res) {
					request(app)
						.post('/products')
						.send({
							name: 'Product2',
							description: 'This is description2',
							stock: 50,
							price: 100000,
							imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
							isActive: true
						})
						.end((err, res) => {
							if (err) done(err);
							if (res) {
								done()
							}
						})
				}
			})
	})

	describe('success case', () => {
		test('get all product', done => {
			request(app)
				.get('/products')
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('products', expect.any(Array))
					expect(res.body.products.length).toBe(2)
					expect(res.body.products[0]).toHaveProperty('id', expect.any(Number))
					expect(res.body.products[0]).toHaveProperty('name', expect.any(String))
					expect(res.body.products[0]).toHaveProperty('stock', expect.any(Number))
					expect(res.body.products[0]).toHaveProperty('price', expect.any(Number))
					expect(res.body.products[0]).toHaveProperty('description', expect.any(String))
					expect(res.body.products[0]).toHaveProperty('imageUrl', expect.any(String))
					expect(res.body.products[0]).toHaveProperty('isActive', expect.any(Boolean))
					expect(res.body.products[0]).toHaveProperty('createdAt', expect.any(String))
					expect(res.body.products[0]).toHaveProperty('updatedAt', expect.any(String))
					expect(res.status).toBe(200);
					done()
				})
		})
	})
})

describe('GET /products/:id', () => {
	beforeAll(done => {
		request(app)
			.get('/products')
			.end((err, res) => {
				if (err) done(err);
				if (res) {
					firstId = res.body.products[0].id;
					secondId = res.body.products[1].id;
					done();
				}
			})
	})

	describe('success case', () => {
		test('get product by id', done => {
			request(app)
				.get(`/products/${firstId}`)
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('product', expect.any(Object))
					expect(res.body.product).toHaveProperty('id', expect.any(Number))
					expect(res.body.product).toHaveProperty('name', expect.any(String))
					expect(res.body.product).toHaveProperty('stock', expect.any(Number))
					expect(res.body.product).toHaveProperty('price', expect.any(Number))
					expect(res.body.product).toHaveProperty('description', expect.any(String))
					expect(res.body.product).toHaveProperty('imageUrl', expect.any(String))
					expect(res.body.product).toHaveProperty('isActive', expect.any(Boolean))
					expect(res.body.product).toHaveProperty('createdAt', expect.any(String))
					expect(res.body.product).toHaveProperty('updatedAt', expect.any(String))
					expect(res.status).toBe(200);
					done()
				})
		})
	})
	
	describe('error case', () => {
		test('product not exist', done => {
			request(app)
				.get(`/products/0`)
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('message', 'Product Not Found')
					expect(res.body).toHaveProperty('errors', expect.any(Array))
					expect(res.body.errors).toContain('The Product you are looking for is not found')
					expect(res.status).toBe(404);
					done()
				})
		})
	})
})

describe('PUT /products/:id', () => {
	describe('error case', () => {
		test('not authenticated', done => {
			request(app)
				.put(`/products/${secondId}`)
				.send({
					name: 'Product Updated',
					description: 'This is description Updated',
					stock: 52,
					price: 50001,
					imageUrl: 'https://images.unsplash.com/photo-1584444020170-cee15a93b5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=638&q=80',
					isActive: false
				})
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('message', 'Invalid Credential')
					expect(res.body).toHaveProperty('errors', expect.any(Array))
					expect(res.body.errors).toContain('Please login!')
					expect(res.status).toBe(401)
					done()
				})
		})

		test('not authorized', done => {
			request(app)
				.put(`/products/${secondId}`)
				.set('token', customerToken)
				.send({
					name: 'Product Updated',
					description: 'This is description Updated',
					stock: 52,
					price: 50001,
					imageUrl: 'https://images.unsplash.com/photo-1584444020170-cee15a93b5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=638&q=80',
					isActive: false
				})
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('message', 'Unauthorized')
					expect(res.body).toHaveProperty('errors', expect.any(Array))
					expect(res.body.errors).toContain('You are unauthorized')
					expect(res.status).toBe(401)
					done()
				})
		})

		test('product not exist', done => {
			request(app)
				.put('/products/0')
				.set('token', adminToken)
				.send({
					name: 'Product Updated',
					description: 'This is description Updated',
					stock: 52,
					price: 50001,
					imageUrl: 'https://images.unsplash.com/photo-1584444020170-cee15a93b5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=638&q=80',
					isActive: false
				})
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('message', 'Product Not Found')
					expect(res.body).toHaveProperty('errors', expect.any(Array))
					expect(res.body.errors).toContain('The Product you are looking for is not found')
					expect(res.status).toBe(404)
					done()
				})
		})

		test('minus value stock & price', done => {
			request(app)
				.put(`/products/${firstId}`)
				.set('token', adminToken)
				.send({
					stock: -99,
					price: -99,
				})
				.end((err, res) => {
					expect(err).toBe(null)
					expect(res.body).toHaveProperty('message', 'Invalid Input')
					expect(res.body).toHaveProperty('errors', expect.any(Array))
					expect(res.body.errors).toContain('Stock must be at least 0')
					expect(res.body.errors).toContain('Price must be at least 0')
					expect(res.status).toBe(400)
					done()
				})
		})
	})
})