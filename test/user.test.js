const request = require('supertest') ;
const app = require('../app') ;
const { sequelize } = require('../models') ;
const { queryInterface } = sequelize ;

let data = {
    email : 'admin@mail.com',
    password : 'password',
    role : 'admin'
} ;

describe('/users', () => {
    afterAll((done)=>{
        queryInterface.bulkDelete('Users')
            .then((_)=>{
                done()
            })
            .catch((err)=>{
                done(err)
            })
    })
    describe('POST /users/register', ()=> {
        describe('success case', () => {
            test('respond will be an object (access_token) with status code (201)', (done)=> {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('access_token', expect.anything())
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
        describe('error case', () => {
            test('error will have status code 400, because missing email value', (done)=> {
                const withoutEmail = { ...data}
                delete withoutEmail.email
                request(app)
                    .post('/users/register')
                    .send(withoutEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Email cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because email has been used', (done)=> {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('email must be unique')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })

            //    : Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Error:


            test('error will have status code 400, because email is invalid', (done)=> {
                const invalidEmail = { ...data}
                invalidEmail.email = 'noemail'
                request(app)
                    .post('/users/register')
                    .send(invalidEmail)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Invalid email address')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because missing password value', (done)=> {
                const withoutPassword = { ...data}
                delete withoutPassword.password
                request(app)
                    .post('/users/register')
                    .send(withoutPassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because password has less than 6 characters', (done)=> {
                const lessPassword = { ...data}
                lessPassword.password = 'less'
                request(app)
                    .post('/users/register')
                    .send(lessPassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password atleast has 6 characters')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because password is empty string', (done)=> {
                const emptyPassword = { ...data}
                emptyPassword.password = ''
                request(app)
                    .post('/users/register')
                    .send(emptyPassword)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Password cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because role is empty string', (done)=> {
                const emptyRole = { ...data}
                emptyRole.role = ''
                request(app)
                    .post('/users/register')
                    .send(emptyRole)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Role cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
            test('error will have status code 400, because missing role value', (done)=> {
                const withoutRole = { ...data}
                delete withoutRole.role
                request(app)
                    .post('/users/register')
                    .send(withoutRole)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Role cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()  
                    })
            })
        })
    })
})