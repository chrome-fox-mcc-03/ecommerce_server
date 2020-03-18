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
    email: "super@mail.com",
    password: "superadmin",
    role: "admin"
}

let sampleId = 10

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
    price: 5000,
    stock: 5000
}
let testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImVtYWlsIjoic3VwZXJhZG1pbjFAbWFpbC5jb20iLCJwYXNzd29yZCI6InN1cGVyYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1ODQ1MzgwNjR9.waap5upqWGdWbgnhwrfvOwUtWJ2sImy4NKBwoDh41eQ"
// localStorage.setItem("token", testToken)

// // MATCHERS
//     // sampleToken = "hhahay"
//     beforeAll((done) => {
//         console.log("--- BEFORE ALL: CREATE USER & CREATE SAMPLE ITEM!");
//         User.create({
//                 email: testUser.email,
//                 password: testUser.password,
//                 role: testUser.role
//             })
//             .then(response => {
//                 console.log("SAMPLE USER CREATED");
//                 console.log(response);
//                 testToken = createToken({
//                     id: response.id,
//                     email: response.email,
//                     role: response.role
//                 })
//                 console.log("TEST TOKEN IS");
//                 console.log(testToken);
//                 localStorage.setItem("token", testToken)
//                 // done()
//                 return Product.create({
//                         name: sampleItem.name,
//                         image_url: sampleItem.image_url,
//                         price: sampleItem.price,
//                         stock: sampleItem.stock
//                     })
//                     .then(response1 => {
//                         console.log("SAMPLE PRODUCT GENERATED");
//                         done()
//                     })
//                     .catch(err => {
//                         console.log("SAMPLE GENERATION ERROR");
//                         done(err)
//                     })
//             })
//     })


//     afterAll((done) => {
//         User.destroy({where: {email: testUser.email}}).then(done()).catch(err => {done(err)})
//     })



describe("--- PRODUCT ROUTES ---", () => {

    /*     // MATCHERS
        beforeAll((done) => {
            console.log("--- BEFORE ALL: GENERATE TOKEN BASED ON SEEDED ADMIN!");
            localStorage.setItem("token", testToken)
            done()
        }) */


    // READ PRODUCTS
    describe('GET /products', () => {

        // READ PRODUCT SUCCESS
        describe('READ PRODUCT SUCCESS', () => {

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .get('/products')
                    .send({
                        headers: {
                            token: testToken
                        }
                    })
                    .end((err, res) => {
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
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

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .post('/products')
                    .send({
                        data: sampleItem
                    })
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log(res);
                        console.log("RES BODY");
                        console.log(res.body);
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty("data")
                        sampleId = res.body.data.id
                        console.log(`NEW SAMPLE ID IS: ${sampleId}`);
                        done()
                    })

            })

        })


        // ADD PRODUCT FAILS
        describe('ADD PRODUCT FAILS', () => {

            test('SHOULD SEND AN ERROR 400 BECAUSE OF EMPTY NAME/CATEGORY', (done) => {
                let noCat = {...sampleItem}
                delete noCat.category
                request(app)
                    .post('/products')
                    .send({
                        data: noCat
                    })
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log(res);
                        // console.log("RES BODY");
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

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .put(`/products/${sampleId}`)
                    .send({
                        data: sampleItem1
                    })
                    .set('token', testToken)
                    .end((err, res) => {
                        console.log("RES BODY");
                        console.log(res.body);
                        console.log(res.status)
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty("data", expect.any(Array))
                        done()
                    })

            })

        })


        // UPDATE PRODUCT FAILS
        describe('UPDATE PRODUCT FAIL', () => {

            test('SHOULD SEND AN ERROR 500 BECAUSE OF WRONG ID', (done) => {
                request(app)
                    .put(`/products/1000000`) //impossible one
                    .send({
                        data: sampleItem
                    })
                    .set('token', testToken)
                    .end((err, res) => {
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(500)
                        // expect(res.body).toHaveProperty("data", expect.any(Array))
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
                        // console.log("RES BODY");
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
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log(res.status)
                        expect(res.status).toBe(500)
                        done()
                    })

            })

        }) 

    })

})