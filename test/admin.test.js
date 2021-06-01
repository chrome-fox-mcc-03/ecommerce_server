const request = require('supertest')
const app = require('../app.js')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('Admin test section', () => {
  beforeEach((done) => {
    User.create({
      username: "admin",
      email: "admin@mail.com",
      password: "12345",
      role: true
    })
      .then(_ => done())
      .catch(err => done(err))
  })
  afterEach((done) => {
    queryInterface.bulkDelete('Users', null, {})
      .then(_ => done())
      .catch(err => done(err))
  })

  describe('/register section', () => {
    describe('Success response', () => {
      test('Will returning status code 201, data admin and message', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: "admin1",
            email: "admin1@mail.com",
            password: "12345",
            role: true
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(201)
            expect(res.body.data).toHaveProperty('username', expect.any(String))
            expect(res.body.data).toHaveProperty('password', expect.any(String))
            expect(res.body.data).toHaveProperty('email', expect.any(String))
            expect(res.body.data).toHaveProperty('role', true)
            expect(res.body.message).toBe('success register')
            done()
          })
      })
    })
    describe('Error response', () => {
      afterEach((done) => {
        queryInterface.bulkDelete('Users', null, {})
          .then(_ => done())
          .catch(err => done(err))
      })
      test('because email already in use', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: "admin",
            email: "admin@mail.com",
            password: "12345",
            role: true
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('email already in use')
            done()
          })
      })
      test('because username empty', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: "",
            email: "admin@mail.com",
            password: "12345",
            role: true
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('username cannot be empty')
            done()
          })
      })
      test('because email doesn`t contain email format', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: "admin",
            email: "admin@mailcom",
            password: "12345",
            role: true
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('email must contain email format')
            done()
          })
      })
      test('because password length less than 5 character', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: "admin",
            email: "admin@mail.com",
            password: "1234",
            role: true
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('password length cannot less than 5 character')
            done()
          })
      })
    })
  })

  describe('/login section', () => {
    describe('Success response', () => {
      test('Will returning status code, token and message', (done) => {
        request(app)
          .post('/admin/login')
          .send({
            email: "admin@mail.com",
            password: "12345",
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('token')
            expect(res.body.message).toBe('success login as admin')
            done()
          })
      })
    })
    describe('Error response', () => {
      test('because invalid email', (done) => {
        request(app)
          .post('/admin/login')
          .send({
            email: "admi@mail.com",
            password: "12345"
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('invalid email / password')
            done()
          })
      })
      test('because invalid password', (done) => {
        request(app)
          .post('/admin/login')
          .send({
            email: "admin@mail.com",
            password: "123456"
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('invalid email / password')
            done()
          })
      })
    })
  })
})