const request = require('supertest') ;
const app = require('../app') ;
const { sequelize } = require('../models') ;
const { queryInterface } = sequelize ;
const { hashPassword } = require('../helpers/bcrypt') ;

let loginInfo = {
    email : 'admin@admin.com',
    password : 'password'
}

describe ('/admin', () => {
    beforeAll((done)=> {
        queryInterface.bulkInsert('Users', [{
            email : 'admin@admin.com',
            password : hashPassword('password'),
            role : 'admin',
            createdAt : new Date(),
            updatedAt: new Date ()
        }])
            .then((_)=> {
                done()
            })
            .catch((err)=> {
                done(err)
            })
    })
    afterAll((done)=>{
        queryInterface.bulkDelete('Users')
            .then((_)=>{
                done()
            })
            .catch((err)=>{
                done(err)
            })
    })
    describe('POST /admin/login', () => {
        describe('success case', () => {
            test('respond will be an object (access_token) with status code (200)', (done) => {
                request(app)
                .post('/users/login')
                .send(loginInfo)
                .end((err,res)=>{
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('access_token', expect.anything())
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })
        describe('error case', ()=> {
            test('error will have status code 400, because wrong password)', (done) => {
                request(app)
                .post('/users/login')
                .send({
                    email : 'admin@admin.com',
                    password : 'passworda'
                })
                .end((err,res)=>{
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('Wrong email/password')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()  
                })
            })
            test('error will have status code 400, because wrong email)', (done) => {
                request(app)
                .post('/users/login')
                .send({
                    email : 'admina@admin.com',
                    password : 'password'
                })
                .end((err,res)=>{
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('Wrong email/password')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(400)
                    done()  
                })
            })

        })
    })
})