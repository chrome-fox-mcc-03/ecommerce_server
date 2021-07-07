const request = require('supertest');
const app = require('../app');
const {
    sequelize
} = require('../models');
const {
    createToken
} = require("../helpers/jwt.js")
const {
    User,
    Product
} = require("../models")
const {
    queryInterface
} = sequelize;

let testPayload
sampleToken = "hahay"

let testUser = {
    email: "superadmin1@mail.com",
    password: "superadmin",
    role: "admin"
}

let sampleId = 10
let data

let sampleItem = {
    name: 'Vitacimin',
    category: 'supplements',
    image_url: 'dasarese',
    price: 2000,
    stock: 100
}
let sampleItem1 = {
    name: 'Vitacimin',
    category: 'medicine',
    image_url: 'dasarese',
    price: 5555,
    stock: 555
}
let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoic3VwZXJhZG1pbjFAbWFpbC5jb20iLCJwYXNzd29yZCI6InN1cGVyYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODQ2OTk1NzB9.3FW7QRUpIlARh-vrc2e0WEcErP3JM89upYhwLuBMpCs"



describe("--- PRODUCT ROUTES ---", () => {

    beforeAll((done) => {
        request(app)
            .post("/login")
            .send(testUser)
            .end((req, res) => {
                // console.log(res);
                // console.log("TEST: RES BODY IS:");
                // console.log("LOGIN SUCCESS");
                // console.log(res.body);
                testToken = res.body.token
                
                console.log("Token is now");
                console.log(testToken);
                done()
            })
    })

    // READ PRODUCTS
    describe('GET /products', () => {

        // READ PRODUCT SUCCESS
        describe('READ PRODUCT SUCCESS', () => {
            console.log('CHECK: TOKEN IS')
            console.log(testToken);
            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .get('/products')
                    .set({
                        token: testToken
                    })
                    .end((err, res) => {
                        // console.log(res);
                        // console.log("RES BODY --------------- READ PRODUCTS SUCCESS");
                        // console.log(res.body);
                        // console.log(res.status);
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty("data")
                        done()
                    })

            })

        })

    })


    // CREATE PRODUCTS
    describe('POST /products', () => {

        // ADD PRODUCT SUCCESS
        describe('ADD PRODUCT SUCCESS', () => {
            data = {
                name: 'Vitacimin',
                category: 'supplements',
                image_url: 'dasarese',
                price: 2000,
                stock: 100
            }

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .post('/products')
                    .send(data)
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log(res);
                        // console.log("RES BODY ------------------------- CREATE PRODUCT SUCCESS");
                        // console.log(res.body);
                        // console.log(res.status);
                        expect(res.body).toHaveProperty("data")
                        expect(res.status).toBe(201)
                        sampleId = res.body.data.id
                        done()
                    })

            })

        })


        // ADD PRODUCT FAILS
        describe('ADD PRODUCT FAILS', () => {

            test('SHOULD SEND AN ERROR 400 BECAUSE OF EMPTY NAME/CATEGORY', (done) => {
                let noCat = {...sampleItem}
                delete noCat.category
                delete noCat.name
                data = noCat
                request(app)
                    .post('/products')
                    .send(data)
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log(res);
                        // console.log("RES BODY--------------------------- CREATE PRODUCT FAIL");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty("message", expect.any(String))
                        expect(res.body).toHaveProperty("errors", expect.any(Array))
                        done()
                    })

            })

        })

    })


    // UPDATE PRODUCT
    describe('PUT /products/:id', () => {

        // UPDATE PRODUCT SUCCESS
        describe('UPDATE PRODUCT SUCCESS', () => {
            data = sampleItem1
            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .put(`/products/${sampleId}`)
                    .send(data)
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log("RES BODY--------------------------- UPDATE PRODUCT SUCCESS");
                        // console.log(res.body);
                        // console.log(res.status)
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty("data", expect.any(Array))
                        done()
                    })

            })

        })


        // UPDATE PRODUCT FAILS
        describe('UPDATE PRODUCT FAIL', () => {
            data = sampleItem
            test('SHOULD SEND AN ERROR 500 BECAUSE OF WRONG ID', (done) => {
                request(app)
                    .put(`/products/1000000`) //impossible one
                    .send(data)
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log("RES BODY--------------------------- UPDATE PRODUCT FAIL");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(404)
                        // expect(res.body).toHaveProperty("error", expect.any(Array))
                        done()
                    })

            })

        })

    })


    // DELETE PRODUCT
    describe('DELETE /products/:id', () => {

        // DELETE PRODUCT SUCCESS
        describe('DELETE PRODUCT SUCCESS', () => {
            console.log("---> SANITY CHECK");
            console.log(`ID TO BE DELETED IS ${sampleId}`);
            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .delete(`/products/${sampleId}`)
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log("RES BODY--------------------------- DELETE PRODUCT SUCCESS");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(200)
                        done()
                    })

            })

        })


        // DELETE PRODUCT FAILS
        describe('DELETE PRODUCT FAIL', () => {

            test('SHOULD SEND AN ERROR 500 BECAUSE OF WRONG ID', (done) => {
                request(app)
                    .delete(`/products/1000000`) //impossible one
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log("RES BODY--------------------------- DELETE PRODUCT FAIL");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(404)
                        done()
                    })

            })

        }) 

    })

})