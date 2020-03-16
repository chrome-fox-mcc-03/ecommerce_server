const request = require('supertest')
const app = require('../app')

let product = {
    name:'soap',
    image_url:'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2018/12/19/81976385.jpg',
    price:10000,
    stock:10
}

let updateProduct = {
    id:4,
    name:'soap',
    image_url:'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/2018/12/19/81976385.jpg',
    price:10000,
    stock:15
}

describe('Product routes', () => {
    describe('POST /product', () => {
        describe('success process', () => {
            test('should send an object (name,image_url,price,stock) with status 201',(done) => {
                request(app)
                .post('/product')
                .send(product)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('name',expect.any(String))
                    expect(res.body).toHaveProperty('image_url',expect.any(String))
                    expect(res.body).toHaveProperty('price',expect.any(Number))
                    expect(res.body).toHaveProperty('stock',expect.any(Number))
                    expect(res.status).toBe(201)
                    done()
                })
            })
        })
    })


    describe('GET /product', () => {
        describe('success process', () => {
            test('should send an object (name,image_url,price,stock) with status 200',(done) => {
                request(app)
                .get('/product')
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('result',expect.any(Array))
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })
    })
    
    describe('PUT /product:id', () => {
        describe('success process', () => {
            test('should send an object (name,image_url,price,stock) with status 200',(done) => {
                request(app)
                .put(`/product/${updateProduct.id}`)
                .send(updateProduct)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('name',expect.any(String))
                    expect(res.body).toHaveProperty('image_url',expect.any(String))
                    expect(res.body).toHaveProperty('price',expect.any(Number))
                    expect(res.body).toHaveProperty('stock',expect.any(Number))
                    done()
                })
            })
        })
    })

    describe('DELETE /product:id', () => {
        describe('success process', () => {
            test('should send an object (name,image_url,price,stock) with status 200',(done) => {
                request(app)
                .delete(`/product/${updateProduct.id}`)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(String))
                    done()
                })
            })
        })
    })
    
})