const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done()
            }).catch(err => done(err))
    })
    describe('POST /register', () => {
        describe('success process', () => {
            it('should create new user and return access_token and user data', done => {
                const input = {
                    name: 'rama desi',
                    email: 'ramadesy.saragih@gmail.com',
                    password: 'desi1234',
                    role: 'admin'
                }
                request(app)
                    .post('/register')
                    .send(input)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(201)
                        expect(res.body.user).toHaveProperty('id', expect.any(Number))
                        expect(res.body.user).toHaveProperty('name', 'rama desi')
                        expect(res.body.user).toHaveProperty('email', 'ramadesy.saragih@gmail.com')
                        expect(res.body.user).toHaveProperty('role', 'admin')
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        done()
                    })
            })
        })
        describe('error process', () => {
            test('should send an error with status 400 because of missing email value', done => {
                const input = {
                    name: 'rama desi',
                    password: 'desi1234',
                    role: 'admin'
                }
                request(app)
                    .post('/register')
                    .send(input)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('email is required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        done()
                    })
            })
            test('should send an error with status 400 because password min 6 validation', (done) => {
                const input = {
                    name: 'rama desi',
                    email: 'ramadesy.saragih@gmail.com',
                    password: 'xxx',
                    role: 'admin'
                }
                request(app)
                    .post('/register')
                    .send(input)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password must at least 6 characters')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('POST /login', () => {
        describe('success process', () => {
            test('it should return access token, message and status 200 ', (done) => {
                const input = {
                    email: 'ramadesy.saragih@gmail.com',
                    password: 'desi1234'
                }
                request(app)
                    .post('/login')
                    .send(input)
                    .end((err, res) => {
                        token = res.body.token
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('access_token', expect.any(String))
                        expect(res.body.user).toHaveProperty('name', 'rama desi')
                        expect(res.body.user).toHaveProperty('email', 'ramadesy.saragih@gmail.com')
                        expect(res.body.user).toHaveProperty('role', 'admin')
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })

        describe('error process', () => {
            test('it should return login failed error and status 400', (done) => {
                const input = {
                    email: 'ramadesi@admin.com',
                    password: '123456'
                }
                request(app)
                    .post('/login')
                    .send(input)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'email/password wrong')
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })

    })
})