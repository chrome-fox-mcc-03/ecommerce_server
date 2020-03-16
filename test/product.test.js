const request = require('supertest');
const app = require('../app');
const { sequelize, User, Product } = require('../models');
const { queryInterface } = sequelize;
const { getToken } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');

let user1 = {
    email: "test01@mail.com",
    password: "123456",
}
let user2 = {
    email: "test02@mail.com",
    password: "123456",
}

let product1 = {
    name: "test lele",
    price: "0",
    stock: "0",
};
let product2 = {
    name: "test lele",
    price: "0",
    stock: "0",
};

beforeAll((done) => {
    User.create(user1)
    .then(result => {
        user1.access_token = getToken(appPayload(result));
        done();
    })
    .catch(err => {
        done(err);
    })
    User.create(user2)
    .then(result => {
        user2.access_token = getToken(appPayload(result));
        done();
    })
    .catch(err => {
        done(err);
    })
});

afterAll((done) => {
    queryInterface.bulkDelete("Users", {})
    .then(_ => {
        done();
    })
    .catch(err => {
        done(err);
    })

    queryInterface.bulkDelete("Products", {})
    .then(_ => {
        done();
    })
    .catch(err => {
        done(err);
    })
});

describe('product route', () => {
    // /product
    describe('user fetch products', () => {
        describe('fetch product error', () => {
            test('user token nonexist, status 401', (done) => {
                request(app)
                    .get(`/product`)
                    .set({})
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401);
                        expect(res.body).toHaveProperty('error', 'please login as valid user')
                        done();
                    })
            })
            test('user token invalid, status 401', (done) => {
                request(app)
                    .get(`/product`)
                    .set({
                        access_token: "wrong token",
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401);
                        expect(res.body).toHaveProperty('error', 'please login as valid user')
                        done();
                    })
            })
        });
        describe('fetch product success', () => {
            test('product fetch succeed', (done) => {
                request(app)
                    .get(`/product`)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('products', expect.any(Array));
                        done();
                    })
            })
        });
    });
    // describe('user add product', () => {
    //     describe('add product error', () => {
    //         test('name null, status 400', (done) => {
    //             let nullName = {...product};
    //             delete nullName.name;
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //         test('price null, status 400', (done) => {
    //             let nullPrice = {...product};
    //             delete nullPrice.price;
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //         test('price less than 0, status 400', (done) => {
    //             let negativePrice = {...product};
    //             negativePrice.price  = '-1';
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //         test('invalid price format, status 400', (done) => {
    //             let invalidPrice = {...product};
    //             invalidPrice.price  = 'testing';
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //         test('stock null, status 400', (done) => {
    //             let nullStock = {...product};
    //             delete nullStock.stock;
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //         test('invalid stock format, status 400', (done) => {
    //             let invalidStoc = {...product};
    //             invalidStoc.stock = "not number";
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(400);
    //                     done();
    //                 })
    //         })
    //     });
    //     describe('add product success', () => {
    //         test('no img url, product successfully added, status 201', (done) => {
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(201);
    //                     done();
    //                 })
    //         })
    //         test('img url, product successfully added, status 201', (done) => {
    //             product.image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ameiurus_melas_by_Duane_Raver.png/800px-Ameiurus_melas_by_Duane_Raver.png";
    //             request(app)
    //                 .post(`/product`)
    //                 .send(product)
    //                 .set({
    //                     acccess_token,
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     expect(res.status).toBe(201);
    //                     done();
    //                 })
    //         })
    //     });
    // });
    // describe('user update product', () => {});
    // describe('user delete product', () => {
    //     // /delete/id
    //     describe('delete item error', () => {
    //         test('productid nonexist, status 404', (done) => {
    //             request(app)
    //                 .delete(`/product`)
    //                 .set({
    //                     acccess_token
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     done();
    //                 })
    //         })
    //         test('user token nonexist, status 400', (done) => {
    //             request(app)
    //                 .delete(`/product`)
    //                 .set({
    //                     acccess_token
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     done();
    //                 })
    //         })
    //         test('user token not authenticated, status 400', (done) => {
    //             request(app)
    //                 .delete(`/product`)
    //                 .set({
    //                     acccess_token
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     done();
    //                 })
    //         })
    //         test('user not logged as authorized user, status 401', (done) => {
    //             request(app)
    //                 .delete(`/product`)
    //                 .set({
    //                     acccess_token
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     done()
    //                 })
    //         })
    //     });
    //     describe('delete item success', () => {
    //         test('successfully delete item, status 200', (done) => {
    //             request(app)
    //                 .delete(`/product`)
    //                 .set({
    //                     acccess_token
    //                 })
    //                 .end((err, res) => {
    //                     expect(err).toBeNull();
    //                     done();
    //                 })
    //         })
    //     })
    // });
});