const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInteface } = sequelize;

let userDummy = {
    email: 'mail1@mail.com',
    password: 'qweqwe'
}
let token = '';
let idDummy;

let productDummy = {
    name: 'akua',
    price: 3500,
    stock: 5
}

describe('Product routes', () => {
    afterAll((done) => {
        queryInteface.bulkDelete('Products', {})
            .then(_ => {
                token = '';
                return queryInteface.bulkDelete('Users', {})
            })
            .then(_ => {
                done();
            })
            .catch(error => done(error));            
    })

    describe('Register dummy account', () => {
        test('should set headers with token', (done) => {
            request(app)
                .post('/users/register')
                .send(userDummy)
                .end((err, res) => {
                    token = res.body.token;
                    done()
                })
        })
    })

    describe('POST /', () => {
        describe('process success', () => {
            test('should return a message with status code 201', (done) => {
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(productDummy)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('name', res.body.name);
                        expect(res.body).toHaveProperty('price', res.body.price);
                        expect(res.body).toHaveProperty('img_url', res.body.img_url);
                        expect(res.body).toHaveProperty('stock', res.body.stock);
                        expect(res.status).toBe(201);
                        idDummy = res.body.id;
                        done();
                    })
            })
        })

        describe('process errors', () => {
            test('should send an error with status 400 because of name is empty', (done) => {
                let noName = { ...productDummy }
                delete noName.name
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(noName)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('name is required');
                        expect(res.status).toBe(400)
                        done();
                    })
            })

            test('should send an error with status 400 because of price is lower than 1', (done) => {
                let noPrice = { ...productDummy, price: -1 }
                
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(noPrice)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('price must be higher than 0');
                        expect(res.status).toBe(400);
                        done();
                    })
            })

            test('should send an error with status 400 because admin didnt input price', (done) => {
                let priceIsNull = { ...productDummy }
                delete priceIsNull.price
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(priceIsNull)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('price is required');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
        })
    })

    describe('GET /', () => {
        describe('process success', () => {
            test('should return all products available with status code 200', (done) => {
                request(app)
                    .get('/products')
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        res.body.forEach(element => {
                            expect(element).toHaveProperty('id', expect.any(Number));
                            expect(element).toHaveProperty('name', element.name);
                            expect(element).toHaveProperty('price', element.price);
                            expect(element).toHaveProperty('img_url', element.img_url);
                            expect(element).toHaveProperty('stock', element.stock);
                        });
                        expect(res.status).toBe(200);
                        done();
                    })
            })
        })
    })

    describe('PUT /', () => {
        describe('process success', () => {
            test('should return products edited with status code 200', (done) => {
                let productEdited = { ...productDummy, name: "ades" }
                request(app)
                    .put(`/products/${idDummy}`)
                    .set('token', token)
                    .send(productEdited)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body[1][0]).toHaveProperty('id', expect.any(Number));
                        expect(res.body[1][0]).toHaveProperty('name', res.body[1][0].name);
                        expect(res.body[1][0]).toHaveProperty('price', res.body[1][0].price);
                        expect(res.body[1][0]).toHaveProperty('img_url', res.body[1][0].img_url);
                        expect(res.body[1][0]).toHaveProperty('stock', res.body[1][0].stock);
                        expect(res.status).toBe(200);
                        done();
                    })
            })
        })
    })

    describe('DELETE /', () => {
        describe('process success', () => {
            test('should return message with status code 200', (done) => {
                request(app)
                    .delete(`/products/${idDummy}`)
                    .set('token', token)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body).toBe(`you've successfully deleted item from your store`);
                        done();
                    })
            })
        })
    })
})

