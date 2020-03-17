const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;
const { generateToken } = require('../helpers/jwt');
const { User } = require('../models');

let token = '';

describe('Product Routes', () => {
    beforeAll((done) => {
        User.create({
            name: 'User',
            email: 'user@gmail.com',
            password: '123123',
            is_admin: true
        })
            .then(newUser => {
                token = generateToken({ id: newUser.id, email: newUser.email })
                done()
            })
            .catch(err => {
                console.log(err);
            })
    })
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(_ => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    describe.only('POST /products', () => {

        describe('Success Process', () => {
            test('Should return an object (name, image_url, price, stock) with status code 201', (done) => {
                let newProduct = {
                    name: 'Nike Air Jordan 1 Low',
                    image_url: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/jk6pwv5o9uos8n2ruecy/air-jordan-1-low-shoe-6Q1tFM.jpg',
                    price: 1429000,
                    stock: 50
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(newProduct)
                    .end((err, res) => {
                        console.log('token ====> ',token);
                        
                        expect(res.body).toHaveProperty('name', expect.any(String))
                        expect(res.body).toHaveProperty('image_url', expect.any(String))
                        expect(res.body).toHaveProperty('price', expect.any(Number))
                        expect(res.body).toHaveProperty('stock', expect.any(Number))
                        // expect(res.body.stock).toBeGreaterThanOrEqual(0);
                        expect(res.status).toBe(201)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
    describe('GET /products', () => {
        beforeEach((done) => {
            queryInterface.bulkInsert('Products', [{
                name: 'Converse Chuck Taylor All Star',
                image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7306ff94/images/a_107/M7650_A_107X1.jpg?sw=964',
                price: 629000,
                stock: 150,
                createdAt: new Date(),
                updatedAt: new Date()
            }, {
                name: 'Adidas Ultraboost 20',
                image_url: 'https://static.shop.adidas.co.id/media/catalog/product/cache/2/small_image/250x/9df78eab33525d08d6e5fb8d27136e95/E/G/EG1342_SL_eCom.jpg',
                price: 3000000,
                stock: 35,
                createdAt: new Date(),
                updatedAt: new Date()
            }])
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })
        describe('Success Process', () => {
            test('Should return an array of object (name, image_url, price, stock) with status code 200', (done) => {
                request(app)
                    .get('/products')
                    .set('token', 'eqrjqpwpq229eiq091jopq.fsafa+09fdj')
                    .end((err, res) => {
                        console.log('//------>>>', res.body);
                        console.log('++__++__++ ', res.headers);
                        expect.any(Array)
                        expect(res.status).toBe(200)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
    describe('UPDATE /products', () => {
        describe('Success Process', () => {
            test('Should return an object (name, image_url, price, stock) with status code 200', (done) => {
                let update = {
                    name: 'Nike Air Jordan 2 Low',
                    image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw7306ff94/images/a_107/M7650_A_107X1.jpg?sw=964',
                    price: 1429000,
                    stock: 100
                }
                request(app)
                    .put('/products/12')
                    .send(update)
                    .end((err, res) => {
                        console.log('//////////', res.body);
                        expect(res.body).toHaveProperty('name', expect.any(String))
                        expect(res.body).toHaveProperty('image_url', expect.any(String))
                        expect(res.body).toHaveProperty('price', expect.any(Number))
                        expect(res.body).toHaveProperty('stock', expect.any(Number))
                        expect(res.status).toBe(200)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
    })
})