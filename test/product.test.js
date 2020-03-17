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

testData = {
    name: "iPhone X",
    image_url: "assdhdj",
    price: 1500,
    stock: 500
}





describe("--- PRODUCT ROUTES ---", () => {

    // MATCHERS
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
                console.log(response);
                testToken = createToken({
                    id: response.id,
                    email: response.email,
                    role: response.role
                })
                console.log("TEST TOKEN IS");
                console.log(testToken);
                localStorage.setItem("token", testToken)
                // done()
                return Product.create({
                        name: sampleItem.name,
                        image_url: sampleItem.image_url,
                        price: sampleItem.price,
                        stock: sampleItem.stock
                    })
                    .then(response1 => {
                        console.log("SAMPLE PRODUCT GENERATED");
                        done()
                    })
                    .catch(err => {
                        console.log("SAMPLE GENERATION ERROR");
                        done(err)
                    })
            })
    })


    afterAll((done) => {
        queryInterface.bulkDelete("Products", {})
            .then(_ => {
                return queryInterface.bulkDelete("Users", {})
            })
            .then(_ => {
                done()
            })
            .catch(err => {
                done(err)
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
                        data: testData,
                        headers: {
                            token: localStorage.getItem("token")
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

    })



     // READ PRODUCTS
     describe('GET /products', () => {

        // READ PRODUCT SUCCESS
        describe('READ PRODUCT SUCCESS', () => {

            test('SHOULD SEND AN OBJECT(NAME, IMAGE_URL, PRICE, STOCK) WITH STATUS CODE 201', (done) => {
                request(app)
                    .get('/products')
                    .send({
                        headers: {
                            token: localStorage.getItem("token")
                        }
                    })
                    .end((err, res) => {
                        // console.log(res);
                        console.log("RES BODY");
                        console.log(res.body);
                        expect(res.status).toBe(200)
                        expect(res.body).toHaveProperty("data")
                        done()
                    })

            })

        })

    })


})