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
                done()
            })
        })
    
        test('[GET fetching product] sending status code 200', (done) => {
            request(app)
            .get(`/product/`)
            .set({ access_token })
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.status).toBe(200)
                expect(res.body).toHaveProperty('result')
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
                done()
            })
        })
    
    })
});

