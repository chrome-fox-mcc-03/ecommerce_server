const request = require('supertest')
const app = require('../app')
const { hashPassword } = require('../helpers/bcrypt')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let data = {
    email: 'admin@admin.com',
    password: 'admin123',
}

describe('Admin Routes', () => {
    beforeAll((done) => {
        queryInterface.bulkInsert('Users', [{
            email: 'admin@admin.com',
            password: hashPassword('admin123'),
            role: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }])
          .then(_ => {
            done()
          })
          .catch(err => done(err))
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
          .then(_ => {
            done()
          })
          .catch(err => done(err))
    })
    describe('POST /admin/login', () => {
        describe('success response', () => {
            test('should return object with key token', (done) => {
                request(app)
                    .post('/admin/login')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token')
                        expect(res.body.role).toBe(true)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })
    describe('error response', () => {
        test('should return error with status 401 because wrong Email', (done) => {
            let wrongEmail = { ...data, email: 'admin@admi.com' }
            request(app)
                .post('/admin/login')
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
                .post('/admin/login')
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