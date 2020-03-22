const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize

let data = {
    email : 'fadhil@mail.com',
    password : 'fadhilman'
}
describe('User routes', () => {
    afterEach((done) => {
        queryInterface.bulkDelete('Users')
            .then(user => done())
            .catch(err => done(err))
    })
    describe('POST /register', () => {
        describe('success', () => {
            test('should send an object (email,id) with status 201', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        console.log(res.err)
                        console.log(res.body, 'ini bodi')
                        console.log(res.status, 'ini status')
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('email', data.email)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.status).toBe(201)
                        done()
                    })
            }, 30000)
        })
        // describe('error', () => {
        //     test('should send an error with status 400 (bad request) becuase of missing email value', (done) => {
        //         const noEmail = {...data}
        //         delete noEmail.email
        //         request(app)
        //             .post('/register')
        //             .send(noEmail)
        //             .end((err, res) => {
        //                 expect(err).toBe(null)
        //                 expect(res.body).toHaveProperty('')
        //             })
        //     }
        // })
    })
})