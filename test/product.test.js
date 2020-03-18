const request = require('supertest')
const app = require('../app')
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

describe('Product routes', () => {
    // afterEach((done) => {
    //     queryInterface.bulkDelete('Products', {})
    //         .then(_ => {
    //             done()
    //         })
    //         .catch(err => done(err))
    // })
    // create
    test('success create product with status 201 and obj {id, name, ...}', (done) => {
        request(app)
            .post('/product')
            .send(data)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('data')
                expect(res.body.data).toHaveProperty('id')
                dataId = res.body.data.id
                done()
            })
    }),
    test('failed create product with status 400 and obj {message}', (done) => {
        let newData = { ...data }
        delete newData.name
        request(app)
            .post('/product')
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    }),
    // // get product
    test('success get product with status 200 and obj {token}', (done) => {
        request(app)
            .get('/product')
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('data')
                done()
            })
    }),
    test('failed get product with status 400 and obj {message}', (done) => {
        request(app)
            .post('/product')
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
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
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('data')
                done()
            })
    })
    test('failed update product with status 400 and obj {message}', (done) => {
        let newData = { ...data }
        newData.name = "book";
        request(app)
            .put('/product/asd')
            .send(newData)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
    // delete product
    test('success delete product with status 200 and obj {token}', (done) => {
        request(app)
            .delete('/product/' + dataId)
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
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('message')
                done()
            })
    })
})
