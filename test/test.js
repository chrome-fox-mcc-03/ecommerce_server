const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;
// const { hashPassword } = require('../helpers/bcrypt')

let data = {
    email: "admin@admin.com",
    password: "qweqwe"
}

let product = {
    name: "Macbook",
    description: "Macbook",
    image_url: "Macbook",
    price: 12500000,
    stock: 5
}

let token;

describe("User Routes", () => {
    describe("POST /login", () => {
        describe("Success", () => {
            test("Send object (email, password) with status code (200) replied with token", (done) => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        expect.objectContaining('token')
                        done()
                    })
            })
        })
        describe("Error", () => {
            test("Send object (email, password) with status code (400) replied Invalid Email / Password", (done) => {
                data.email = "ace2@mail.com"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe("Invalid Email / Password")
                        done()
                    })
            })
            test("Send object (email, password) with status code (400) replied with replied Invalid Email / Password", (done) => {
                data.password = "123"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe("Invalid Email / Password")
                        done()
                    })
            })
        })
    })
})
describe("Product Routes", () => {
    describe("GET /products", () => {
        describe("Success", () => {
            test("Return all products listed on database if admin is logged in", (done) => {
                data.email = "admin@admin.com"
                data.password = "qweqwe"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .get('/products')
                            .set('token', token)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.body.response.length).toBeGreaterThan(0)
                                expect(res.body.response[0]).toHaveProperty('id', expect.any(Number))
                                expect(res.body.response[0]).toHaveProperty('name', expect.any(String))
                                expect(res.body.response[0]).toHaveProperty('description', expect.any(String))
                                expect(res.body.response[0]).toHaveProperty('image_url', expect.any(String))
                                expect(res.body.response[0]).toHaveProperty('price', expect.any(Number))
                                expect(res.body.response[0]).toHaveProperty('stock', expect.any(Number))
                                expect(res.body.response[0]).toHaveProperty('UserId', expect.any(Number))
                                done()
                            })
                    })
            })
        })
        describe("Error", () => {
            test("Replied with status code 400 if user is not Admin while accessing products", (done) => {
                data.email = "ace@admin.com" // <<<<< this is not correct credentials
                data.password = "qweqwe"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe("Invalid Email / Password")
                        done()
                    })
            })
        })
    })
    describe("POST /products", () => {
        describe("Success", () => {
            test("Successfully add product, replied with status 201", (done) => {
                data.email = "admin@admin.com"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        product.name += "1" // Will error if you run npm test more than 1 times, proceed with CAUTION
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(res.status).toBe(201)
                                expect(typeof res.body).toBe("object")
                                expect(res.body).toHaveProperty('name', expect.any(String))
                                expect(res.body).toHaveProperty('description', expect.any(String))
                                expect(res.body).toHaveProperty('stock', expect.any(Number))
                                expect(res.body).toHaveProperty('price', expect.any(Number))
                                expect(res.body.UserId).toBe(1)
                                done()
                            })
                    })
            })
        })
        describe("Error", () => {
            test("Error when add product if product's name validation is violated, replied with status 400", (done) => {
                product.name = ''
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's name"]))
                                done()
                            })
                    })
            })
            test("Error when add product if product's name unique validation is violated, replied with status 400", (done) => {
                product.name = 'Macbook'
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Product has been registered, please input another product"]))
                                done()
                            })
                    })
            })
            test("Error when add product if product's description null validation is violated, replied with status 400", (done) => {
                product.name = 'Macbook'
                product.description = ''
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's description"]))
                                done()
                            })
                    })
            })
            test("Error when add product if product's description length validation is violated, replied with status 400", (done) => {
                product.description = '23b78234bg8n79bg3724890b23789gv40b23789v40bv7829340b78902v34b78903v24b3820479gvb37890gv241b78930gv421b37894gv201b78v034912b78349v21b7893v241b7893v241b789v34b21b789v234b789v234b789v2348b79v234b789v2348b790v234b789v342b789v3428b73v2489b70vb37824b7v23480bv78903412b780v324b78v92341b780v234b780234v1b7890v423b8970b471238'
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Description's max characters is 200"]))
                                done()
                            })
                    })
            })
            test("Error when add product if product's price validation is violated, replied with status 400", (done) => {
                product.description = 'macbook'
                product.price = 0
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's price"]))
                                done()
                            })
                    })
            })
            test("Error when add product if product's stock length validation is violated, replied with status 400", (done) => {
                product.price = 12500000
                product.stock = 0
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBeGreaterThan(0)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's quantity"]))
                                done()
                            })
                    })
            })
            test("Error when add product if all product's validation is violated, replied with status 400", (done) => {
                product.name = ''
                product.description = ''
                product.price = 0
                product.stock = 0
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(400)
                                expect(res.body.message.length).toBe(4)
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's quantity"]))
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's price"]))
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's description"]))
                                expect(res.body.message).toEqual(expect.arrayContaining(["Please input product's name"]))
                                done()
                            })
                    })
            })

            test("Error when add product if you're not admin, replied with status 403", (done) => {
                data.email = "notAdmin@admin.com" // Obviously not admin
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .post('/products')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(err).toBe(null)
                                expect(res.status).toBe(403)
                                expect(res.body.message).toBe("You're not authorized to perform this action!")
                                done()
                            })
                    })
            })
        })
    })
    describe("PUT /products",() => {
        describe("Success", () => {
            test("Successfully edit product, replied with status 200", (done) => {
                data.email = "admin@admin.com"
                product.name = "Macbookk"
                product.description = "Macbook"
                product.image_url = "Macbook"
                product.price = 12500000
                product.stock = 5
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .put('/products/8')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(res.status).toBe(200)
                                expect(typeof res.body).toBe("string")
                                done()
                            })
                    })
            })
        })
        describe("Errors", () => {
            test("Error when edit product if you're not an admin, replied with status 403", (done) => {
                data.email = "notAdmin@admin.com"
                product.name = "Macbookk"
                product.description = "Macbook"
                product.image_url = "Macbook"
                product.price = 12500000
                product.stock = 5
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .put('/products/8')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(res.status).toBe(403)
                                expect(res.body.message).toBe("You're not authorized to perform this action!")
                                done()
                            })
                    })
            })
        })
        describe("Errors", () => {
            test("Error when edit product if product's ID not found, replied with status 403", (done) => {
                data.email = "admin@admin.com"
                product.name = "Macbookk"
                product.description = "Macbook"
                product.image_url = "Macbook"
                product.price = 12500000
                product.stock = 5
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .put('/products/0')
                            .set('token', token)
                            .send(product)
                            .end((err, res) => {
                                expect(res.status).toBe(404)
                                expect(res.body.message).toBe("Product not found!")
                                done()
                            })
                    })
            })
        })
    })
    describe("DELETE /products", () => {
        describe("Error", () => {
            test("Error when you want to delete product and you're not an admin, replied with status 403", (done) => {
                data.email = "notAdmin@admin.com"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        token = res.body.token
                        request(app)
                            .delete('/products/1')
                            .set('token', token)
                            .end((err, res) => {
                                expect(res.status).toBe(403)
                                expect(res.body.message).toBe("You're not authorized to perform this action!")
                                done()
                            })
                    })
            })
        })
    })
    describe("Error", () => {
        test("Error when you want to delete product and product's ID not found, replied with status 404", (done) => {
            data.email = "admin@admin.com"
            request(app)
                .post('/login')
                .send(data)
                .end((err, res) => {
                    token = res.body.token
                    request(app)
                        .delete('/products/999')
                        .set('token', token)
                        .end((err, res) => {
                            expect(res.status).toBe(404)
                            expect(res.body.message).toBe("Product not found!")
                            done()
                        })
                })
        })
    })
    describe("Success", () => {
        test("Successfully delete product, replied with status 200", (done) => {
            data.email = "admin@admin.com"
            request(app)
            .post('/login')
            .send(data)
            .end((err, res) => {
                token = res.body.token
                let testDeleteProduct = {
                    name: "MacMini",
                    description: "MacMini",
                    image_url: "MacMini",
                    price: 25000000,
                    stock: 3
                }
                request(app)
                    .post('/products')
                    .set('token', token)
                    .send(testDeleteProduct)
                    .end((err, res) => {
                        let id = +res.body.id
                        request(app)
                            .delete(`/products/${id}`)
                            .set('token', token)
                            .end((err, res) => {
                                expect(res.status).toBe(200)
                                expect(res.body).toBe(1)
                                done()
                            })
                    })
            })
        })
    })
})
