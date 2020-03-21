const request = require('supertest')
const app = require('../app')
const { User } = require('../models');
const jwt = require('../helpers/jwt');
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let data = {
    name: "Masker",
    image_url: undefined,
    description: "mahal",
    price: "400000",
    stock: 2
}
let dataId = null;

let userData = {
    email: "udin@mail.com",
    password: "qweqwe",
    name: "udin",
    role: 0
}

let adminData = {
    email: "jamal@mail.com",
    password: "qweqwe",
    name: "jamal",
    role: 1
}

let token = null;
let adminToken = null;



describe('Product routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })
    beforeAll((done) => {
        User.create(userData)
            .then((result) => {
                let payload = {
                    id: result.id,
                    role: result.role
                }
                token = jwt.createToken(payload);
                done()
            }).catch((err) => {
                console.log(err);
                done(err)
            });
    });
    beforeAll((done) => {
        User.create(adminData)
            .then((result) => {
                let payload = {
                    id: result.id,
                    role: result.role
                }
                adminToken = jwt.createToken(payload);
                done()
            }).catch((err) => {
                console.log(err);
                done(err)
            });
    });
    beforeAll((done) => {
        queryInterface.bulkDelete('Products', {})
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    });

    // get null data
    test('failed get product (no data in db) with status 404 and obj {message}', (done) => {
        request(app)
            .get('/product')
            .set('token', token)
            .end((err, res) => {
                // console.log(res.body, "<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>");
                expect(err).toBe(null)
                expect(res.status).toBe(404)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })

    // create
    test('success create product with status 201 and obj {id, name, ...}', (done) => {
        request(app)
            .post('/product')
            .set('token', adminToken)
            .send(data)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('data')
                expect(res.body.data).toHaveProperty('id')
                dataId = res.body.data.id
                done()
            })
    })
    test('failed create product without header with status 401 and obj {message}', (done) => {
        request(app)
            .post('/product')
            .send(data)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('failed create product with role user with status 401 and obj {message}', (done) => {
        request(app)
            .post('/product')
            .set('token', token)
            .send(data)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('failed create product with invalid data with status 400 and obj {message}', (done) => {
        let newData = { ...data }
        delete newData.name
        request(app)
            .post('/product')
            .set('token', adminToken)
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })

    // get product
    test('success get product with status 200 and obj {data}', (done) => {
        request(app)
            .get('/product')
            .set('token', token)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('data')
                done()
            })
    }),
    test('failed get product without header with status 401 and obj {message}', (done) => {
        request(app)
            .get('/product')
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })

    // update product
    test('success update product with status 200 and obj {token}', (done) => {
        let newData = { ...data }
        newData.name = "Pen";
        request(app)
            .put('/product/' + dataId)
            .set('token', adminToken)
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('data')
                done()
            })
    })
    test('failed update product without header and status 400 and obj {message}', (done) => {
        let newData = { ...data }
        newData.name = "book";
        request(app)
            .put('/product/' + dataId)
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('failed update product with role user and status 400 and obj {message}', (done) => {
        let newData = { ...data }
        newData.name = "book";
        request(app)
            .put('/product/' + dataId)
            .set('token', token)
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('failed update product with status 400 and obj {message}', (done) => {
        let newData = { ...data }
        newData.name = "book";
        request(app)
            .put('/product/asd')
            .set('token', adminToken)
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    // delete product
    test('failed delete product without header and status 200 and obj {token}', (done) => {
        request(app)
            .delete('/product/' + dataId)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('success delete product with role user and status 200 and obj {token}', (done) => {
        request(app)
            .delete('/product/' + dataId)
            .set('token', token)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(401)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    test('success delete product with status 200 and obj {token}', (done) => {
        request(app)
            .delete('/product/' + dataId)
            .set('token', adminToken)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('data')
                done()
            })
    })
    test('failed delete product with status 400 and obj {message}', (done) => {
        request(app)
            .delete('/product/asd')
            .set('token', adminToken)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
})
