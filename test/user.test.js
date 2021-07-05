const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


let data = {
  email: 'test@mail.com',
  password: '123456'
}
describe('User routes', () => {
  afterEach((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(_ => {
        done()
      }).catch(err => done(err))
  })

  describe('POST /register', () => {
    describe('success process', () => {
      test('should send an object with status code (201)', (done) => {
        request(app)
          .post('/register')
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null)
            // console.log(res.body);
            // expect ==> hasilnya, 
            // toHaveProperty ==> data yang di inputnya, jika tidak tau hasil nya maka 'expect.any(tipe data)'
            expect(res.body).toHaveProperty('token', expect.any(String))
            expect(res.status).toBe(201)
            done()
          })
      })
    })

    describe('error process', () => {
      test('should send an error satus 400 of missing email', (done) => {
        const withoutEmail = { ...data }
        delete withoutEmail.email
        request(app)
          .post('/register')
          .send(withoutEmail)
          .end((err, res) => {
            // console.log(err)
            // console.log(res.body, 'errrroorrrrnya nih');
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('User.email cannot be null')
            expect(res.status).toBe(400)
            done()
          })
      })
    })

    test('should send an error 400 of invalid min password length', (done) => {
      const wrongPass = { ...data, password: 'wrong' }
      request(app)
        .post('/register')
        .send(wrongPass)
        .end((err, res) => {
          // console.log(err);
          // console.log(res.body);
          expect(err).toBe(null)
          expect(res.body).toHaveProperty('message', 'Bad Request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toContain('min. password length 6 character')
          expect(res.status).toBe(400)
          done()
        })
    })
  })

  describe('POST /login', () => {
    describe('success process', () => {
      test('should be send an object with status code 200', (done) => {
        request(app)
          .post('/login')
          .send(data)
          .end((err, res) => {
            // console.log(res.body);
            // console.log(err);
            expect(res.body).toHaveProperty('token', expect.any(String))
            expect(res.status).toBe(200)
            done()
          })
      })
    })

    describe('error process', () => {
      test('should send an error satus 400 of wrong email input', (done) => {
        const wrongEmail = {
          email: 'test1@mail.com',
          password: '123456'
        }
        request(app)
          .post('/login')
          .send(wrongEmail)
          .end((err, res) => {
            // console.log(err)
            // console.log(res.body, 'errrroor nih');
            // console.log(res.status);
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('Invalid email or password')
            expect(res.status).toBe(400)
            done()
          })
      })

      test('should send an error 400 of wrong password input', (done) => {
        const wrongPass = { 
          email: 'test@mail.com',
          password: '132323423'
        }
        request(app)
          .post('/login')
          .send(wrongPass)
          .end((err, res) => {
            console.log(err)
            console.log(res.body, 'errrroor nih');
            console.log(res.status);
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('message', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('Invalid email or password')
            expect(res.status).toBe(400)
            done()
          })
      })
    })
  })

})