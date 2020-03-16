const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let data = {
    email: 'abdul@mail.com',
    password: 'qweqweqwe'
}

describe('User Routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
          .then(_ => {
            done()
          })
          .catch(err => done(err))
    })
    describe('POST /register', () => {
        describe('Success process', () => {
            test('Should return an object with token', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token')
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Error process', () => {
            test('should send an error with status 400 because registered Email', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Email Has Been Registered')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because Invalid Email Format', (done) => {
                let withoutEmail = { ...data, email: 'abdul'}
                request(app)
                    .post('/register')
                    .send(withoutEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Invalid Email Format')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because missing email', (done) => {
                let withoutEmail = { ...data }
                delete withoutEmail.email
                request(app)
                    .post('/register')
                    .send(withoutEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Email is Required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because missing password', (done) => {
                let withoutPassword = { ...data }
                delete withoutPassword.password
                request(app)
                    .post('/register')
                    .send(withoutPassword)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password is Required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because password less than 6', (done) => {
                let tooWeakPassword = { ...data, password: 'qweq' }
                request(app)
                    .post('/register')
                    .send(tooWeakPassword)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password At least 6 characters')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('POST /login', () => {
        describe('success response', () => {
            test('should return object with key token', (done) => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token')
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('error response', () => {
            test('should return error with status 401 because wrong Email', (done) => {
                let wrongEmail = { ...data, email: 'abdu@gmail.com' }
                request(app)
                    .post('/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Email/Password invalid')
                        expect(res.status).toBe(401)
                        done()
                    })
            })
            test('should return error with status 401 because wrong Password', (done) => {
                let wrongPassword = { ...data, password: 'qweqwe' }
                request(app)
                    .post('/login')
                    .send(wrongPassword)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Email/Password invalid')
                        expect(res.status).toBe(401)
                        done()
                    })
            })
        })
    })
})