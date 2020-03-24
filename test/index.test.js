const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let data = {
  email: 'email@email.com',
  password: 'emailku',
  role: 'admin'
}

describe('USER TESTING', _ => {
  afterEach((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(_ => {
        done()
      })
      .catch(err => done(err))
  })
  describe('POST /register endpoints', _ => {
    describe('success', _ => {
      test('send email', done => {
        request(app)
          .post('/register')
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('email', data.email)
            expect(res.body).toHaveProperty('role', data.role)
            expect(res.status).toBe(201)
            done()
          })
      })
    })
    describe('error', _ => {
      test('400 is no email/ NULL', done => {
        const notEmail = {...data}
        delete notEmail.email
        request(app)
          .post('/register')
          .send(notEmail)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this email')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 is Empty space', done => {
        const emptySpace = {...data, email = '  '}
        request(app)
          .post('/register')
          .send(emptySpace)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this email')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 there is space', done => {
        const spaceEmail = {...data, email: 'haha @haha. com'}
        request(app)
          .post('/register')
          .send(spaceEmail)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please use Email format')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 is not email', done => {
        const notEmail = {...data, email: "akwakwkakw"}
        request(app)
          .post('/register')
          .send(notEmail)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please use Email format')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 password null', done => {
        const noPass = {...data}
        delete noPass.password
        request(app)
          .post('/register')
          .send(noPass)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this password field')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 password empty', done => {
        const spaceOnly = {...data, password: '    '}
        request(app)
          .post('/register')
          .send(spaceOnly)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this password field')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
            done()
          })
      })
      test('400 length < 5', done => {
        const lengthDa = {...data, password:'122'}
        request(app)
          .post('/register')
          .send(lengthDa)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Minimum length is 5')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
          })
      })
      test('400 role null', done => {
        const nullRole = {...data}
        delete nullRole.role
        request(app)
          .post('/register')
          .send(nullRole)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this role')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
          })
      })
      test('400 empty space', done => {
        const emptySpace = {...data, role: '   '}
        request(app)
          .post('/register')
          .send(emptySpace)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('error', expect.any(Array))
            expect(res.body.error).toContain('Please fill this role')
            expect(res.body.error.length).toBeGreaterThan(0)
            expect(res.status).toBe(400)
          })
      })
    })
  })
  describe('POST /login endpoints', _ => {
    describe('success', _ => {
      test('login', done => {
        request(app)
          .post('/login')
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('email', data.email)
            expect(res.status).toBe(200)
            done()
          })
      })
    })
    describe('error', _ => {
      test('wrong email', done => {
        const wrongDeym = {...data, email: 'wkakwak@gg.com'}
        request(app)
          .post('/login')
          .send(wrongDeym)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Password email is wrong!')
            expect(res.status).toBe(401)
            done()
          })
      })
      test('wrong password', done => {
        const wrongDeym = {...data, password: 'wkakwak'}
        request(app)
          .post('/login')
          .send(wrongDeym)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Password email is wrong!')
            expect(res.status).toBe(401)
            done()
          })
      })
    })
  })
})

describe('Product TEST', _ => {
  afterEach((done) => {
    queryInterface.bulkDelete('Products', {})
      .then(_ => {
        done()
      }).catch(err => done(err))
  })
  describe('POST /catalogues', _ => {
    describe('success', _ => {
      
    })
  })
})