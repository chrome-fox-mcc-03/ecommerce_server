const request = require('supertest')
const app = require('../app')

let data = {
    email: 'hilmi@mail.com',
    password: '123456'
}

describe('User routes', () => {
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
    })
})