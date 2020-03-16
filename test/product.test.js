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
    price: 5000,
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
        })

})