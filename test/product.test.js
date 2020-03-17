"use strict"
if(process.env.NODE_ENV === 'test')require('dotenv').config()
const supertest = require('supertest')
const { queryInterface } = require('../models').sequelize
const app = require('../app')

describe('Product Router', () => {
    const dataRegister = {
        name: 'Adam Primarizki',
        email: 'Adam.primarizki@gmail.com',
        img_url: 'http//migur.com/asdfghjkl',
        password: 'asdasdasd123',
        passwordConfirm: 'asdasdasd123',
        store_name: 'Toko Mita',
        role: 'Admin'
    }
    const dataRegisterEdit = {
        name: 'Adam Primarizki',
        email: 'Adam.primarizki2@gmail.com',
        img_url: 'http//migur.com/asdfghjkl',
        password: 'asdasdasd123',
        passwordConfirm: 'asdasdasd123',
        store_name: 'Toko Mita',
        role: 'Admin'
    }
    const dataRegisterFalse = {
        name: 'Adan',
        email: 'Adan@gmail.com',
        img_url: 'http//migur.com/asdfghjkl',
        password: 'asdasdasd123',
        passwordConfirm: 'asdasdasd123',
        store_name: 'Toko Mita',
        role: 'Staff'
    }
    const dataProduct = {
        name: 'Reality Club Merch Shirt',
        price: 150000,
        stock: 20,
        category: 'shirt',
        description: 'Merch rc keren bgt',
        img_url: 'http//ini.url.gambar'
    }
    afterAll(done => {
        queryInterface.bulkDelete('Users', {})
        .then(_ => { 
            return queryInterface.bulkDelete('Stores', {})
        })
        .then(_ => { 
            return queryInterface.bulkDelete('Products', {})
        })
        .then(_ => done())
        .catch(done)
    })
    
    describe('Adding a product to a store', () => {
        let store_id
        let token
        let product_id
        it('should succesfully add a new product', done => {
            supertest(app)
            .post('/register')
            .send(dataRegister)
            .end((err, res) => {
                store_id = res.body.store_id
                supertest(app)
                .post('/login')
                .send({
                    email: 'Adam.primarizki@gmail.com',
                    password: 'asdasdasd123'
                })
                .end((err, res) => {
                    token = res.body.token
                    supertest(app)
                    .post(`/product/${store_id}`)
                    .set('token', token)
                    .send(dataProduct)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        product_id = res.body.id
                        supertest(app)
                        .post(`/product/${store_id}`)
                        .set('token', token)
                        .send(dataProduct)
                        .expect('Content-Type', /json/)
                        .expect(201)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('id', expect.any(Number))
                            expect(res.body).toHaveProperty('name', dataProduct.name)
                            expect(res.body).toHaveProperty('price', dataProduct.price)
                            expect(res.body).toHaveProperty('stock', dataProduct.stock)
                            expect(res.body).toHaveProperty('category', dataProduct.category)
                            expect(res.body).toHaveProperty('store_id', store_id)
                            expect(res.body).toHaveProperty('description', dataProduct.description)
                            expect(res.body).toHaveProperty('img_url', dataProduct.img_url)
                            done()
                        })
                    })
                })
            })
        })

        it('should return name error', done => {
            supertest(app)
            .post(`/product/${store_id}`)
            .set('token', token)
            .send({...dataProduct, name: ""})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'Please insert the name of the product')
                done()
            })
        })

        it('should return price error', done => {
            supertest(app)
            .post(`/product/${store_id}`)
            .set('token', token)
            .send({...dataProduct, price: null})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'Please insert the price of the product')
                done()
            })
        })

        it('should return price invalid error', done => {
            supertest(app)
            .post(`/product/${store_id}`)
            .set('token', token)
            .send({...dataProduct, price: -10})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'Price not not valid.')
                done()
            })
        })

        it('should return stock error', done => {
            supertest(app)
            .post(`/product/${store_id}`)
            .set('token', token)
            .send({...dataProduct, stock: null})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'Please insert the stock of the product')
                done()
            })
        })

        it('should return stock invalid error', done => {
            supertest(app)
            .post(`/product/${store_id}`)
            .set('token', token)
            .send({...dataProduct, stock: -10})
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'Stock is not valid.')
                done()
            })
        })


    })

    describe('Editing product', () => {
        let store_id
        let token
        let product_id
        it('should succesfully edit a product', done => {
            supertest(app)
            .post('/register')
            .send(dataRegisterEdit)
            .end((err, res) => {
                store_id = res.body.store_id
                supertest(app)
                .post('/login')
                .send({
                    email: 'Adam.primarizki2@gmail.com',
                    password: 'asdasdasd123'
                })
                .end((err, res) => {
                    token = res.body.token
                    supertest(app)
                    .post(`/product/${store_id}`)
                    .set('token', token)
                    .send(dataProduct)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        product_id = res.body.id
                        supertest(app)
                        .put(`/product/${product_id}`)
                        .set('token', token)
                        .send({
                            name: 'Merch metallica',
                            price: 1200000
                        })
                        .expect(200)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('msg', 'Product edited.')
                            done()
                        })
                    })
                })
            })
        })

        it('should return unauthorize', done => {
            supertest(app)
            .post('/register')
            .send(dataRegisterFalse)
            .end((err, res) => {
                supertest(app)
                .post('/login')
                .send({
                    email: 'Adan@gmail.com',
                    password: 'asdasdasd123'
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    const tokenFalse = res.body.token
                    supertest(app)
                    .delete(`/product/${product_id}`)
                    .set('token', tokenFalse)
                    .expect('Content-Type', /json/)
                    .expect(401)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('msg', 'You cannot edit or add product to this store. Please contanct the owner.')
                        done()
                    })
                })
            })
        })
    })
})