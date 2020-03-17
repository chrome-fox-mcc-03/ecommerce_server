const request = require('supertest')
const app = require('../app')
const {
    sequelize
} = require('../models')
const {
    queryInterface
} = sequelize
const {
    hashPassword
} = require('../helpers/bcrypt')


let product = {
    name: 'kacang Garuda',
    image_url: 'http://imgurl.com/kacang-garuda.png',
    price: 10000,
    stock: 10
}
let admin = {
    email: 'admin@admin.com',
    password: 'admin123',
}

let user = {
    email: 'user@user.com',
    password: 'user123'
}

describe('Product Route', () => {
    beforeAll((done) => {
        queryInterface.bulkInsert('Users', [{
                email: 'admin@admin.com',
                password: hashPassword('admin123'),
                role: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                email: 'user@user.com',
                password: hashPassword('user123'),
                role: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
            .then(_ => {
                return queryInterface.bulkInsert('Products', [{
                    name: 'Coffee Mix',
                    image_url: 'http://imgurl.com/coffee-mix.png',
                    price: 10000,
                    stock: 10,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }])
            })
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })
    afterAll((done) => {
        return queryInterface.bulkDelete('Users', {})
            .then(_ => {
                return queryInterface.bulkDelete('Products', {})
            })
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })
    let token;
    let product_id;
    describe('Get all product', () => {
        describe('success response', () => {
            test('should return array of all Product', ((done) => {
                request(app)
                    .post('/admin/login')
                    .send(admin)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .get('/products')
                            .set('token', token)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.body).toHaveProperty('data', expect.any(Array))
                                expect(res.body.data[0]).toHaveProperty('id', expect.any(Number))
                                expect(res.body.data[0]).toHaveProperty('name', expect.any(String))
                                expect(res.body.data[0]).toHaveProperty('image_url', expect.any(String))
                                expect(res.body.data[0]).toHaveProperty('price', expect.any(Number))
                                expect(res.body.data[0]).toHaveProperty('stock', expect.any(Number))
                                expect(res.status).toBe(200)
                                done()
                            })
                    })
            }))
        })
        describe('error response', () => {
            test('should return error because not authenticated', ((done) => {
                request(app)
                    .get('/products')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.message).toBe('Please Login First!')
                        expect(res.status).toBe(401)
                        done()
                    })
            }))
        })
    })
    describe('POST a product', () => {
        describe('success response', () => {
            test('should return Object with value Product created', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(product)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('data', expect.any(Object))
                        expect(res.body.data).toHaveProperty('id', expect.any(Number))
                        expect(res.body.data).toHaveProperty('name', expect.any(String))
                        expect(res.body.data).toHaveProperty('image_url', expect.any(String))
                        expect(res.body.data).toHaveProperty('price', expect.any(Number))
                        expect(res.body.data).toHaveProperty('stock', expect.any(Number))
                        expect(res.status).toBe(201)
                        done()
                    })
            }))
        })
        describe('error response', () => {
            test('should return error because not authenticated', ((done) => {
                request(app)
                    .post('/products')
                    .send(product)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.message).toBe('Please Login First!')
                        expect(res.status).toBe(401)
                        done()
                    })
            }))
            test('should return error because name of product null', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        ...product,
                        name: ''
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('name cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            }))
            test('should return error because price of product null', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        ...product,
                        price: null
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Price cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            }))
            test('should return error because price of product has negative value', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        ...product,
                        price: -10000
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Price cannot negative value')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            }))
            test('should return error because stock of product null', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        ...product,
                        stock: null
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Stock cannot be empty')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            }))
            test('should return error because stock of product has negative value', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send({
                        ...product,
                        stock: -1
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Stock at least 1')
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.status).toBe(400)
                        done()
                    })
            }))
        })
    })
    describe('PUT /product/:id', () => {
        describe('success response', () => {
            test('return row number of updated product', ((done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(product)
                    .end((err, res) => {
                        product_id = res.body.data.id
                        request(app)
                            .put(`/products/${product_id}`)
                            .set('token', token)
                            .send({
                                name: 'Updated',
                                price: 1000,
                                stock: 5
                            })
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.body).toHaveProperty('data', expect.any(Array))
                                expect(res.body.data).toContain(1)
                                expect(res.body.data[1][0]).toHaveProperty('id', expect.any(Number))
                                expect(res.body.data[1][0]).toHaveProperty('name', expect.any(String))
                                expect(res.body.data[1][0]).toHaveProperty('image_url', expect.any(String))
                                expect(res.body.data[1][0]).toHaveProperty('price', expect.any(Number))
                                expect(res.body.data[1][0]).toHaveProperty('stock', expect.any(Number))
                                expect(res.status).toBe(200)
                                done()
                            })
                    })
            }))
        })
    })
})