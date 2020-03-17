const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { createToken } = require("../helpers/jwt.js")
const { User, Product } = require("../models")
const { queryInterface } = sequelize;

let testPayload
sampleToken = "hahay"

let testUser = {
    email: 'sysadmin1@mail.com',
    password: 'delicioso',
    role: "admin"
}

let sampleItem = {
    name: "Yamaha Mio",
    image_url: "dasarese",
    price: 2000,
    stock: 100
}

let testToken


// sampleToken = "hhahay"
beforeAll((done) => {
    console.log("--- BEFORE ALL: CREATE USER & CREATE SAMPLE ITEM!");
    User.create({
        email: testUser.email,
        password: testUser.password,
        role: testUser.role
    })
        .then(response => {
            console.log("SAMPLE USER CREATED");
            testPayload = {
                id: response.id,
                email: response.email,
                role: response.role
            }
            testToken = createToken(testPayload)
            console.log("TEST TOKEN IS");
            console.log(testToken);
            // done()
            return Product.create({
                name: sampleItem.name,
                image_url: sampleItem.image_url,
                price: sampleItem.price,
                stock: sampleItem.stock
            })
        }) // otorisasi: create product dulu
        .then(response1 => {
            console.log("SAMPLE THING CREATED");
            done()
        })
        .catch(err => {
            console.log("SAMPLE GENERATION ERROR");
            done(err)
        })
})


afterAll((done) => {
    queryInterface.bulkDelete("Products", {})
        .then(_ => {
            done()
        })
        .catch(err => {
            done(err)
        })
})

testData = {
    name: "iPhone X",
    image_url: "assdhdj",
    price: 1500,
    stock: 500
}


describe("--- PRODUCT ROUTES ---", () => {
    
    // CREATE PRODUCTS
    describe('POST /product', () => {

        // ADD PRODUCT SUCCESS
        describe('ADD PRODUCT SUCCESS', () => {

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .post('/products')
                    .send({
                        data: testData,
                        headers: {
                            token: testToken
                        }
                    })
                    .end((err, res) => {
                        // console.log(res);
                        console.log("RES BODY");
                        console.log(res.body);
                        expect(res.status).toBe(201)
                        expect(res.body).toHaveProperty("data")
                        done()
                    })

            })

        })


//         // ADD PRODUCT FAILS: NO NAME
//         describe('ADD PRODUCT FAILS', () => {

//             test('SHOULD SEND AN ERROR 400 BECAUSE OF EMPTY NAME', (done) => {
//                 let noName = {...testData}
//                 delete noName.name
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: noName,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })


//             // NEGATIVE STOCK & PRICE
//             test('SHOULD SEND AN ERROR 400 BECAUSE PRICE IS NEGATIVE', (done) => {
//                 let negPrice = {...testData, price: -2000}
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: negPrice,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })

//             test('SHOULD SEND AN ERROR 400 BECAUSE STOCK IS NEGATIVE', (done) => {
//                 let negStock = {...testData, stock: -2000}
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: negStock,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })


//             //NON-NUMERICAL FORMAT
//             test('SHOULD SEND AN ERROR 400 BECAUSE PRICE IS NON-NUMERIC', (done) => {
//                 let nanPrice = {...testData, price: 'i2000'}
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: nanPrice,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })

//             test('SHOULD SEND AN ERROR 400 BECAUSE STOCK IS NON-NUMERIC', (done) => {
//                 let nanStock = {...testData, stock: 'i200'}
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: nanStock,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })


//         })
//     })

//     // READ PRODUCT
//     describe('GET /product', () => {

//         // READ PRODUCT SUCCESS
//         describe('READ PRODUCTS SUCCESS', () => {

//             test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 200', (done) => {
//                 request(app)
//                     .get('/products')
//                     .send({
//                         headers: {
//                             // token: sampleToken
//                             token: localStorage.getItem("token")
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         console.log("RES BODY");
//                         console.log(res.body);
//                         // expect(res.status).toBe(200)
//                         // expect(res.body).toHaveProperty("data")
//                         done()
//                     })

//             })

//         })


//         // ADD PRODUCT FAILS: NO NAME
//         /* describe('ADD PRODUCT FAILS', () => {

//             test('SHOULD SEND AN ERROR 400 BECAUSE OF EMPTY NAME', (done) => {
//                 let noName = {...testData}
//                 delete noName.name
//                 // console.log("SANITY CHECK");
//                 // console.log(noName);
//                 request(app)
//                     .post('/products')
//                     .send({
//                         data: noName,
//                         headers: {
//                             token: sampleToken
//                         }
//                     })
//                     .end((err, res) => {
//                         // console.log(res);
//                         // console.log("RES BODY");
//                         // console.log(res.body);
//                         // console.log(res.status);
//                         expect(res.status).toBe(400)
//                         expect(res.body).toHaveProperty("message", expect.any(String))
//                         expect(res.body).toHaveProperty("errors", expect.any(Array))
//                         done()
//                     })

//             })
//         }) */
    })

    
})