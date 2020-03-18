const request = require('supertest')
const { generateToken } = require('../helpers/jwt')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token
let productId

const productImage = `${__dirname}/productImage.jpeg`

beforeAll(done => {
    let input = {
        name: 'Ramadesy',
        email: 'ramadesy@gmail.com',
        password: 'ramadesy1',
    }
    User.create(input)
        .then(user => {
            return User.findOne({
                where: {
                    id: user.id
                }
            })
        })
        .then(user => {
            //set token dari hasil login
            access_token = generateToken({ id: user.id })
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Products', {})
        .then(_ => {
            done()
        }).catch(err => done(err))
})

describe('Product Endpoints', () => {
    describe('success process', () => {
        describe('get products', () => {
            it('should return an object product and status 200', (done) => {
                request(app)
                    .get('/products')
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('products', expect.any(Array))
                        done()
                    })
            })
        })

        describe('create product', () => {
            it('should create a new product', done => {
                request(app)
                    .post(`/products`)
                    .set('access_token', access_token)
                    .attach('image', productImage, { contentType: 'application/octet-stream' })
                    .field('name', 'Hijab Kotak')
                    .field('price', 500000)
                    .field('stock', 108)
                    .field('CategoryId', 1)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(201)
                        expect(res.body).toHaveProperty('product')
                        productId = res.body.product.id
                        done()
                    })
            })
        })

        describe('Get one products success', () => {
            it('should fetch a single product', done => {
                request(app)
                    .get(`/products/${productId}`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('product')
                        done()
                    })
            })
        })

        describe('update product with image', () => {
            it('should update a product with image', done => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', access_token)
                    .attach('image', productImage, { contentType: 'application/octet-stream' })
                    .field('name', 'Hijab Kotak')
                    .field('price', 500000)
                    .field('stock', 108)
                    .field('CategoryId', 1)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('product')
                        productId = res.body.product.id
                        done()
                    })
            })
        })

        describe('update product without image', () => {
            it('should update a product without image', done => {
                request(app)
                    .put(`/products/${productId}`)
                    .set('access_token', access_token)
                    .field('name', 'Hijab Kotak Kotak')
                    .field('price', 500000)
                    .field('stock', 108)
                    .field('CategoryId', 1)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('product')
                        productId = res.body.product.id
                        done()
                    })
            })
        })


        describe('Delete one products success', () => {
            it('should delete a single product', done => {
                request(app)
                    .delete(`/products/${productId}`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        done()
                    })
            })
        })
    })
    describe('error process', () => {
        describe('get products', () => {
            it('should return unauthorized', (done) => {
                request(app)
                    .get('/products')
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(401)
                        expect(res.body).toHaveProperty('error', 'Unauthorized')
                        done()
                    })
            })
        })
        describe('create product', () => {
            it('should return validation error', (done) => {
                request(app)
                    .post('/products')
                    .set('access_token', access_token)
                    .attach('image', productImage, { contentType: 'application/octet-stream' })
                    .field('price', 500000)
                    .field('stock', 108)
                    .field('CategoryId', 1)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
        })

        describe('Get one products error', () => {
            it('should return error not found', done => {
                request(app)
                    .get(`/products/0`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(404)
                        expect(res.body).toHaveProperty('error')
                        done()
                    })
            })
        })

    })


})
