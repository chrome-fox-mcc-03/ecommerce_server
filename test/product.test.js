const request = require('supertest');
const app = require('../app');
const { sequelize, User, Product } = require('../models');
const { queryInterface } = sequelize;
const { getToken } = require('../helpers/jwt');
const appPayload = require('../helpers/appPayload');

let product1 = {
    name: "test lele",
    price: "0",
    stock: "0",
};
let copyOfProduct1 = {...product1}

let user2 = {
    email: "test02@mail.com",
    password: "123456",
}
let user1 = {
    email: "test01@mail.com",
    password: "123456",
}

beforeAll((done) => {
    // beforeAll executed first but didnt wait User.create() to resolve
    // so access_token are unavailable through all the following test 
    // resolved with mocking register test :+1:
    User.create(user2)
        .then(result => {
            user2.id = result.id;
            user2.access_token = getToken(appPayload(result));
            return queryInterface.bulkInsert('Products', [
                {
                    name: 'product test 01',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '13',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 02',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '15',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 03',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '17',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 04',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '19',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 05',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 06',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 07',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 08',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 09',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 10',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 11',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 12',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 13',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 14',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 15',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 16',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 17',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 18',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 19',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 20',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    name: 'product test 21',
                    image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
                    price: '1000',
                    stock: '10',
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});
        })
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete("Users", {})
        .then(_ => {
            return queryInterface.bulkDelete("Products", {})
        })
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        })
});

describe('user register', () => {
    test('user register', (done) => {
        request(app)
            .post('/register')
            .send(user1)
            .end((err, res) => {
                expect(err).toBeNull();
                expect(res.status).toBe(201);
                expect(res.body).toHaveProperty('email', user1.email);
                expect(res.body).toHaveProperty('id', expect.any(Number));
                expect(res.body).toHaveProperty('access_token', expect.any(String));
                user1.access_token = res.body.access_token;
                user1.id = res.body.id
                done();
            })
    })
})

describe('product route', () => {
    // /product
    describe('user fetch products', () => {
        describe('fetch product error', () => {
            test('user token nonexist, status 401', (done) => {
                let userNoToken = {...user1};
                delete userNoToken.access_token;

                request(app)
                    .get(`/product`)
                    .set({
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401);
                        expect(res.body).toHaveProperty('error', 'please login as valid user')
                        done();
                    })
            })
            test('user token invalid, status 401', (done) => {
                let userInvalidToken = {...user1};
                userInvalidToken.access_token = 'wrong_token'
                request(app)
                    .get(`/product`)
                    .set({
                        access_token: userInvalidToken.access_token,
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
                let validUser = {...user1}
                request(app)
                    .get(`/product`)
                    .set({
                        access_token: validUser.access_token,
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
                        expect(res.body).toHaveProperty('name', product1.name);
                        expect(res.body).toHaveProperty('price', product1.price);
                        expect(res.body).toHaveProperty('image_url', 'https://via.placeholder.com/150');
                        product1 = {...res.body}
                        done();
                    })
            })
            test('img url, product successfully added, status 201', (done) => {
                copyOfProduct1 = {...product1}
                copyOfProduct1.image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ameiurus_melas_by_Duane_Raver.png/800px-Ameiurus_melas_by_Duane_Raver.png";
                request(app)
                    .post(`/product`)
                    .send(copyOfProduct1)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(201);
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.body).toHaveProperty('name', copyOfProduct1.name);
                        expect(res.body).toHaveProperty('price', copyOfProduct1.price);
                        expect(res.body).toHaveProperty('image_url', copyOfProduct1.image_url);
                        done();
                    })
            })
        });
    })
    describe('user update product', () => {
        // product/id
        describe('user update product error', () => {
            test('user token nonexist, error 401', (done) => {
                let item = {...product1}
                request(app)
                    .put(`/product/${item.id}`)
                    .send(item)
                    .set({
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401);
                        done();
                    })
            })
            test('invalid user token, error 401', (done) => {
                let item = {...product1}
                let invalidUser = {...user1}
                invalidUser.access_token = "wrong token"
                request(app)
                    .put(`/product/${item.id}`)
                    .send(item)
                    .set({
                        access_token: invalidUser.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401);
                        done();
                    })
            })
            test('valid user with nonexist item id, error 404', (done) => {
                // 404, "item not found"
                let nonExistItem = {...product1}
                nonExistItem.id = nonExistItem.id + 99
                let validUser = {...user1}
                request(app)
                    .put(`/product/${nonExistItem.id}`)
                    .send(nonExistItem)
                    .set({
                        access_token: validUser.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(404);
                        expect(res.body).toHaveProperty('error', 'item not found')
                        done();
                    })
            })
            test('valid user, item name null', (done) => {
                let user = {...user1}
                let nullName = {...product1}
                nullName.name = null
                request(app)
                    .put(`/product/${nullName.id}`)
                    .send(nullName)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product name is required');
                        done()
                    })
            })
            test('valid user, item name empty', (done) => {
                let user = {...user1}
                let emptyName = {...product1}
                emptyName.name = ''
                request(app)
                    .put(`/product/${emptyName.id}`)
                    .send(emptyName)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product name is required');
                        done()
                    })
            })
            test('valid user, item price null', (done) => {
                let user = {...user1}
                let nullPrice = {...product1}
                nullPrice.price = null
                request(app)
                    .put(`/product/${nullPrice.id}`)
                    .send(nullPrice)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product price is required');
                        done()
                    })
            })
            test('valid user, item price empty', (done) => {
                let user = {...user1}
                let emptyPrice = {...product1}
                emptyPrice.price = ''
                request(app)
                    .put(`/product/${emptyPrice.id}`)
                    .send(emptyPrice)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(2);
                        expect(res.body.errors).toContain('invalid price format');
                        expect(res.body.errors).toContain('product price is required');
                        done()
                    })
            })
            test('valid user, item price invalid', (done) => {
                let user = {...user1}
                let invalidPrice = {...product1}
                invalidPrice.price = 'n0t number'
                request(app)
                    .put(`/product/${invalidPrice.id}`)
                    .send(invalidPrice)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('invalid price format');
                        done()
                    })
            })
            test('valid user, item price negative', (done) => {
                let user = {...user1}
                let negativePrice = {...product1}
                negativePrice.price = '-1'
                request(app)
                    .put(`/product/${negativePrice.id}`)
                    .send(negativePrice)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('price must be positive value or zero');
                        done()
                    })
            })
            test('valid user, item stock null', (done) => {
                let user = {...user1}
                let nullStock = {...product1}
                nullStock.stock = null
                request(app)
                    .put(`/product/${nullStock.id}`)
                    .send(nullStock)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('product stock is required'); 
                        done()
                    })
            })
            test('valid user, item stock empty', (done) => {
                let user = {...user1}
                let emptyStock = {...product1}
                emptyStock.stock = ''
                request(app)
                    .put(`/product/${emptyStock.id}`)
                    .send(emptyStock)
                    .set({
                        access_token: user.access_token
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
            test('valid user, item stock invlaid', (done) => {
                let user = {...user1}
                let invalidStock = {...product1}
                invalidStock.stock = 'not number'
                request(app)
                    .put(`/product/${invalidStock.id}`)
                    .send(invalidStock)
                    .set({
                        access_token: user.access_token
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
            test('valid user, item stock negative', (done) => {
                let user = {...user1}
                let negativStock = {...product1}
                negativStock.stock = '-1'
                request(app)
                    .put(`/product/${negativStock.id}`)
                    .send(negativStock)
                    .set({
                        access_token: user.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', "bad request");
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBe(1);
                        expect(res.body.errors).toContain('invalid stock amount');
                        done();
                    })
            })
            test('valid user, valid item id, invalid image format, status 200', (done) => {
                // 404, "item not found"
                let invalidUrl = {...product1}
                invalidUrl.image_url = "not url"
                let validUser = {...user1}
                request(app)
                    .put(`/product/${invalidUrl.id}`)
                    .send(invalidUrl)
                    .set({
                        access_token: validUser.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body.errors.length).toBe(1)
                        expect(res.body.errors).toContain('invalid image url')
                        done();
                    })
            })
        })
        describe('user update product success', () => {
            test('valid user valid item id, status 200', (done) => {
                let validItem = {...product1}
                let validUser = {...user1}
                request(app)
                    .put(`/product/${validItem.id}`)
                    .send(validItem)
                    .set({
                        access_token: validUser.access_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('message', 'edit success')
                        done();
                    })
            })
        })
    });
    describe('user delete product', () => {
        // /delete/id
        describe('delete item error', () => {
            test('productid nonexist, status 404', (done) => {
                let nonexistId = product1.id + 99
                request(app)
                    .delete(`/product/${nonexistId}`)
                    .set({
                        access_token: user1.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(404)
                        done();
                    })
            })
            test('user token nonexist, status 401', (done) => {
                let willRemoved = {...product1}
                request(app)
                .delete(`/product/${willRemoved.id}`)
                    .set({
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401)
                        done();
                    })
            })
            test('user token not authenticated, status 401', (done) => {
                let differentToken = {...user1}
                differentToken.access_token = "wrong_token"
                let willRemoved = {...product1}
                request(app)
                .delete(`/product/${willRemoved.id}`)
                    .set({
                        access_token: differentToken.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401)
                        done();
                    })
            })
            test('user not logged as authorized user, status 401', (done) => {
                let notAuthorized = {...user1}
                notAuthorized.id = notAuthorized.id + 1
                notAuthorized.email = notAuthorized.email + ".com"
                notAuthorized.access_token = getToken(appPayload(notAuthorized))
                let willRemoved = {...product1}
                request(app)
                .delete(`/product/${willRemoved.id}`)
                    .set({
                        access_token: notAuthorized.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(401)
                        done()
                    })
            })
        })
        describe('delete item success', () => {
            test('successfully delete item, status 200', (done) => {
                let willRemoved = {...product1}
                let validUser = {...user1}
                request(app)
                    .delete(`/product/${willRemoved.id}`)
                    .set({
                        access_token: validUser.access_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull()
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('id', product1.id);
                        expect(res.body).toHaveProperty('name', product1.name);
                        expect(res.body).toHaveProperty('price', product1.price);
                        expect(res.body).toHaveProperty('image_url', product1.image_url);
                        done()
                    })
            })
        })
    })
})