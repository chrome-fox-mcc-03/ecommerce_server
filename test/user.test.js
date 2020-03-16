const request = require('supertest')
const app = require('../app')

let data = {
  email: 'test@mail.com',
  password: '123456'
}
describe('User routes', () => {
  describe('POST /register', () => {
    describe('success process', () => {
      test('should send an object with status code (201)', (done) => {
        request(app)
          .post('/register')
          .send(data)
          .end((err, res) => {
            expect(err).toBe(null)
            // console.log(res.body.user);
            // expect ==> hasilnya, 
            // toHaveProperty ==> data yang di inputnya, jika tidak tau hasil nya maka 'expect.any(tipe data)'
            expect(res.body.user).toHaveProperty('email', data.email)
            expect(res.body.user).toHaveProperty('id', expect.any(Number))
            expect(res.body.user).toHaveProperty('password', expect.any(String))
            expect(res.status).toBe(201)
            done()
          })
      })
    })
  })
})