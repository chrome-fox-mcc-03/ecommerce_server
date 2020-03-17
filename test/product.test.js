const request = require('supertest')
const app= require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User } = require('../models/index')
const { getToken } = require('../helpers/jwt')

let product = {
    name: 'One Piece Vol 5',
    image_url: 'aaaaaaaaa',
    price: 5000,
    stock: 10,
    genre: 'action'
}
let register = {
    email: 'xavier@hacktiv8.com',
    password: 'hacktiv8',
    name: 'Xavier',
    role: 'admin'
}

let token

describe('Product routes', () => {
    beforeAll((done) => {
        User.create(register)
            .then(user => {
                token = getToken({ id: user.id, name: user.name, email: user.email })
                done()
            })
            .catch(err => done(err))
    })
    describe('POST /product', () => {
            describe('success process', () => {
                test('should send an object of product, with status code 201', (done) => {
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(product)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.status).toBe(201)
                            expect(res.body).toHaveProperty('name', product.name)
                            expect(res.body).toHaveProperty('image_url', product.image_url)
                            expect(res.body).toHaveProperty('genre', product.genre)
                            expect(res.body).toHaveProperty('price', product.price)
                            expect(res.body).toHaveProperty('stock', product.stock)
                            done()
                        })
                })
            })
            describe('errors process', () => {
                test('should send an error with status 400 because missing name', (done) => {
                    const withoutName = {...product}
                    delete withoutName.name
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(withoutName)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('Name is required')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
                test('should send an error with status 400 because missing price', (done) => {
                    const withoutPrice = {...product}
                    delete withoutPrice.price
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(withoutPrice)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('Price is required')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
                test('should send an error with status 400 because price less than 0', (done) => {
                    const priceLessThan0 = {...product, price: -111}
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(priceLessThan0)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('Price cannot be less than 0')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
                test('should send an error with status 400 because missing stock', (done) => {
                    const withoutStock = {...product}
                    delete withoutStock.stock
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(withoutStock)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('Stock is required')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
                test('should send an error with status 400 because stock less than 0', (done) => {
                    const stockLessThan0 = {...product, stock: -111}
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(stockLessThan0)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('Stock cannot be less than 0')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
                test('should send an error with status 400 because missing image_url', (done) => {
                    const withoutImage = {...product}
                    delete withoutImage.image_url
                    request(app)
                        .post('/product')
                        .set('token', token)
                        .send(withoutImage)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('image_url is required')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
            })
    })
    describe('GET /product', () => {
        describe('success process', () => {
            test('should send an array of object, with status code 200', (done) => {
                request(app)
                    .get('/product')
                    .set('token', token)
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })
    describe.only('PATCH /product/:id', () => {
        
    })
})