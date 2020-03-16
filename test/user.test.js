const app = require('./../app')
const request = require('supertest')

let data = {
    email: 'naufalyunan45@gmail.com',
    password: '12345'
}

describe('User routes', ()=> {
    describe('POST /register', () => {
        describe('success', () => {
            test('send object (email,id) with 201 status', done => {
                request(app)
                    .post('/register')
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
    describe('error', () => {
        test('send error with status 400 because email empty', (done) => {
            const withoutEmail = { ...data }
            delete withoutEmail.email
            request(app)
                .post('/register')
                .send(withoutEmail)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'email must be filled')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('email must be filled')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()

                })
        })
        test('send error with status 400 because email is not formatted correctly', done => {
            const notCorrectEmail = { ...data, email: 'hai' }
            request(app)
                .post('/register')
                .send(notCorrectEmail)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'Invalid email format')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('Invalid email format')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()
                })
        })
        test('send error with status 400 because password is not filled', done => {
            const withoutPass = { ...data }
            withoutPass.password = ''
            request(app)
                .post('/register')
                .send(withoutPass)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'password must be filled')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('password must be filled')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()
                })
        })
        test('send error with status 400 because password length is less than 5', done => {
            const notPassLength = { ...data, password: '123' }
            request(app)
                .post('/register')
                .send(notPassLength)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'password is at least 5 character')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('password is at least 5 character')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()
                })
        })
    })
})