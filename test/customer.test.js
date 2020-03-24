const request = require('supertest');
const app = require('../app');
const { sequelize, Customer } = require('../models');
const { queryInterface } = sequelize;

afterAll((done) => {
    queryInterface.bulkDelete("Customers", {})
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        })
});

let customer1 = {
  email: "test01@mail.com",
  password: "leleyeye"
}
let customer2 = {
  email: "test02@mail.com",
  password: "leleyeye",
  name: "not test 02"
}

beforeAll(done => {
  Customer
    .create(customer2)
    .then(customer => {
      customer2.id = customer.id
      customer2.avaurl = customer.avaurl
      customer2.name = customer.name
      done()
    })
    .catch(err => done(err))
})

describe('customer route', () => {
  describe('customer register error', () => {
    test('email null', (done) => {
      let nullEmail = {...customer1}
      nullEmail.email = null
      request(app)
        .post("/customer/register")
        .send(nullEmail)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('email is required')
          done()
        })
    })
    test('email empty', (done) => {
      let emptyEmail = {...customer1}
      emptyEmail.email = ''
      request(app)
        .post("/customer/register")
        .send(emptyEmail)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('email is required')
          done()
        })
    })
    test('email invalid', (done) => {
      let invalidEmail = {...customer1}
      invalidEmail.email = 'not email format'
      request(app)
        .post("/customer/register")
        .send(invalidEmail)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('invalid email format')
          done()
        })
    })
    test('email duplicate', (done) => {
      let duplicate = {...customer2}
      request(app)
        .post("/customer/register")
        .send(duplicate)
        .end((err, res) => {
          console.log(res.body.errors)
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          done()
        })
      })
    test('password null', (done) => {
      let nullPass = {...customer1}
      nullPass.password = null
      request(app)
        .post("/customer/register")
        .send(nullPass)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('password is required')
          done()
        })
    })
    test('password empty', (done) => {
      let emptyPass = {...customer1}
      emptyPass.password = ''
      request(app)
        .post("/customer/register")
        .send(emptyPass)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('password is required')
          done()
        })
    })
    test('password length error', (done) => {
      let shortPass = {...customer1}
      shortPass.password = "abc"
      request(app)
        .post("/customer/register")
        .send(shortPass)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('required minimum password length is 6 characters')
          done()
        })
    })
    test('avaurl invalid', (done) => {
      let invalidUrl = {...customer1}
      invalidUrl.avaurl = 'not an url'
      request(app)
        .post("/customer/register")
        .send(invalidUrl)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('message', 'bad request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('invalid url format')
          done()
        })
    })
  })
  describe('customer register success', () => {
    test('valid email & password', (done) => {
      let newCustomer1 = {...customer1}
      delete newCustomer1.name
      newCustomer1.email = "test04@mail.com"
      request(app)
        .post("/customer/register")
        .send(newCustomer1)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(201)
          expect(res.body.user).toHaveProperty('email', newCustomer1.email)
          expect(res.body.user).toHaveProperty('id', expect.any(Number))
          expect(res.body.user).toHaveProperty('token', expect.any(String))
          expect(res.body.user).toHaveProperty('avaurl', expect.any(String))
          expect(res.body.user).toHaveProperty('name', expect.any(String))
          done()
        })
    })
    test('valid email, password, name & avaurl', (done) => {
      let newCustomer2 = {...customer1}
      newCustomer2.email = "test03@mail.com"
      newCustomer2.name = "is test 03"
      newCustomer2.avaurl = `https://api.adorable.io/avatars/125/${newCustomer2.email}.png`
      request(app)
        .post("/customer/register")
        .send(newCustomer2)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(201)
          expect(res.body.user).toHaveProperty('email', newCustomer2.email)
          expect(res.body.user).toHaveProperty('id', expect.any(Number))
          expect(res.body.user).toHaveProperty('name', newCustomer2.name)
          expect(res.body.user).toHaveProperty('avaurl', newCustomer2.avaurl)
          expect(res.body.user).toHaveProperty('token', expect.any(String))
          done()
        })
    })
  })
  describe('customer login error', () => {
    test('wrong email & password', (done) => {
      let wrongCustomer = {}
      wrongCustomer.email = "another@mail.com";
      wrongCustomer.password = "another password";
      request(app)
        .post("/customer/login")
        .send(wrongCustomer)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty('error', 'wrong email/password')
          done()
        })
    })
    test('wrong email', (done) => {
      let wrongEmail = {}
      wrongEmail.email = customer1.email;
      wrongEmail.password = customer2.password;
      request(app)
        .post("/customer/login")
        .send(wrongEmail)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty('error', 'wrong email/password')
          done()
        })
    })
    test('wrong password', (done) => {
      let wrongPassword = {}
      wrongPassword.email = customer2.email;
      wrongPassword.password = "an invalid password"
      request(app)
        .post("/customer/login")
        .send(wrongPassword)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(404)
          expect(res.body).toHaveProperty('error', 'wrong email/password')
          done()
        })
    })
  })
  describe('customer login success', () => {
    test('valid email & password', (done) => {
      let valid_customer = {}
      valid_customer.email = customer2.email
      valid_customer.password = customer2.password
      request(app)
        .post("/customer/login")
        .send(valid_customer)
        .end((err, res) => {
          expect(err).toBeNull()
          expect(res.status).toBe(200)
          expect(res.body.user).toHaveProperty('email', customer2.email)
          expect(res.body.user).toHaveProperty('id', customer2.id)
          expect(res.body.user).toHaveProperty('name', customer2.name)
          expect(res.body.user).toHaveProperty('avaurl', customer2.avaurl)
          expect(res.body.user).toHaveProperty('token', expect.any(String))
          done()
        })
    })
  })
})
