const request = require('supertest')
const app = require('../app')
const { Product } = require('../models')
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1bGZhQG1haWwuY29tIiwiaWF0IjoxNTg0NTEyNjU2fQ.G8svHhWu520sgHuUJwKMZnzA8VLgt7C4Row6RQagtso'
let customer_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJmYWFAb3V0bG9vay5jb20iLCJpYXQiOjE1ODQ1MTgwODN9.3R8OjH1xpPpxpbC4UcPtY2iqvWyZ38b7XOSa23jOX4w'

describe('Product Routes', () => {
  describe('POST /products', () => {
    describe('create product success', () => {
      test('it should return data new product with success message and status 201', (done) => {
        request(app)
          .post('/products')
          .set('token', token)
          .send({
            name: 'Fantastic Beasts and Where to Find Them : The Original Screenplay',
            image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
            price: 25000,
            stock: 1,
            UserId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)            
            expect(response.body).toHaveProperty('data', expect.any(Object))
            expect(response.body).toHaveProperty('message', 'success insert new product')
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('create product failed', () => {
      describe('Error in name', () => {
        test('it should return error with status 400 because of missing name', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: '',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
              price: 25000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["name cannot be empty"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain('name cannot be empty')
              expect(response.status).toBe(400)
              done()
            })
        })

        test('it should return error with status 400 because of empty name', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: null,
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4087/9781408708989.jpg',
              price: 25000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["name cannot be null"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain('name cannot be null')
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('Invalid image_url', () => {
        test('Invalid image url with status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: 'Masha and The Bear',
              image_url: 'https://encrypted-tbn0',
              price: 25000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["invalid url"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain('invalid url')
              expect(response.status).toBe(400)
              done()
            })
        })

        test('error image url null and status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: "Harry Potter",
              image_url: null,
              price: 25000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["image url cannot be null"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain('image url cannot be null')
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('Error price', () => {
        test('Invalid price with status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: -50,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["price cannot be negative"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain('price cannot be negative')
              expect(response.status).toBe(400)
              done()
            })
        })

        test('error price null and status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: "Start With Why : How Great Leaders Inspire Everyone To Take Action",
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: null,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["price cannot be null"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain("price cannot be null")
              expect(response.status).toBe(400)
              done()
            })
        })
      })

      describe('Error in stock', () => {
        test('Invalid stock with status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action bekas',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 250000,
              stock: -1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["stock cannot be negative"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain("stock cannot be negative")
              expect(response.status).toBe(400)
              done()
            })
        })

        test('Invalid stock because of null and status 400', (done) => {
          request(app)
            .post('/products')
            .set('token', token)
            .send({
              name: "Start With Why : How Great Leaders Inspire Everyone To Take Action",
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 250000,
              stock: null,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', ["stock cannot be null"])
              expect(response.body).toHaveProperty('error', expect.any(Array))
              expect(response.body.error).toContain("stock cannot be null")
              expect(response.status).toBe(400)
              done()
            })
        })
      })

    })
  })

  describe('Update product', () => {
    let id
    beforeEach((done) => {
      Product.create({
        name: 'How to Win Friends and Influence People',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
        price: 25000,
        stock: 1,
        UserId: 1
      })
        .then(result => {
          id = result.id
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    describe('Update product success', () => {
      test('it should update product', (done) => {
        request(app)
          .put(`/products/${id}`)
          .set('token', token)
          .send({
            name: 'How to Win Friends and Influence People',
            image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9781/4391/9781439199190.jpg',
            price: 23000,
            stock: 1,
            UserId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('data', expect.any(Object))
            expect(response.body).toHaveProperty('status', [1])
            expect(response.body).toHaveProperty('message', 'success update product')
            expect(response.status).toBe(201)
            done()
          })
      })

      describe('Update product failed', () => {
        test('wrong product id', (done) => {
          request(app)
            .put(`/products/${id + 1}`)
            .set('token', token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 23000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('data', expect.any(Object))
              expect(response.body).toHaveProperty('status', [0])
              expect(response.body).toHaveProperty('message', 'failed update product')
              expect(response.status).toBe(201)
              done()
            })
        })

        test('unauthorized', (done) => {
          request(app)
            .put(`/products/${id}`)
            .set('token', customer_token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 23000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)              
              expect(response.body).toHaveProperty('error', "You are not authorized")
              expect(response.status).toBe(401)
              done()
            })
        })
      })



    })
  })

  describe('Delete product', () => {
    let id
    beforeEach((done) => {
      Product.create({
        name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
        price: 25000,
        stock: 1,
        UserId: 1
      })
        .then(result => {
          id = result.id
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    describe('product delete case success', () => {
      test('it should delete', (done) => {
        request(app)
          .delete(`/products/${id}`)
          .set('token', token)
          .send({
            name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
            image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
            price: 23000,
            stock: 1,
            UserId: 1
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('status', 1)
            expect(response.body).toHaveProperty('message', 'success delete product')
            expect(response.status).toBe(200)
            done()
          })
      })

      describe('Delete product failed', () => {
        test('wrong product id', (done) => {
          request(app)
            .delete(`/products/${id + 1}`)
            .set('token', token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 23000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('status', 0)
              expect(response.body).toHaveProperty('message', 'failed to delete product')
              expect(response.status).toBe(200)
              done()
            })
        })

        test('not authorized', (done) => {
          request(app)
            .delete(`/products/${id}`)
            .set('token', customer_token)
            .send({
              name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
              image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
              price: 23000,
              stock: 1,
              UserId: 1
            })
            .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('error', "You are not authorized")
              expect(response.status).toBe(401)
              done()
            })
        })
      })
    })
  })

  describe('Find all product', () => {
    beforeEach((done) => {
      Product.create({
        name: 'Start With Why : How Great Leaders Inspire Everyone To Take Action',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/2419/9780241958223.jpg',
        price: 25000,
        stock: 1,
        UserId: 1
      })
        .then(result => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    describe('find all product success', () => {
      test('it should success find all', (done) => {
        request(app)
          .get(`/products`)
          .set('token', token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('products', expect.any(Array))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('find all product failed', () => {
      test('not login', (done) => {
        request(app)
          .get(`/products`)
          .end((err, response) => {            
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('error', 'Please login first')
            expect(response.status).toBe(404)
            done()
          })
      })
    })
  })

  describe('Find one product', () => {
    let id
    beforeEach((done) => {
      Product.create({
        name: 'Thinking, Fast and Slow',
        image_url: 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/1410/9780141033570.jpg',
        price: 25000,
        stock: 1,
        UserId: 1
      })
        .then(result => {
          id = result.id
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    describe('Find one success', () => {
      test('it should success find one', (done) => {
        request(app)
          .get(`/products/${id}`)
          .set('token', token)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('product', expect.any(Object))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Find one failed', () => {
      test('invalid token', (done) => {
        request(app)
          .get(`/products/${id}`)
          .set('token', "token")
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('error', 'Please login first')
            expect(response.status).toBe(404)
            done()
          })
      })
    })
  })
})
