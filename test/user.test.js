const app = require('./../app')
const request = require('supertest')
const { sequelize } = require('./../models')
const { queryInterface } = sequelize

let data = {
    email: 'naufalyunan45@gmail.com',
    password: '12345',
    name: 'naufal',
    role: 'admin'
}

describe('User routes', ()=> {
    // afterEach(done => {
    //     queryInterface.bulkDelete('Users', {})
    //         .then(_ => {
    //             done()
    //         })
    //         .catch(err => done(err))
    // })
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
                        expect(res.body).toHaveProperty('name', expect.any(String))
                        expect(res.body).toHaveProperty('role', expect.any(String))
                        expect(res.status).toBe(201)
                        done()
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
            // test('send error with status 400 because email is not unique', (done) => {
            //     const emailAlreadyUsed = { ...data }
            //     request(app)
            //         .post('/register')
            //         .send(emailAlreadyUsed)
            //         .end((err,res) => {
            //             expect(err).toBe(null)
            //             expect(res.body).toHaveProperty('message', 'Invalid validator function: unique')
            //             expect(res.body).toHaveProperty('errors', expect.any(Array))
            //             expect(res.body.errors).toContain('Invalid validator function: unique')
            //             expect(res.body.errors.length).toBeGreaterThan(0)
            //             expect(res.status).toBe(400)
            //             done()
            //         })
            // })
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
            test('send error with status 400 because role is not filled', done => {
                const noRole = { ...data }
                delete noRole.role
                request(app)
                    .post('/register')
                    .send(noRole)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'role must be filled')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('role must be filled')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('send error with status 400 because name is not filled', done => {
                const noName = { ...data }
                delete noName.name
                request(app)
                    .post('/register')
                    .send(noName)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'name must be filled')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('name must be filled')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('POST /login', () => {
        describe('success', () => {
            test('send object (token) with 200 status', done => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.status).toBe(200)
                        process.env.EXAMPLE_TOKEN = res.body.token
                        console.log(process.env.EXAMPLE_TOKEN)
                        done()
                    })
            })
        })
        describe('fail', () => {
            test('send error with status 400 because email not found', done => {
                const wrongEmail = { ...data, email: 'nafal45@mail.com' }
                request(app)
                    .post('/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Invalid email/password')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Invalid email/password')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('send error with status 400 because password not match', done => {
                const wrongEmail = { ...data, password: 'ecommerce' }
                request(app)
                    .post('/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Invalid email/password')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Invalid email/password')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    // describe('GET /users', () => {
    //     describe('success', () => {
    //         test('get all users', done => {
    //             const token = process.env.EXAMPLE_TOKEN
    //             console.log(process.env.EXAMPLE_TOKEN)
    //             request(app)
    //                 .get('/users')
    //                 .send(token)
    //                 .end((err, res) => {
    //                     expect(err).toBe(null)
    //                     console.log(res.body)
    //                     expect(res.body.length).toBeGreaterThan(0)
    //                     done()
    //                 })
    //         })
    //     })
    // })
})