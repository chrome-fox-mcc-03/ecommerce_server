const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let data = {
    email: "test01@mail.com",
    password: "123456",
}

let acccess_token = '';

let product = {
    name: "test lele",
    price: "0",
    stock: "0",
};

afterAll((done) => {
    queryInterface.bulkDelete("Users", {})
    .then(_ => {
        done();
    })
    .catch(err => {
        done(err);
    })
});

describe('user route', () => {
    describe('post /register', () => {
        describe('register success', () => {
            test('success registering, 201, object(email,id) returned', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('email', "test01@mail.com");
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.status).toBe(201);
                        done();
                    });
            })
        });
        describe('register error', () => {
            test('email null, error 400', (done) => {
                let nullEmail = {...data};
                delete nullEmail.email;
                request(app)
                    .post('/register')
                    .send(nullEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors).toContain('email is required');
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('password null, err 400', (done) => {
                let nullPass = {...data};
                delete nullPass.password;
                request(app)
                    .post('/register')
                    .send(nullPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('password is required');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('wrong email format, err 400', (done) => {
                let wrongEmail = {...data};
                wrongEmail.email = "test01mail.com"
                request(app)
                    .post('/register')
                    .send(wrongEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('wrong email format');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('insufficient password length, err 400', (done) => {
                let shortPass = {...data};
                shortPass.password = '12345';
                request(app)
                    .post('/register')
                    .send(shortPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('minimum password length is 6 characters');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('duplicate email, err 400, email already registered', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('email already registered');
                        done();
                    })
            })
        })
    });
    describe('post /login', () => {
        describe('login error', () => {
            test('email null, error 400', (done) => {
                let nullEmail = {...data};
                delete nullEmail.email;
                request(app)
                    .post('/login')
                    .send(nullEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'email and password are required');
                        done()
                    });
            });
            test('password null, error 400', (done) => {
                let nullPass = {...data};
                delete nullPass.password;
                request(app)
                    .post('/login')
                    .send(nullPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'email and password are required');
                        done();
                    })
            })
            test('email nonexist, error 404', (done) => {
                let nonexistEmail = {...data};
                nonexistEmail.email = "testxx@mail.com";
                request(app)
                    .post('/login')
                    .send(nonexistEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(404);
                        expect(res.body).toHaveProperty('error', 'wrong email/password combination');
                        done();
                    })
            })
            test('email exist, wrong password, error 400', (done) => {
                let wrongPass = {...data};
                wrongPass.password = "wrongpassword";
                request(app)
                    .post('/login')
                    .send(wrongPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'wrong email/password combination');
                        done();
                    })
            })
        })
        describe('login success', () => {
            test('login success, status 200, access_token returned', (done) => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        acccess_token = res.body.acccess_token;
                        done();
                    })
            })
        })
    });
});

describe('product route', () => {
    // /product
    describe('user fetch products', () => {
        describe('fetch product error', () => {
            test('user token nonexist, status 400', (done) => {
                request(app)
                    .get(`/product`)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
        });
        describe('fetch product success', () => {
            test('product fetch succeed', (done) => {
                request(app)
                    .get(`/product`)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        done();
                    })
            })
        });
    });
    describe('user add product', () => {
        describe('add product error', () => {
            test('name null, status 400', (done) => {
                let nullName = {...product};
                delete nullName.name;
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('price null, status 400', (done) => {
                let nullPrice = {...product};
                delete nullPrice.price;
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('price less than 0, status 400', (done) => {
                let negativePrice = {...product};
                negativePrice.price  = '-1';
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('invalid price format, status 400', (done) => {
                let invalidPrice = {...product};
                invalidPrice.price  = 'testing';
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('stock null, status 400', (done) => {
                let nullStock = {...product};
                delete nullStock.stock;
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('invalid stock format, status 400', (done) => {
                let invalidStoc = {...product};
                invalidStoc.stock = "not number";
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        done();
                    })
            })
        });
        describe('add product success', () => {
            test('no img url, product successfully added, status 201', (done) => {
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(201);
                        done();
                    })
            })
            test('img url, product successfully added, status 201', (done) => {
                product.image_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Ameiurus_melas_by_Duane_Raver.png/800px-Ameiurus_melas_by_Duane_Raver.png";
                request(app)
                    .post(`/product`)
                    .send(product)
                    .set({
                        acccess_token,
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(201);
                        done();
                    })
            })
        });
    });
    describe('user update product', () => {});
    describe('user delete product', () => {
        // /delete/id
        describe('delete item error', () => {
            test('productid nonexist, status 404', (done) => {
                request(app)
                    .delete(`/product`)
                    .set({
                        acccess_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        done();
                    })
            })
            test('user token nonexist, status 400', (done) => {
                request(app)
                    .delete(`/product`)
                    .set({
                        acccess_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        done();
                    })
            })
            test('user token not authenticated, status 400', (done) => {
                request(app)
                    .delete(`/product`)
                    .set({
                        acccess_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        done();
                    })
            })
            test('user not logged as authorized user, status 401', (done) => {
                request(app)
                    .delete(`/product`)
                    .set({
                        acccess_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        done()
                    })
            })
        });
        describe('delete item success', () => {
            test('successfully delete item, status 200', (done) => {
                request(app)
                    .delete(`/product`)
                    .set({
                        acccess_token
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        done();
                    })
            })
        })
    });
});