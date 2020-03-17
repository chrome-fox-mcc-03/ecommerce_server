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
            user1.id = result.id;
            done();
        })
        .catch(err => {
            done(err);
        })
    User.create(user2)
        .then(result => {
            user2.access_token = getToken(appPayload(result));
            user2.id = result.id;
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
    describe('user add product', () => {
        describe('add product error', () => {
            test('name null, status 400', (done) => {
                let nullName = {...product1};
                delete nullName.name;
                request(app)
                    .post(`/product`)
                    .send(nullName)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product name is required');
                        done();
                    })
            })
            test('name empty, status 400', (done) => {
                let emptyName = {...product1};
                emptyName.name = '';
                request(app)
                    .post(`/product`)
                    .send(emptyName)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product name is required');
                        done();
                    })
            })
            test('price null, status 400', (done) => {
                let nullPrice = {...product1};
                delete nullPrice.price;
                request(app)
                    .post(`/product`)
                    .send(nullPrice)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product price is required');
                        done();
                    })
            })
            test('price empty, status 400', (done) => {
                let emptyPrice = {...product1};
                emptyPrice.price = '';
                request(app)
                    .post(`/product`)
                    .send(emptyPrice)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(2);
                        expect(res.body.errors).toContain('product price is required');
                        expect(res.body.errors).toContain('invalid price format');
                        done();
                    })
            })
            test('invalid price format, char, status 400', (done) => {
                let charPrice = {...product1};
                charPrice.price  = 'not number';
                request(app)
                    .post(`/product`)
                    .send(charPrice)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('invalid price format');
                        done();
                    })
            })
            test('invalid price format, float, status 400', (done) => {
                let decimalPrice = {...product1};
                decimalPrice.price  = '3.14148183912';
                request(app)
                    .post(`/product`)
                    .send(decimalPrice)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('invalid price format');
                        done();
                    })
            })
            test('invalid price format, negative, status 400', (done) => {
                let negativePrice = {...product1};
                negativePrice.price  = '-3';
                request(app)
                    .post(`/product`)
                    .send(negativePrice)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('price must be positive value or zero');
                        done();
                    })
            })
            test('stock null, status 400', (done) => {
                let nullStock = {...product1};
                delete nullStock.stock;
                request(app)
                    .post(`/product`)
                    .send(nullStock)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product stock is required');
                        done();
                    })
            })
            test('stock empty string, status 400', (done) => {
                let emptyInputStock = {...product1};
                emptyInputStock.stock = '';
                request(app)
                    .post(`/product`)
                    .send(emptyInputStock)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(2);
                        expect(res.body.errors).toContain('product stock is required');
                        expect(res.body.errors).toContain('stock amount must be integer');
                        done();
                    })
            })
            test('invalid stock format, negative, status 400', (done) => {
                let invalidStoc = {...product1};
                invalidStoc.stock = "-3.141317";
                request(app)
                    .post(`/product`)
                    .send(invalidStoc)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(2);
                        expect(res.body.errors).toContain('invalid stock amount');
                        expect(res.body.errors).toContain('stock amount must be integer');
                        done();
                    })
            })
            test('invalid stock format, char, status 400', (done) => {
                let invalidStock = {...product1};
                invalidStock.stock = "not number";
                request(app)
                    .post(`/product`)
                    .send(invalidStock)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('stock amount must be integer');
                        done();
                    })
            })
            test('invalid stock format, float, status 400', (done) => {
                let invalidStoc = {...product1};
                invalidStoc.stock = "3.141317";
                request(app)
                    .post(`/product`)
                    .send(invalidStoc)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('stock amount must be integer');
                        done();
                    })
            })
        });
        describe('add product success', () => {
            test('no img url, product successfully added, status 201', (done) => {
                request(app)
                    .post(`/product`)
                    .send(product1)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(201);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('UserId', user1.id);
                        expect(res.body).toHaveProperty('name', product1.name);
                        expect(res.body).toHaveProperty('price', product1.price);
                        expect(res.body).toHaveProperty('image_url', 'https://via.placeholder.com/150');
                        done();
                    })
            })
            test('img url, product successfully added, status 201', (done) => {
                product1.image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ameiurus_melas_by_Duane_Raver.png/800px-Ameiurus_melas_by_Duane_Raver.png";
                request(app)
                    .post(`/product`)
                    .send(product1)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(201);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('UserId', user1.id);
                        expect(res.body).toHaveProperty('name', product1.name);
                        expect(res.body).toHaveProperty('price', product1.price);
                        expect(res.body).toHaveProperty('image_url', product1.image_url);
                        done();
                    })
            })
        });
    });
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