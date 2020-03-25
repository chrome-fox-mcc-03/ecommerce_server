const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize
const { User, Product } = require('../models')
const { signToken } = require('../helpers/jwtoken')


//dummy Product
let dummyProduct = {
    name : 'Usb card',
    image_url : null,
    price : 12000,
    stock : 10
}

//dummyEdited Product
let editedProduct = {
    name : 'Usb card',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 120000,
    stock : 10
}

let nullNameProduct = {
    name : null,
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 50000,
    stock : 10
}

let negativePriceProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : -50000,
    stock : 10
}

let negativeStockProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 50000,
    stock : -10
}

let notNumericPriceProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 'asddq',
    stock : 10
}

let notNumericStockProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 85000,
    stock : 'as'
}

let nullStockProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : 85000,
    stock : null
}

let nullPriceProduct = {
    name : 'bambang',
    image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
    price : null,
    stock : 5
}

let testProduct = {}

let access_token = ''

describe('Product routes', () => {
    beforeAll((done) => {
        User.create({
            email: 'bambang@mail.com',
            password: 'bambang777',
            role: 'admin'
        })
            .then((result) => {
                console.log(result.dataValues);
                const {id, email, role} = result.dataValues
                const userData = {
                    id,
                    email,
                    role
                }
                access_token = signToken(userData)
                done()
            }).catch((err) => {
                console.log(err);
            });

        Product.create({
            name : 'Usb Sandisk',
            image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
            price : 7500,
            stock : 10
        })
            .then((result) => {
                testProduct = result.dataValues
            }).catch((err) => {
                console.log(err)
            });
    })
    
    afterAll((done) => {
        queryInterface.bulkDelete('Products', {})
        .then(_ => {
            done()
        }).catch((err) => {
            done(err)
        });
        
        queryInterface.bulkDelete('Users', {})
        .then(_ => {
            done()
        }).catch((err) => {
            done(err)
        });
        
    }) 
    
    describe('Success /product', () => {
        test('[POST create product] sending status code 201', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(dummyProduct)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(201)
                expect(res.body.productCreated).toHaveProperty('name', expect.any(String))
                expect(res.body.productCreated).toHaveProperty('price', expect.any(Number))
                expect(res.body.productCreated).toHaveProperty('stock', expect.any(Number))
                done()
            })
        })
    
        test('[GET fetching product] sending status code 200', (done) => {
            request(app)
            .get(`/product`)
            .set({ access_token })
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body.result[0]).toHaveProperty('name', expect.any(String))
                expect(res.body.result[0]).toHaveProperty('image_url', expect.any(String))
                expect(res.body.result[0]).toHaveProperty('price', expect.any(Number))
                expect(res.body.result[0]).toHaveProperty('stock', expect.any(Number))
                done()
            })
        })

        test('[PUT update product] sending status code 201', (done) => {
            const editProduct = {
                name : 'Usb card',
                image_url : 'https://www.jakartanotebook.com/images/products/28/31/23969/1/sandisk-cruzer-blade-usb-flash-drive-sdcz50-004g-4gb-bulk-packing-1.jpg',
                price : 120000,
                stock : 10
            }
            request(app)
            .put(`/product/${testProduct.id}`)
            .set({ access_token })
            .send(editProduct)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body.result.length).toBe(1)
                done()
            })
        })

        test('[DELETE delete product] sending status code 200', (done) => {
            request(app)
            .delete(`/product/${testProduct.id}`)
            .set({ access_token })
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                // console.log(res.body, '<< delete')
                done()
            })
        })
    
    })

    describe('Error /product', () => {
        test('[product name null] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(nullNameProduct)
            .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'product name cannot be null')
                done()
            })
        })

        test('[negative price] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(negativePriceProduct)
            .end((err, res) => {
                console.log(res.body.err.errors)
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'price cannot be negative')
                done()
            })
        })
        
        test('[negative stock] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(negativeStockProduct)
            .end((err, res) => {
                console.log(res.body.err.errors)
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'stock cannot be negative')
                done()
            })
        })

        test('[not numeric price] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(notNumericPriceProduct)
            .end((err, res) => {
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'price should be number')
                done()
            })
        })

        test('[not numeric stock] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(notNumericStockProduct)
            .end((err, res) => {
                // console.log(res.body.err.errors)
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'stock should be number')
                done()
            })
        })

        test('[null stock] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(nullStockProduct)
            .end((err, res) => {
                // console.log(res.body.err.errors)
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'stock cannot be null')
                done()
            })
        })

        test('[null price] sending error with status code 400 ', (done) => {
            request(app)
            .post('/product')
            .set({ access_token })
            .send(nullPriceProduct)
            .end((err, res) => {
                // console.log(res.body.err.errors)
                expect(res.status).toBe(401)
                expect(res.body.err).toHaveProperty('name', expect.any(String))
                expect(res.body.err).toHaveProperty('errors', expect.any(Array))
                expect(res.body.err.errors[0]).toHaveProperty('message', 'price cannot be null')
                done()
            })
        })
    });
});

