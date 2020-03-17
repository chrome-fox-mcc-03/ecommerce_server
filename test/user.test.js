const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize

describe('User routes', () => {

  afterAll(done => {
    queryInterface.bulkDelete('Users', {})
      .then(() => done())
      .catch(done)
  })

  beforeAll(done => {
    User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'qwe',
      role: true
    })
      .then(() => done())
      .catch(done)
  })

  describe('User register for non-admin', () => {
    describe('Register successful', () => {
      test('Return an object contain message of success with status code 201', done => {
        request(app)
          .post('/register')
          .send({
            username: 'kucoba',
            email: 'coba@melempar.com',
            password: 'manggis'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'Register successful')
            done()
          })
      })
    })

    describe('Register error', () => {
      describe('wrong email format', () => {
        test('Should return object of errors contain an array with status code 400', done => {
          request(app)
            .post('/register')
            .send({
              username: 'manggis',
              email: 'KulemparMangga',
              password: 'kudapat'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Wrong email format']))
              done()
            })
        })
      })

      describe('Email Unique error', () => {
        test('Should return object of errors contain an array with status code 400', done => {
          request(app)
            .post('/register')
            .send({
              username: 'kucobamelamar',
              email: 'coba@melempar.com',
              password: 'jandakudapat'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Email is already used']))
              done()
            })
        })
      })

      describe('Username empty error', () => {
        describe('username null', () => {
          test('Should return object of errors contain an array with status code 400', done => {
            request(app)
              .post('/register')
              .send({
                email: 'ramli@anwar.com',
                password: 'bapak-bapak-komplek'
              })
              .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Username cannot be empty']))
                done()
              })
          })
        })

        describe('username empty', () => {
          test('Should return object of errors contain an array with status code 400', done => {
            request(app)
              .post('/register')
              .send({
                username: '',
                email: 'ramli@anwar.com',
                password: 'bapak-bapak-komplek'
              })
              .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Username cannot be empty']))
                done()
              })
          })
        })
      })

      describe('email null error', () => {
        test('Should return object of errors contain an array with status code 400', done => {
          request(app)
            .post('/register')
            .send({
              username: 'ramliAnwar',
              password: 'bapak-bapak-komplek'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Email cannot be empty']))
              done()
            })
        })
      })

      describe('Password null error', () => {
        test('Should return object of errors contain an array with status code 400', done => {
          request(app)
            .post('/register')
            .send({
              username: 'ramliAnwar',
              email: 'ramli@anwar.com'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Password cannot be empty']))
              done()
            })
        })
      })

      describe('Password length error', () => {
        test('Should return object of errors contain an array with status code 400', done => {
          request(app)
            .post('/register')
            .send({
              username: 'ramliAnwar',
              email: 'ramli@anwar',
              password: 'ba'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Password minimum 3 characters']))
              done()
            })
        })
      })
    })
  })

  describe('User login', () => {
    describe('login success', () => {
      test('It should return an object contains token and username with status code 200', done => {
        request(app)
          .post('/login')
          .send({
            email: 'coba@melempar.com',
            password: 'manggis'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('token', expect.any(String))
            expect(res.body).toHaveProperty('username', 'kucoba')
            done()
          })
      })
    })

    describe('login failure', () => {
     describe('wrong email', () => {
       test('It should contain object contains errors with status code 400', done => {
          request(app)
            .post('/login')
            .send({
              email: 'test@test.com',
              password: 'qwe'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Wrong email / password']))
              done()
            })
        })
      }) 

      describe('wrong password', () => {
        test('It should contain object contains errors with status code 400', done => {
          request(app)
            .post('/login')
            .send({
              email: 'admin@admin.com',
              password: 'ewq'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Wrong email / password']))
              done()
            })
        })
      })
    })
  })

  describe('login admin', () => {
    describe('login admin successful', () => {
      test('It should return an object contains token and username with status code 200', done => {
        request(app)
          .post('/loginAdmin')
          .send({
            email: 'admin@admin.com',
            password: 'qwe'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('token', expect.any(String))
            expect(res.body).toHaveProperty('username', 'admin')
            done()
          })
      })
    })

    describe('Login admin error', () => {
     describe('wrong email', () => {
       test('It should contain object contains errors with status code 400', done => {
          request(app)
            .post('/loginAdmin')
            .send({
              email: 'test@test.com',
              password: 'qwe'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Wrong email / password']))
              done()
            })
        })
      }) 

      describe('wrong password', () => {
        test('It should contain object contains errors with status code 400', done => {
          request(app)
            .post('/loginAdmin')
            .send({
              email: 'admin@admin.com',
              password: 'ewq'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Wrong email / password']))
              done()
            })
        })
      })

      describe('Unauthorized access error', () => {
        test('It should contain object contains errors with status code 400', done => {
          request(app)
            .post('/loginAdmin')
            .send({
              email: 'coba@melempar.com',
              password: 'manggis'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(401)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Unauthorized access']))
              done()
            })
        })
      })
    })
  })
})