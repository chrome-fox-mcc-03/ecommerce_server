const request = require('supertest')
const app= require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

let register = {
    name: 'Xavier',
    email: 'xavier@gmail.com',
    password: 'hacktiv8',
    role: 'admin'
}
let login ={
    email: 'xavier@gmail.com',
    password: 'hacktiv8',
    name: 'Xavier',
    role: 'admin'
}

describe('User routes', () => {
    describe('POST /user/register', () => {
        beforeEach((done) => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => done())
                .catch(err => done(err))
        })
        describe('success process', () => {
            test('should send an object (id, name, access_token), with status code 201', (done) => {
                request(app)
                    .post('/user/register')
                    .send(register)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('name', register.name)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('role', register.role)
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('errors process', () => {
            test.only('should send an errors with status 400 because email format is wrong', (done) => {
                const formatEmailWrong = { ...register, email: 'xavier.mail' }
                request(app)
                    .post('/user/register')
                    .send(formatEmailWrong)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Invalid email format')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an errors with status 400 because email is not unique', (done) => {
                request(app)
                    .post('/user/register')
                    .send(register)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Email already been used, try another email')
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an errors with status 400 because missing email', (done) => {
                const withoutEmail = { ...register }
                delete withoutEmail.email
                request(app)
                    .post('/user/register')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Email is required')
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an errors with status 400 because missing password', (done) => {
                const withoutPassword = { ...register }
                delete withoutPassword.password
                request(app)
                    .post('/user/register')
                    .send(withoutPassword)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password is required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an errors with status 400 because password has less than 8 character', (done) => {
                const wrongPasswordFormat = { ...register, password: 'hack' }
                request(app)
                    .post('/user/register')
                    .send(wrongPasswordFormat)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password minimal have 8 character')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an errors with status 400 because missing name', (done) => {
                const withoutName = { ...register }
                delete withoutName.name
                request(app)
                    .post('/user/register')
                    .send(withoutName)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Name is required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('POST /user/login', () => {
        describe('success process', () => {
            test('should send an object (id, name, access_token), with status code 200', (done) => {
                request(app)
                    .post('/user/login')
                    .send(login)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('name', login.name)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('role', login.role)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('error process', () => {
            test('should send an error with status 400 because password is wrong', (done) => {
                const passwordWrong = {...login, password: '1234'}
                request(app)
                    .post('/user/login')
                    .send(passwordWrong)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Email or Password is wrong')
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because email is wrong', (done) => {
                const emailWrong = {...login, email: 'xavier@mail.com'}
                request(app)
                    .post('/user/login')
                    .send(emailWrong)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Email or Password is wrong')
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
})