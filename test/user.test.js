const request = require('supertest')
const app = require('../app')
const {
    sequelize
} = require('../models')
const {
    queryInterface
} = sequelize

let data = {
    email: 'hilmi@mail.com',
    password: '123456'
}

let wrongData = {
    email: 'hilmi',
    password: '123'
}

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(() => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    describe('POST /register', () => {
        describe('Success Process', () => {
            test('Should send an object (email, id) with status code 201', (done) => {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('email', data.email)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Register Error Process', () => {
            test('should send an error with status code 400 because Email is null', (done) => {
                const withoutEmail = {
                    ...data
                }
                delete withoutEmail.email
                request(app)
                    .post('/users/register')
                    .send(withoutEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Email Is Required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('POST /login', () => {
        describe('Success Process', () => {
            test('Should send an object (token) with status code 201', (done) => {
                request(app)
                    .post('/users/login')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('Login Error Process', () => {
            test('Should send an error with status code 400 because Email / Password is wrong', (done) => {
                request(app)
                    .post('/users/login')
                    .send(wrongData)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Email/Password is wrong')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
})