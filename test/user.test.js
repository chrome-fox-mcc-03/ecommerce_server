const app = require('./../app')
const request = require('supertest')
const { sequelize } = require('./../models')
const { queryInterface } = sequelize
const { makeToken } = require('./../helper/jwt')
const {  User } = require('./../models')

let data = {
    email: 'naufalyunan45@gmail.com',
    password: '12345',
    name: 'naufal',
    role: 'admin'
}

let token = ''
let id = null

describe('User routes', ()=> {
    afterAll(done => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })
    describe('POST /register', () => {
        afterAll(done => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => {
                    done()
                })
                .catch(err => done(err))
        })
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
            test('send error with status 400 because email is not unique', (done) => {
                const emailAlreadyUsed = { ...data }
                request(app)
                    .post('/register')
                    .send(emailAlreadyUsed)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'email already in use')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('email already in use')
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
        beforeAll(done => {
            User.create({
                email: 'naufalyunan45@gmail.com',
                password: '12345',
                name: 'naufal',
                role: 'admin'
            })
                .then(response => {
                    id = response.id
                    const payload = {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.name
                    }
                    token = makeToken(payload)
                    done()
                })
                .catch(err => console.log(err))
        }) 
        describe('success', () => {
            test('send object (token) with 200 status', done => {
                const login = {
                    email: data.email,
                    password: data.password
                }
                request(app)
                    .post('/login')
                    .send(login)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.status).toBe(200)
                        token = res.body.token
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
    describe('PUT /users/:id', () => {
        beforeAll(done => {
            User.create({
                email: 'toni@mail.com',
                password: '12345',
                name: 'toni',
                role: 'admin'
            })
                .then(response => {
                    id = response.id
                    const payload = {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.name
                    }
                    token = makeToken(payload)
                    done()
                })
                .catch(err => console.log(err))
        }) 
        describe('success', () => {
            test('put user by id', done => {
                const dataUpdate = {
                    email: 'budi@gmail.com',
                    password: '12345',
                    name: 'budi',
                    role: 'admin'
                }
                request(app)
                    .put(`/users/${id}`)
                    .set({ token })
                    .send(dataUpdate)
                    .end((err,res) => {
                        expect(err).toBe(null)
                        console.log(res.body, "from succces")
                        expect(res.body).toHaveProperty('email', dataUpdate.email)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        id = res.body.id
                        expect(res.body).toHaveProperty('name', expect.any(String))
                        expect(res.body).toHaveProperty('role', expect.any(String))
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('fail', () => {
            test('failed because token is not provided', done => {
                const dataUpdate = {
                    email: 'budi@gmail.com',
                    password: '12345',
                    name: 'budi',
                    role: 'admin'
                }
                request(app)
                    .put(`/users/${id}`)
                    .send(dataUpdate)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'You are not authenticated')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('You are not authenticated')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(404)
                        done()
                    })
            })          
            test('failed because no user found', done => {
                let fakeId = 5000
                const dataUpdate = {
                    email: 'budi@gmail.com',
                    password: '12345',
                    name: 'budi',
                    role: 'admin'
                }
                request(app)
                    .put(`/users/${fakeId}`)
                    .set({ token })
                    .send(dataUpdate)
                    .end((err, res) => {
                        console.log(err, ',.')
                        console.log(res.body, '<<<>>>')
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'user not found')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('user not found')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('DELETE /users/:id', () => {
        beforeAll(done => {
            User.create({
                email: 'toni@mail.com',
                password: '12345',
                name: 'toni',
                role: 'admin'
            })
                .then(response => {
                    id = response.id
                    const payload = {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.name
                    }
                    token = makeToken(payload)
                    done()
                })
                .catch(err => console.log(err))
        }) 
        describe('success', () => {
            test('delete user by id', done => {
                request(app)
                    .delete(`/users/${id}`)
                    .set({ token })
                    .end((err,res) => {
                        expect(err).toBe(null)
                        console.log(res.body, "from succces")
                        expect(res.body).toHaveProperty('email', expect.any(String))
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        id = res.body.id
                        expect(res.body).toHaveProperty('name', expect.any(String))
                        expect(res.body).toHaveProperty('role', expect.any(String))
                        expect(res.status).toBe(203)
                        done()
                    })
            })
        })
        describe('fail', () => {
            test('failed because token is not provided', done => {
                request(app)
                    .delete(`/users/${id}`)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'You are not authenticated')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('You are not authenticated')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(404)
                        done()
                    })
            })          
            test('failed because no user found', done => {
                let fakeId = 5000
                request(app)
                    .delete(`/users/${fakeId}`)
                    .set({ token })
                    .end((err, res) => {
                        console.log(err, ',.')
                        console.log(res.body, '<<<>>>')
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'user not found')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('user not found')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })

})