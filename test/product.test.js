const request = require('supertest')
const app = require('../app')
const {
    sequelize,
    User,
    Product
} = require('../models')
const {
    queryInterface
} = sequelize

const {
    tokenGenerate
} = require('../helpers/jwt')

let data = {
    name: 'sandal bolong',
    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
    price: 100,
    stock: 10,
    category: 'Lokal',
    description: 'sandal bolong ini'
}

let errorData = {
    name: 'sandal bolong',
    image_url: '/profile_images/1142980748/crocstulisansampingkw20_400x400',
    price: -100,
    stock: 10
}

let productId;
let adminToken;

let UserToken
describe('Product route', () => {
    afterAll((done) => {
            queryInterface.bulkDelete('Products', {})
                .then(() => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
            queryInterface.bulkDelete('Users', {})
                .then(() => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        }),
        beforeAll((done) => {
            let userData = {
                name: 'hilmi',
                email: 'hilmi100@mail.com',
                role: 'Super Admin',
                password: '123456'
            }
            User.create({
                    name: userData.name,
                    role: userData.role,
                    email: userData.email,
                    password: userData.password
                })
                .then(user => {
                    let payload = {
                        id: user.id,
                        email: user.email
                    }
                    UserToken = tokenGenerate(payload)
                    done()
                })
        })
    describe('POST /products', () => {
        describe('Success Process', () => {
            test('Should send an object (id, name, image_url, price, stock) with status code 200', (done) => {
                request(app)
                    .post('/products')
                    .send(data)
                    .set({
                        token: UserToken
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('name', data.name)
                        expect(res.body).toHaveProperty('image_url', data.image_url)
                        expect(res.body).toHaveProperty('category', expect.any(String))
                        expect(res.body).toHaveProperty('description', expect.any(String))
                        expect(res.body).toHaveProperty('price', data.price)
                        expect(res.body).toHaveProperty('stock', data.stock)
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            test('Should send an error with status code 400 because price is < 1', (done) => {
                request(app)
                    .post('/products')
                    .set({
                        token: UserToken
                    })
                    .send(errorData)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('price cannot be less than 0')
                        expect(res.body.errors).toContain('Image Url Is Required')
                        expect(res.body.errors.length).toBe(2)
                        expect(res.status).toBe(400)
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            test('Should send an error with status code 403 because Access token is wrong', (done) => {
                request(app)
                    .post('/products')
                    .set({
                        token: ''
                    })
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Forbidden')
                        expect(res.body.errors.length).toBe(1)
                        expect(res.status).toBe(403)
                        done()
                    })
            })
        })
    })
    describe('GET /products', () => {
        describe('Success Process', () => {
            test('Should send an array of object [{id, name, image_url, price, stock, category, description}] with status code 200', (done) => {
                request(app)
                    .get('/products')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body.length).toBeGreaterThan(0)
                        expect(res.body[0]).toHaveProperty('id', expect.any(Number))
                        expect(res.body[0]).toHaveProperty('name', data.name)
                        expect(res.body[0]).toHaveProperty('image_url', data.image_url)
                        expect(res.body[0]).toHaveProperty('category', expect.any(String))
                        expect(res.body[0]).toHaveProperty('description', expect.any(String))
                        expect(res.body[0]).toHaveProperty('price', data.price)
                        expect(res.body[0]).toHaveProperty('stock', data.stock)
                        done()
                    })
            })
        })
    })
    describe('PUT /products:id', () => {
        beforeEach((done) => {
            Product.create({
                    name: 'sandal bolong',
                    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
                    price: 100,
                    stock: 10,
                    category: 'Import',
                    description: 'ini deskripsi'
                })
                .then(product => {
                    productId = product.id
                    done()
                })
        })
        describe('Success Process', () => {
            test('Should send an object {id, name, image_url, price, stocks} with status code 200', (done) => {
                data = {
                    name: 'New sandal bolong',
                    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
                    price: 100,
                    stock: 15,
                    category: 'Lokal',
                    description: ''
                }
                request(app)
                    .put(`/products/${productId}`)
                    .set({
                        token: UserToken
                    })
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('id', productId)
                        expect(res.body).toHaveProperty('name', data.name)
                        expect(res.body).toHaveProperty('image_url', data.image_url)
                        expect(res.body).toHaveProperty('category', data.category)
                        expect(res.body).toHaveProperty('description', data.description)
                        expect(res.body).toHaveProperty('price', data.price)
                        expect(res.body).toHaveProperty('stock', data.stock)
                        done()
                    })
            })
        })
    })
    describe('DELETE /products:id', () => {
        beforeEach((done) => {
            Product.create({
                    name: 'sandal bolong delete',
                    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
                    price: 100,
                    stock: 15
                })
                .then(product => {
                    productId = product.id
                    done()
                })

            User.create({
                    name: 'admin',
                    role: 'Admin',
                    email: 'admin@mail.com',
                    password: '123456'
                })
                .then(user => {
                    let payload = {
                        id: user.id,
                        email: user.email
                    }
                    adminToken = tokenGenerate(payload)
                    done()
                })
        })
        describe('Success Process', () => {
            test('Should send an object {id, name, image_url, price, stocks} with status code 200', (done) => {
                data = {
                    name: 'sandal bolong delete',
                    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
                    price: 100,
                    stock: 15
                }
                request(app)
                    .delete(`/products/${productId}`)
                    .set({
                        token: UserToken
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('id', expect.any(Number))
                        expect(res.body).toHaveProperty('name', data.name)
                        expect(res.body).toHaveProperty('image_url', data.image_url)
                        expect(res.body).toHaveProperty('price', data.price)
                        expect(res.body).toHaveProperty('stock', data.stock)
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            test('Should send an error with status code 403 because Unauthorized', (done) => {
                request(app)
                    .delete(`/products/${productId}`)
                    .set({
                        token: adminToken
                    })
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('message', 'Bad Request')
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        expect(res.body.errors).toContain('Unauthorized, only Super Admin can do this action!')
                        expect(res.body.errors.length).toBe(1)
                        expect(res.status).toBe(403)
                        done()
                    })
            })
        })
    })
})