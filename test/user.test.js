"use strict"
if(process.env.NODE_ENV === 'test')require('dotenv').config()
const supertest = require('supertest')
const { queryInterface } = require('../models').sequelize
const app = require('../app')

describe('User Router', () => {
    const dataRegister = {
        name: 'Adam Primarizki',
        email: 'Adam.primarizki@gmail.com',
        img_url: 'http//migur.com/asdfghjkl',
        password: 'asdasdasd123',
        passwordConfirm: 'asdasdasd123',
        store_name: 'Toko Mita',
        role: 'Admin'
    }
    describe('Register a user', () => {
        afterEach(done => {
            queryInterface.bulkDelete('Users', {})
            .then(_ => { 
                return queryInterface.bulkDelete('Stores', {})
            })
            .then(_ => done())
            .catch(done)
        })
        describe('Success', () => {
            it('should return a newUser obj (id, email, name, hashedPassword): 201', done => {
                supertest(app)
                .post('/register')
                .send(dataRegister)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('email', dataRegister.email)
                    expect(res.body).toHaveProperty('name', dataRegister.name)
                    expect(res.body).toHaveProperty('hashedPassword', expect.any(String))
                    expect(res.body).toHaveProperty('store_name', expect.any(String))
                    done()
                })
            })
        })

        describe('Email ruined', () => {
            let emailNull = { ...dataRegister, email: null }
            it('should return a null error email: 400', done => {
                supertest(app)
                .post('/register')
                .send(emailNull)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your email')
                    done()
                })
            })
            let emailEmpty = { ...dataRegister, email: "" }
            it('should return a empty string error email: 400', done => {
                supertest(app)
                .post('/register')
                .send(emailEmpty)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your email')
                    done()
                })
            })
            let emailFormat = { ...dataRegister, email: "adam.primarizki" }
            it('should return a invalid email format error email: 400', done => {
                supertest(app)
                .post('/register')
                .send(emailFormat)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Email is not valid.')
                    done()
                })
            })
            it('should return a unique constraint violation: 400', done => {
                supertest(app)
                .post('/register')
                .send(dataRegister)
                .end(() => {
                    supertest(app)
                    .post('/register')
                    .send(dataRegister)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('msg', 'Email already been used.')
                        done()
                    })
                })
                
            })
        })

        describe('Name ruined', () => {
            let nameNull = { ...dataRegister, name: null }
            it('should return a null error name: 400', done => {
                supertest(app)
                .post('/register')
                .send(nameNull)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your name')
                    done()
                })
            })
            let nameEmpty = { ...dataRegister, name: "" }
            it('should return a empty error name: 400', done => {
                supertest(app)
                .post('/register')
                .send(nameEmpty)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your name')
                    done()
                })
            })
            let nameInvalid = { ...dataRegister, name: "Adam123" }
            it('should return a null error email: 400', done => {
                supertest(app)
                .post('/register')
                .send(nameInvalid)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Name is not valid')
                    done()
                })
            })
        })

        describe('Password ruined', () => {
            let differentPass = { ...dataRegister, password: "adam", passwordConfirm:"jiah" }
            it('should return a null error password: 400', done => {
                supertest(app)
                .post('/register')
                .send(differentPass)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Password do not matches.')
                    done()
                })
            })
            let passwordNull = { ...dataRegister, password: null, passwordConfirm:null }
            it('should return a null error password: 400', done => {
                supertest(app)
                .post('/register')
                .send(passwordNull)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your password')
                    done()
                })
            })
            let passwordEmpty = { ...dataRegister, password: "", passwordConfirm:"" }
            it('should return a empty error password: 400', done => {
                supertest(app)
                .post('/register')
                .send(passwordEmpty)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Please insert your password')
                    done()
                })
            })
            let passwordInvalid = { ...dataRegister, password: "a", passwordConfirm:"a" }
            it('should return a null error email: 400', done => {
                supertest(app)
                .post('/register')
                .send(passwordInvalid)
                .expect('Content-Type', /json/)
                .expect(400)
                .end((err, res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('msg', 'Password has the minimum characters of 5.')
                    done()
                })
            })
        })
    })

    const dataLogin = {
        email: 'Adam.primarizki@gmail.com',
        password: 'asdasdasd123'
    }

    describe('Log a user in', () => {
        afterEach(done => {
            queryInterface.bulkDelete('Users', {})
            .then(_ => { 
                return queryInterface.bulkDelete('Stores', {})
            })
            .then(_ => done())
            .catch(done)
        })
        describe('Log in successfull :200', () => {
            it('should return a jwt', done => {
                supertest(app)
                .post('/register')
                .send(dataRegister)
                .end(() => {
                    supertest(app)
                    .post('/login')
                    .send(dataLogin)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.body).toHaveProperty('name', dataRegister.name)
                        expect(res.body).toHaveProperty('store_name', dataRegister.store_name)
                        done()
                    })
                })
            })
        })
        describe('Failed', () => {
            const wrongEmail = { ...dataLogin, email: 'adam@mail.com' }
            it('should return wrong email msg :400', done => {
                supertest(app)
                .post('/register')
                .send(dataRegister)
                .end(() => {
                    supertest(app)
                    .post('/login')
                    .send(wrongEmail)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('msg', 'Wrong email/password')
                        done()
                    })
                })
            })
            const wrongPass = { ...dataLogin, password: 'hahaheheo' }
            it('should return wrong pass msg :400', done => {
                supertest(app)
                .post('/register')
                .send(dataRegister)
                .end(() => {
                    supertest(app)
                    .post('/login')
                    .send(wrongPass)
                    .expect('Content-Type', /json/)
                    .expect(400)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('msg', 'Wrong email/password')
                        done()
                    })
                })
            })
        })
    })
})