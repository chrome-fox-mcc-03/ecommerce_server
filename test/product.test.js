const request = require('supertest')
const app = require('../app')
const {
    sequelize
} = require('../models')
const {
    queryInterface
} = sequelize

let data = {
    name: 'sandal bolong',
    image_url: 'https://pbs.twimg.com/profile_images/1142980748/crocstulisansampingkw20_400x400.jpg',
    price: 100,
    stock: 10
}

let errorData = {
    name: 'sandal bolong',
    image_url: '/profile_images/1142980748/crocstulisansampingkw20_400x400',
    price: -100,
    stock: 10
}
describe('Product route', () => {
    afterAll((done) => {
            queryInterface.bulkDelete('Products', {})
                .then(() => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        }),
        describe('POST /products', () => {
            describe('Success Process', () => {
                test('Should send an object (id, name, image_url, price, stock) with status code 200', (done) => {
                    request(app)
                        .post('/products')
                        .send(data)
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
                test('Should send an error with status code 400 because price is <1', (done) => {
                    request(app)
                        .post('/products')
                        .send(errorData)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('message', 'Bad Request')
                            expect(res.body).toHaveProperty('errors', expect.any(Array))
                            expect(res.body.errors).toContain('price cannot be less than 0')
                            expect(res.body.errors).toContain('Image Url Is Required')
                            expect(res.body.errors.length).toBeGreaterThan(0)
                            expect(res.status).toBe(400)
                            done()
                        })
                })
            })
        })
    describe('GET /products', () => {
        describe('Success Process', () => {
            test('Should send an array of object [{id, name, image_url, price, stock}] with status code 200', (done) => {
                request(app)
                    .get('/products')
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.status).toBe(200)
                        expect(res.body.length).toBeGreaterThan(0)
                        expect(res.body[0]).toHaveProperty('id', expect.any(Number))
                        expect(res.body[0]).toHaveProperty('name', data.name)
                        expect(res.body[0]).toHaveProperty('image_url', data.image_url)
                        expect(res.body[0]).toHaveProperty('price', data.price)
                        expect(res.body[0]).toHaveProperty('stock', data.stock)
                        done()
                    })
            })
        })
    })

})