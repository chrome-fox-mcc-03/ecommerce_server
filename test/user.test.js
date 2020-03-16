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
    afterEach((done)=>{
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
            test('respond will be an object (id, email, role) with status code (201)', (done)=> {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('email', data.email)
                        expect(res.body).toHaveProperty('role', data.role)
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
        })
    })
})