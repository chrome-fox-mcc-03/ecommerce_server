const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let data = {
    email: 'bambank@mail.com',
    password: 'qweqwe',
    name: "bambank",
    role: true
}

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                return queryInterface.bulkInsert('Users', [{
                    name: 'bambank',
                    email: "bambank@mail.com",
                    password: "$2y$10$BJpBaP2w5a5OqMZzbw.KUuhrr1JQx08FgYJT3vNg/6D56E6j.EL4O",
                    role: true,
                    createdAt: new Date,
                    updatedAt: new Date
                }], {});
            })
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })
    // register
    test('success register with status 201 and obj {token}', (done) => {
        let newData = { ...data }
        newData.email = "jamal@mail.com"
        delete newData.role
        request(app)
            .post('/register')
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('token')
                done()
            })
    }),
    test('failed register with exist email', (done) => {
        let newData = { ...data }
        newData.email = "jamal@mail.com"
        delete newData.role
        request(app)
            .post('/register')
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(500)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Email address already in use!')
                done()
            })
    }),
    test('failed register without email', (done) => {
        let noEmail = { ...data }
        delete noEmail.email;
        request(app)
            .post('/register')
            .send(noEmail)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Please enter email')
                done()
            })
    }),
    test('failed register with invalid email', (done) => {
        let noEmail = { ...data }
        noEmail.email = "aaa"
        request(app)
            .post('/register')
            .send(noEmail)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Please enter valid email address')
                done()
            })
    }),
    test('failed register without password', (done) => {
        let newData = { ...data }
        delete newData.password;
        request(app)
            .post('/register')
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toBe('Please enter password')
                done()
            })
    }),

    // login
    test('success login with status 200 and obj {token}', (done) => {
        let data = {
            email: "jamal@mail.com",
            password: "qweqwe"
        }
        request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                console.log(res.body, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('token')
                done()
            })
    }),
    test('failed login with status 400 and obj {message}', (done) => {
        let data = {
            email: "bambank@mail.com",
            password: "qweqweqwe"
        }
        request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
})
