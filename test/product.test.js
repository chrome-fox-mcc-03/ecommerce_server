const request = require('supertest') ;
const app = require('../app') ;
const { hashPassword } = require('../helpers/bcrypt') ;
const { sequelize } = require('../models') ;
const { queryInterface } = sequelize ;
let token = ''

describe('/products', ()=> {
    afterAll((done)=>{
        queryInterface.bulkDelete('Users')
            .then((_)=>{
                token = '' ;
                done()
            })
            .catch((err)=>{
                done(err)
            })
    })
    describe('get token from route users/register', () => {
        test('set token', (done)=> {
            request(app)
                .post('/users/register')
                .send({
                    email : 'admin@admin.com',
                    password : hashPassword('password'),
                    role : 'admin'
                })
                .end((err, res)=> {
                    token = res.body.access_token
                    done()
                })
        })
    })
    describe('GET /products', ()=> {
        describe ('success case', () => {
            test('respond will return all products data with status code (200)', (done)=> {
                request(app)
                .get('/products')
                .set('access_token', token)
                .end((err,res)=>{
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('data', expect.any(Array))
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })
        describe('error case', () => {
            test('error caused by wrong token (not authenticated) with status code (401)', (done)=> {
                request(app)
                .get('/products')
                .set('access_token', 'wrongtoken')
                .end((err,res)=>{
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message', 'Bad Request')
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    expect(res.body.errors).toContain('You are not authenticated')
                    expect(res.body.errors.length).toBeGreaterThan(0)
                    expect(res.status).toBe(401)
                    done()  
                })
            })
        })
    })
    describe('POST /products', () => {
        
    })
})