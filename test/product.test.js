const request = require('supertest');
const app = require('../app');

const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let adminToken = '';
let customerToken = '';

describe('POST /products', () => {
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

	describe('success case', () => {
		test('return object of product', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: 'Product',
					description: 'This is description'
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.product).toHaveProperty('id', expect.any(Number));
					expect(res.body.product).toHaveProperty('name', expect.any(String));
					expect(res.body.product).toHaveProperty('description', expect.any(String));
					expect(res.body.product).toHaveProperty('UserId', expect.any(Number));
					expect(res.body.product).toHaveProperty('createdAt', expect.any(String));
					expect(res.body.product).toHaveProperty('updatedAt', expect.any(String));
					expect(res.body).toHaveProperty('message', 'Product successfully created')
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
					expect(res.body.errors).toContain('Please login');
					expect(res.body).toHaveProperty('message', 'Bad Request')
					expect(res.status).toBe(400);
					done();
				})
		})

		test('wrong role authenticated', done => {
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

		test('missing product name', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					description: 'This is description'
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Name is required');
					expect(res.body).toHaveProperty('message', 'Bad Request')
					expect(res.status).toBe(401);
					done();
				})
		})

		test('empty product name', done => {
			request(app)
				.post('/products')
				.set('token', adminToken)
				.send({
					name: '',
					description: 'This is description'
				})
				.end((err, res) => {
					expect(err).toBe(null);
					expect(res.body.errors.length).toBeGreaterThan(0);
					expect(res.body.errors).toContain('Name is required');
					expect(res.body).toHaveProperty('message', 'Bad Request')
					expect(res.status).toBe(401);
					done();
				})
		})
	})
	// expect(res.body).toHaveProperty('products', expect.any(Array));
	// expect(res.body.products.length).toBeGreaterThan(0);
	// expect(res.body.products).toHaveProperty('id', expect.any(Number));
	// expect(res.body.products).toHaveProperty('name', expect.any(String));
	// expect(res.body.products).toHaveProperty('description', expect.any(String));
})