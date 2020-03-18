const request = require("supertest")
const app = require("../app") 

let data = {
    email: 'faa@mail.com',
    password: '123456',
    role: 'customer'
}

describe('User Routes', () => {
    describe('POST /register', () => {
        describe('Success process register user', () => {
            test('it should send an object (id, email, token) with status code 201', done => {
                request(app)
                .post('/register')
                .send(data)
                .end((err, res) => {
                    expect(err).toBe(null)                    
                    expect(res.body).toHaveProperty('id', expect.any(Number))
                    expect(res.body).toHaveProperty('email', data.email)
                    expect(res.body).toHaveProperty('token', expect.any(String))
                    expect(res.status).toBe(201)
                    done()
                })
                 
            })
        })
        describe('POST /Register failed email', () => {
            test('it should send an error with status 400 because of missing email', done => {
                const withoutEmail = {...data}
                delete withoutEmail.email
                request(app)
                    .post('/register')
                    .send(withoutEmail)
                    .end((err,res) => { 
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', [ 'Email cannot be null' ])
                        expect(res.body).toHaveProperty('error', expect.any(Array))
                        expect(res.body.error).toContain('Email cannot be null')
                        expect(res.body.error.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })

            test('it should return an error and status 400 because of invalid email format', (done) => {
                request(app)
                  .post('/register')
                  .send({
                    email: 'ulfa@mail',
                    password: '123456',
                    role: 'customer'
                  })
                  .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error', ["Invalid email format"])
                    expect(response.body).toHaveProperty('error', expect.any(Array))
                    expect(response.body.error).toContain('Invalid email format')
                    expect(response.status).toBe(400)
                    done()
                })
            })

            test('it should return an error and status 400 because of an existing email', (done) => {
                request(app)
                  .post('/register')
                  .send({
                    email: 'ulfa@mail.com',
                    password: '123456',
                    role: 'customer'
                  })
                  .end((err, response) => {
                    expect(err).toBe(null)
                    expect(response.body).toHaveProperty('error', "Email has been registered")
                    expect(response.body).toHaveProperty('error', expect.any(String))
                    expect(response.status).toBe(400)
                    done()
                })
            })
        })

        describe('POST /Register failed password', () => {
             test('it should send an error with status 400 because of missing password', done => {
                    const withoutPassword = {...data}
                    delete withoutPassword.password
                    request(app)
                        .post('/register')
                        .send(withoutPassword)
                        .end((err,res) => { 
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('error', [ 'Password cannot be null' ])
                            expect(res.body).toHaveProperty('error', expect.any(Array))
                            expect(res.body.error).toContain('Password cannot be null')
                            expect(res.body.error.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                    })
                })
    
            test('it should return error with status 400 because of password character less than 6', (done) => {
              request(app)
                .post('/register')
                .send({
                  email: 'ulfa@mail.com',
                  password: '123',
                  role: 'customer'
                })
                .end((err, res) => {
                  expect(err).toBe(null)
                  expect(res.body).toHaveProperty('error', ["Password has at least 6 characters"])
                  expect(res.body).toHaveProperty('error', expect.any(Array))
                  expect(res.body.error).toContain('Password has at least 6 characters')
                  expect(res.status).toBe(400)
                  done()
                })
            })
          })

        describe('POST /Register failed role', () => {
            test('it should return error status 400 because of missing role', (done) => {
              request(app)
                .post('/register')
                .send({
                  email: 'ulfa@mail.com',
                  password: '123456'
                })
                .end((err, response) => {
                  expect(err).toBe(null)
                  expect(response.body).toHaveProperty('error', ["Role cannot be null"])
                  expect(response.body).toHaveProperty('error', expect.any(Array))
                  expect(response.body.error).toContain("Role cannot be null")
                  expect(response.status).toBe(400)
                  done()
                })
            })
    
            test('it should return error and status 400 because of invalid role', (done) => {
              request(app)
                .post('/register')
                .send({
                  email: 'ulfa@mail.com',
                  password: '123456',
                  role: "me"
                })
                .end((err, response) => {
                  expect(err).toBe(null)
                  expect(response.body).toHaveProperty('error', ['Role is only for "customer" and "admin"'])
                  expect(response.body).toHaveProperty('error', expect.any(Array))
                  expect(response.body.error).toContain('Role is only for "customer" and "admin"')
                  expect(response.status).toBe(400)
                  done()
                })
            })
        })
               
    })

    describe('POST /login', () => {
        describe('Success process login', () => {
          test('it should return access token and status 201', (done) => {
            request(app)
              .post('/login')
              .send({
                email: 'faa@mail.com',
                password: '123456'
              })
              .end((err, response) => {    
                expect(err).toBe(null)                                                             
                expect(response.body).toHaveProperty('token', expect.any(String))
                expect(response.status).toBe(200)
                done()
              })
          })
        })
    
        describe('Failed process login', () => {
          test('it should error with invalid email or password', (done) => {
            request(app)
              .post('/login')
              .send({
                email: 'ulfa@mail.com',
                password: '1234567'
              })
              .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('error', "Email or password is wrong")
                expect(response.status).toBe(404)
                done()
              })
          })
    
          test('it should return error with because of unregistered email', (done) => {
            request(app)
              .post('/login')
              .send({
                email: 'ulfaa@mail.com',
                password: '111111'
              })
              .end((err, response) => {
                expect(err).toBe(null)
                expect(response.body).toHaveProperty('error', "Your email address is not registered")
                expect(response.status).toBe(404)
                done()
              })
          })
        })
      })

})