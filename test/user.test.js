const request = require('supertest')
const app = require('../app')
const { User,sequelize } = require('../models')
const { queryInterface } = sequelize
const data = {
  email : "adamjay@gmail.com",
  password : "123456",
  RoleId : 1
}

describe('Check Register', () => {
  afterAll((done) => {
    queryInterface.bulkDelete("Users", {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  describe('Register Success', () => {
    test("Register success", async () => {
      try {
        const response = await request(app).post("/register").send(data);
          expect(response.body).toHaveProperty('email',data.email)
          expect(response.body).toHaveProperty('id',expect.any(Number))
          expect(response.body).toHaveProperty('RoleId',expect.any(Number))
          expect(response.status).toBe(201);
      } catch (error) {
          expect(error).toBe(null)
      }
    })
  }),
  describe('Register inVaild',() => {
    test('Register email error, empty', async () => {
      const withOutEmail = {...data}
      delete withOutEmail.email
      try {
        const res = await request(app)
          .post('/register')
          .send(withOutEmail)
            expect(res.body).toHaveProperty('message',expect.any(Array))
            expect(res.body.message).toContain('please insert Email')
            expect(res.status).toBe(400)
        } catch (error) {
            expect(error).toBe(null)
        }
    })
    test('Register email error, not correctly', async () => {
      try {
        const res = await request(app)
        .post('/register')
        .send({
          email : 'adam',
          password: "hiya hiya hiya"
        })
          expect(res.body).toHaveProperty('message',expect.any(Array))
          expect(res.body.message).toContain('Please Insert Email Correctly')
          expect(res.body.message).toHaveLength(1)
          expect(res.status).toBe(400)
      } catch (error) {
          expect(error).toBe(null)
      }
    })
    test('Register password error, not minimum require',(done) => {
      request(app)
        .post('/register')
        .send({
          email : 'adam@gmail.com',
          password: "hiya"
        })
        .end((err,res) => {
          expect(res.body).toHaveProperty('message',expect.any(Array))
          expect(res.body.message).toContain('Please insert Password minimum 6')
          expect(res.body.message).toHaveLength(1)
          expect(res.status).toBe(400)
          done()
        })
    })
    test('Register password error, empty',(done) => {
      request(app)
        .post('/register')
        .send({
          email : 'adam@gmail.com'
        })
        .end((err,res) => {
          expect(res.body).toHaveProperty('message',expect.any(Array))
          expect(res.body.message).toContain('Please insert Password')
          expect(res.body.message).toHaveLength(1)
          expect(res.status).toBe(400)
          done()
        })
    })
    test('Register email and password Empty',(done) => {
      request(app)
        .post('/register')
        .send({})
        .end((err,res) => {
          expect(res.body).toHaveProperty('message',expect.any(Array))
          expect(res.body.message).toContain('Please insert Password')
          expect(res.body.message).toContain('please insert Email')
          expect(res.body.message).toHaveLength(2)
          expect(res.status).toBe(400)
          done()
        })
    })
    test("Register Email dan Password , invalid validation",(done) => {
      request(app)
      .post('/register')
      .send({
        email : "adam",
        password : "hehe"
      })
      .end((err,res) => {
        expect(res.body).toHaveProperty('message',expect.any(Array))
        expect(res.body.message).toContain('Please Insert Email Correctly')
        expect(res.body.message).toContain('Please insert Password minimum 6')
        expect(res.body.message).toHaveLength(2)
        expect(res.status).toBe(400)
        done()
      })
    })
    test("Register Email is already", async () => {
      try {
        const res  =  await request(app).post('/register').send(data)
        console.log(res.body)
        expect(res.body).toHaveProperty('message','Email already registerd')
        expect(res.status).toBe(400)
      } catch (error) {
        expect(error).toBe(null)
      }
    })
  })
})
describe('Check Login', () => {
  beforeEach((done) => {
    User.create({
      email : data.email,
      password : data.password,
      RoleId: 1
    })
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  afterEach((done) => {
    queryInterface.bulkDelete("Users", {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
  describe('Login success', () => {
    test('login success', (done) => {
      request(app)
        .post('/login')
        .send(data)
        .end((err,res) => {
          expect(res.body).toHaveProperty('token',expect.any(String))
          expect(res.status).toBe(200)
          done()
        })
    })
  })
  describe('Login valid', () => {
    test("Login vaild",(done) => {
      request(app)
        .post('/login')
        .send({
          email : data.email,
          password : "datass"
        })
        .end((err,res) => {
          expect(res.body).toHaveProperty('message','email / password wrong')
          expect(res.status).toBe(400)
          done()
        })
    })
  })
})
