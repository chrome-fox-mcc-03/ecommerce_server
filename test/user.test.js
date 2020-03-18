const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let adminData = {
	email: 'admin@email.com',
	password: 'pass',
	name: 'admin'
}

let customerData = {
	email: 'customer@email.com',
	password: 'pass',
	name: 'customer'
}

describe('User routes', () => {
	afterAll((done) => {
		queryInterface.bulkDelete('Users', {})
			.then(res => done())
			.catch(err => done(err));
	})

	describe('POST /admin/register', () => {
		describe('success part', () => {
			test('return object of token with status code 201', (done) => {
				request(app)
					.post('/admin/register')
					.send(adminData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('token', expect.any(String));
						expect(res.body).toHaveProperty('name', expect.any(String));
						expect(res.status).toBe(201)
						done()
					})
			})
		})
		describe('error part', () => {
			test('name, email, password is empty: return object of error message with status code 400', (done) => {
				request(app)
					.post('/admin/register')
					.send({name: '', email: '', password: '', role: ''})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email is required');
						expect(res.body.errors).toContain('Email format is invalid');
						expect(res.body.errors).toContain('Password is required');
						expect(res.body.errors).toContain('Name is required');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('name, email, password is null: return object of error message with status code 400', (done) => {
				request(app)
					.post('/admin/register')
					.send({})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email is required');
						expect(res.body.errors).toContain('Password is required');
						expect(res.body.errors).toContain('Name is required');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('unique email test: return object of error message with status code 400', (done) => {
				request(app)
					.post('/admin/register')
					.send(adminData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email already registered');
						expect(res.status).toBe(400)
						done()
					})
			})
		})
	})

	describe('POST /admin/login', () => {
		describe('success part', () => {
			test('return object of token with status code 200', (done) => {
				request(app)
					.post('/admin/login')
					.send(adminData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('token', expect.any(String));
						expect(res.body).toHaveProperty('name', expect.any(String));
						expect(res.status).toBe(200)
						done()
					})
			})
		})
		describe('error part', () => {
			test('wrong email: return object of error message with status code 400', (done) => {
				request(app)
					.post('/admin/login')
					.send({
						email: 'blabla@gmail.com',
						password: 'pass'
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('wrong password: return object of error message with status code 400', (done) => {
				request(app)
					.post('/admin/login')
					.send({
						email: 'email@gmail.com',
						password: 'pass1'
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('wrong role: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/login')
					.send({
						email: 'email@gmail.com',
						password: 'pass'
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
		})
	})

	describe('POST /customer/register', () => {
		describe('success part', () => {
			test('return object of token with status code 201', (done) => {
				request(app)
					.post('/customer/register')
					.send(customerData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('token', expect.any(String));
						expect(res.body).toHaveProperty('name', expect.any(String));
						expect(res.status).toBe(201)
						done()
					})
			})
		})
		describe('error part', () => {
			test('name, email, password is empty: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/register')
					.send({name: '', email: '', password: '', role: ''})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email is required');
						expect(res.body.errors).toContain('Email format is invalid');
						expect(res.body.errors).toContain('Password is required');
						expect(res.body.errors).toContain('Name is required');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('name, email, password is null: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/register')
					.send({})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email is required');
						expect(res.body.errors).toContain('Password is required');
						expect(res.body.errors).toContain('Name is required');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('unique email test: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/register')
					.send(customerData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email already registered');
						expect(res.status).toBe(400)
						done()
					})
			})
		})
	})

	describe('POST /customer/login', () => {
		describe('success part', () => {
			test('return object of token with status code 200', (done) => {
				request(app)
					.post('/customer/login')
					.send(customerData)
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('token', expect.any(String));
						expect(res.body).toHaveProperty('name', expect.any(String));
						expect(res.status).toBe(200)
						done()
					})
			})
		})
		describe('error part', () => {
			test('wrong email: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/login')
					.send({
						email: 'blabla@gmail.com',
						password: 'pass',
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('wrong password: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/login')
					.send({
						email: 'email@gmail.com',
						password: 'pass1',
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
			test('wrong role: return object of error message with status code 400', (done) => {
				request(app)
					.post('/customer/login')
					.send({
						email: 'email@gmail.com',
						password: 'pass'
					})
					.end((err, res) => {
						expect(err).toBe(null);
						expect(res.body).toHaveProperty('message', 'Bad Request');
						expect(res.body.errors.length).toBeGreaterThan(0);
						expect(res.body).toHaveProperty('errors', expect.any(Array));
						expect(res.body.errors).toContain('Email/Password combination not match');
						expect(res.status).toBe(400)
						done()
					})
			})
		})
	})
})