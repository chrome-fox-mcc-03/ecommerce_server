const request = require('supertest')
const app= require('../app')
const { sequelize } = require('../models/index')
const { queryInterface } = sequelize
const { User, Product } = require('../models/index')
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
let comic

describe('Product routes', () => {
    describe('POST /product', () => {
        beforeAll((done) => {
            User.create(register)
                .then(user => {
                    token = getToken({ id: user.id, name: user.name, email: user.email })
                    product.AdminId = user.id
                    return Product.create(product)
                })
                .then(response => {
                    comic = response
                    done()
                })
                .catch(err => done(err))
        })
        afterAll(done => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => {
                    return queryInterface.bulkDelete('products', {})
                })
                .then(_ => done())
                .catch(err => done(err))
        })
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
            test('should send an error with status 400 because price less than 1', (done) => {
                const priceLessThan0 = {...product, price: -111}
                request(app)
                    .post('/product')
                    .set('token', token)
                    .send(priceLessThan0)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Price cannot be less than 1')
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
            test('should send an error with status 400 because stock less than 1', (done) => {
                const stockLessThan0 = {...product, stock: -980}
                request(app)
                    .post('/product')
                    .set('token', token)
                    .send(stockLessThan0)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Stock cannot be less than 1')
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
                        expect(res.body.errors).toContain('Image is required')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
    })
    describe('GET /product', () => {
        beforeAll((done) => {
            User.create(register)
                .then(user => {
                    token = getToken({ id: user.id, name: user.name, email: user.email })
                    product.AdminId = user.id
                    return Product.create(product)
                })
                .then(response => {
                    comic = response
                    done()
                })
                .catch(err => done(err))
        })
        afterAll(done => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => {
                    return queryInterface.bulkDelete('products', {})
                })
                .then(_ => done())
                .catch(err => done(err))
        })
        describe('success process', () => {
            test('should send an array of object, with status code 200', (done) => {
                request(app)
                    .get('/product')
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })
    })
    describe('PATCH /product/:id', () => {
        beforeAll((done) => {
            User.create(register)
                .then(user => {
                    token = getToken({ id: user.id, name: user.name, email: user.email })
                    product.AdminId = user.id
                    return Product.create(product)
                })
                .then(response => {
                    comic = response
                    done()
                })
                .catch(err => done(err))
        })
        afterAll(done => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => {
                    return queryInterface.bulkDelete('products', {})
                })
                .then(_ => done())
                .catch(err => done(err))
        })
        describe('success process', () => {
            test('should send an object of product, with status code 200', (done) => {
                const productUpdate = {... product, name: 'One Piece vol 10', image_url: 'bbbbbbbbb'}
                request(app)
                    .patch(`/product/${comic.id}`)
                    .set('token', token)
                    .send(productUpdate)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('name', productUpdate.name)
                        expect(res.body).toHaveProperty('image_url', productUpdate.image_url)
                        expect(res.body).toHaveProperty('genre', productUpdate.genre)
                        expect(res.body).toHaveProperty('price', productUpdate.price)
                        expect(res.body).toHaveProperty('stock', productUpdate.stock)
                        done()
                    })
            })
        })
        describe('error process', () => {
            test('should send an error with status 400 because price less than 1', (done) => {
                const priceLessThan0 = {...product, price: -111}
                request(app)
                    .patch(`/product/${comic.id}`)
                    .set('token', token)
                    .send(priceLessThan0)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Price cannot be less than 1')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 400 because stock less than 1', (done) => {
                const stockLessThan0 = {...product, stock: -980}
                request(app)
                    .patch(`/product/${comic.id}`)
                    .set('token', token)
                    .send(stockLessThan0)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Stock cannot be less than 1')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
            test('should send an error with status 404 because product not found', (done) => {
                request(app)
                    .patch(`/product/10000`)
                    .set('token', token)
                    .send(product)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Product not found')
                        expect(res.status).toBe(404)
                        done()
                    })
            })
        })
    })
    describe('DELETE /product/:id', () => {
        beforeAll((done) => {
            User.create(register)
                .then(user => {
                    token = getToken({ id: user.id, name: user.name, email: user.email })
                    product.AdminId = user.id
                    return Product.create(product)
                })
                .then(response => {
                    comic = response
                    done()
                })
                .catch(err => done(err))
        })
        afterAll(done => {
            queryInterface.bulkDelete('Users', {})
                .then(_ => {
                    return queryInterface.bulkDelete('products', {})
                })
                .then(_ => done())
                .catch(err => done(err))
        })
        describe('success process', () => {
            test('should send an object of product, with status code 200', (done) => {
                request(app)
                    .delete(`/product/${comic.id}`)
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty('name', product.name)
                        expect(res.body).toHaveProperty('image_url', product.image_url)
                        expect(res.body).toHaveProperty('genre', product.genre)
                        expect(res.body).toHaveProperty('price', product.price)
                        expect(res.body).toHaveProperty('stock', product.stock)
                        done()
                    })
            })
        })
        describe('error process', () => {
            test('should send an error with status 404 because product not found', (done) => {
                request(app)
                    .delete(`/product/10000`)
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('error', 'Product not found')
                        expect(res.status).toBe(404)
                        done()
                    })
            })
        })
    })
})