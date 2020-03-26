const request = require('supertest')
const app = require('../app')
const { sequelize, User } = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
let token

describe('User route', () => {
  beforeAll((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  beforeEach((done) => {
    let payload = {
      name: 'Hikmani Syariful Fajar',
      email: 'syarifulfajar@gmail.com',
      password: '12345678',
      role: 'admin'
    }
    User.create(payload)
      .then(user => {
        let userData = {
          name: user.name,
          email: user.email,
          role: user.role
        }
        token = generateToken(userData)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterEach((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('POST /register', () => {
    describe('Success process', () => {
      test('It should return new user object and status 201', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Aprilia Dian',
            email: 'apriliadian@gmail.com',
            password: '12345678',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name')
            expect(response.body).toHaveProperty('email')
            expect(response.body).toHaveProperty('password')
            expect(response.body.password).not.toBe('12345678')
            expect(response.body).toHaveProperty('role')
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('Error process', () => {
      test('It should return error messages from SequelizeValidationError about required data and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: '',
            email: '',
            password: '',
            role: ''
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Please enter your name', 'Please enter your email','Please enter your password', 'Please enter your role']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required name and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: '',
            email: 'apriliadian@gmail.com',
            password: '12345678',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Please enter your name']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required email and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Aprilia Dian',
            email: '',
            password: '12345678',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Please enter your email']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required password and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Aprilia Dian',
            email: 'apriliadian@gmail.com',
            password: '',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Please enter your password']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required role and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Aprilia Dian',
            email: 'apriliadian@gmail.com',
            password: '12345678',
            role: ''
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Please enter your role']))
            expect(response.status).toBe(400)
            done()
          })
      })
      
      test('It should return error message from SequelizeValidationError about Invalid email format and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Hikmani Syariful',
            email: 'syariful@gmail',
            password: '12345678',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Invalid email format']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error message from SequelizeValidationError about minimal password required and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Hikmani Syariful',
            email: 'syariful@gmail.com',
            password: '1234567',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['minimum password length is 8 character']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error message from SequelizeUniqueConstraintError about Email must be unique and status 400', (done) => {
        request(app)
          .post('/register')
          .send({
            name: 'Hikmani Syariful',
            email: 'syarifulfajar@gmail.com',
            password: '12345678',
            role: 'admin'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(['email must be unique']))
            expect(response.status).toBe(400)
            done()
          })
      })
    })
  })

  describe('POST /login', () => {
    describe('Success process', () => {
      test('It should return object containing access_token and status 200', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'syarifulfajar@gmail.com',
            password: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('access_token', expect.any(String))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Error process', () => {
      test('It should return error message about invalid email/password and status 400', (done) => {
        request(app)
          .post('/login')
          .send({
            email: '',
            password: ''
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj')
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Invalid Email/Password']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error message about invalid email/password and status 400', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'apriliadian@gmail.com',
            password: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj')
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Invalid Email/Password']))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error message about invalid email/password and status 400', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'syarifulfajar@gmail.com',
            password: '1234567'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj')
            expect(response.body.errObj).toEqual(expect.arrayContaining(['Invalid Email/Password']))
            expect(response.status).toBe(400)
            done()
          })
      })
    })
  })
})