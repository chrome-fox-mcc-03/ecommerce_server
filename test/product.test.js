const request = require('supertest') ;
const app = require('../app') ;
const { hashPassword } = require('../helpers/bcrypt') ;
const { sequelize } = require('../models') ;
const { queryInterface } = sequelize ;
let token = ''
let idCreated ;

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
    afterAll((done)=>{
        queryInterface.bulkDelete('Products')
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
        describe ('success case', () => {
            test('respond will return new product with status code (201)', (done)=> {
                let data = {
                    name : 'Sepatu',
                    image_url : '',
                    price : 10000,
                    stock : 10
                }
                request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body.data).toHaveProperty('id', expect.any(Number))
                        expect(res.body.data).toHaveProperty('name', data.name)
                        expect(res.body.data).toHaveProperty('image_url', data.image_url)
                        expect(res.body.data).toHaveProperty('price', data.price)
                        expect(res.body.data).toHaveProperty('stock', data.stock)
                        expect(res.status).toBe(201)
                        idCreated = res.body.data.id ;
                        done()
                    })
            })
        })
        describe('error case', ()=> {
            test('error caused by empty title, with status code 400', (done)=>{
                let data = {
                    name : '',
                    image_url : '',
                    price : 10000,
                    stock : 10
                }
                request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Product's name cannot be empty")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('error caused by price less than 0, with status code 400', (done)=>{
                let data = {
                    name : 'Sepatu',
                    image_url : '',
                    price : -1,
                    stock : 2
                }
                request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Price must be greater than or equal to 0")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('error caused by stock less than 0, with status code 400', (done)=>{
                let data = {
                    name : 'Sepatu',
                    image_url : '',
                    price : 10000,
                    stock : -1
                }
                request(app)
                    .post('/products')
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Stock must be greater than or equal to 0")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('PUT /products', () => {
        describe ('success case', () => {
            test('respond will return updated product with status code (200)', (done)=> {
                let data = {
                    name : 'Tas',
                    image_url : '',
                    price : 30000,
                    stock : 10
                }
                let idToUpdate = idCreated ;
                request(app)
                    .put(`/products/${idToUpdate}`)
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body.data[0]).toHaveProperty('id', expect.any(Number))
                        expect(res.body.data[0]).toHaveProperty('name', data.name)
                        expect(res.body.data[0]).toHaveProperty('image_url', data.image_url)
                        expect(res.body.data[0]).toHaveProperty('price', data.price)
                        expect(res.body.data[0]).toHaveProperty('stock', data.stock)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe('error case', ()=>{
            test('error caused by empty title, with status code 400', (done)=>{
                let data = {
                    name : '',
                    image_url : '',
                    price : 10000,
                    stock : 10
                }
                let idToUpdate = idCreated ;
                request(app)
                    .put(`/products/${idToUpdate}`)
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Product's name cannot be empty")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('error caused by price less than 0, with status code 400', (done)=>{
                let data = {
                    name : 'Sepatu',
                    image_url : '',
                    price : -1,
                    stock : 2
                }
                let idToUpdate = idCreated ;
                request(app)
                    .put(`/products/${idToUpdate}`)
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Price must be greater than or equal to 0")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('error caused by stock less than 0, with status code 400', (done)=>{
                let data = {
                    name : 'Sepatu',
                    image_url : '',
                    price : 10000,
                    stock : -1
                }
                let idToUpdate = idCreated ;
                request(app)
                    .put(`/products/${idToUpdate}`)
                    .set('access_token', token)
                    .send(data)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain("Stock must be greater than or equal to 0")
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('DELETE /products', () => {
        describe ('success case', () => {
            test('respond will return message (deleted) with status code (200)', (done)=> {
                let idToDelete = idCreated ;
                request(app)
                    .put(`/products/${idToDelete}`)
                    .set('access_token', token)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
        describe ('error case', () => {
            test('error caused by product not found, with status code (400)', (done)=> {
                let idToDelete = idCreated + 1 ;
                request(app)
                    .put(`/products/${idToDelete}`)
                    .set('access_token', token)
                    .end((err,res)=>{
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Product not found')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    
})