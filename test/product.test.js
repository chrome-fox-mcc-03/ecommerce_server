const request = require('supertest')
const app = require('../app')
const { User, Product, sequelize } = require('../models')
const { queryInterface } = sequelize
const { createToken } = require('../helpers')
let token = ''
let tokent = ''
let id = 0

describe('Product test section', () => {
  beforeAll((done) => {
    User.create({
      username: "admin",
      email: "admin@mail.com",
      password: "12345",
      role: true
    })
      .then(data => {
        token = createToken({
          id: data.id,
          email: data.email
        })
        return User.create({
          username: "user",
          email: "user@mail.com",
          password: "12345"
        })
      })
      .then(data => {
        tokent = createToken({
          id: data.id,
          email: data.email
        })
        return Product.create({
          name: 'agv k3',
          image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
          price: 3900000,
          TypeId: 1,
          stock: 8
        })
      })
      .then(data => {
        id = data.id
        done()
      })
      .catch(err => done(err))
  })
  afterAll((done) => {
    queryInterface.bulkDelete('Users', null, {})
      .then(_ => {
        return queryInterface.bulkDelete('Products', null, {})
      })
      .then(_ => done())
      .catch(err => done(err))
  })

  describe('/product create section', () => {
    describe('Success response', () => {
      test('Will returning status code 201 and message', (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(201)
            expect(res.body.message).toBe('success add agv k1 dreamtime to list product')
            done()
          })
      })
    })
    describe('Error response', () => {
      test(`because token empty`, (done) => {
        request(app)
          .post('/admin/product')
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('please login first!')
            done()
          })
      })
      test(`because role isn't admin`, (done) => {
        request(app)
          .post('/admin/product')
          .set('token', tokent)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(403)
            expect(res.body.message).toBe('this action for admin only!')
            done()
          })
      })
      test(`because product name empty`, (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: '',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('product name cannot be empty')
            done()
          })
      })
      test('because product image_url empty', (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: 'agv k1 dreamtime',
            image_url: '',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.body.message).toBe('image url cannot be empty')
            expect(res.status).toBe(400)
            done()
          })
      })
      test(`because product price less than 0`, (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: -3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('price cannot less than 0')
            done()
          })
      })
      test(`because product TypeId empty`, (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: null,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('type cannot be empty')
            done()
          })
      })
      test(`because product stock less than 0`, (done) => {
        request(app)
          .post('/admin/product')
          .set('token', token)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: -2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('stock cannot less than 0')
            done()
          })
      })
    })
  })
  describe('/product findAll section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and list product', (done) => {
        request(app)
          .get('/admin/product')
          .set('token', token)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('data')
            done()
          })
      })
    })
    describe('Error response', () => {
      test(`because token empty`, (done) => {
        request(app)
          .get('/admin/product')
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('please login first!')
            done()
          })
      })
      test(`because role isn't admin`, (done) => {
        request(app)
          .get('/admin/product')
          .set('token', tokent)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(403)
            expect(res.body.message).toBe('this action for admin only!')
            done()
          })
      })
    })
  })
  describe('/product/:id update section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3000000,
            TypeId: 1,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body.message).toBe('success update product')
            done()
          })
      })
    })
    describe('Error response', () => {
      test(`because token empty`, (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('please login first!')
            done()
          })
      })
      test(`because role isn't admin`, (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', tokent)
          .send({
            name: 'agv k1 dreamtime',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3550000,
            TypeId: 1,
            stock: 2
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(403)
            expect(res.body.message).toBe('this action for admin only!')
            done()
          })
      })
      test('because product not found', (done) => {
        request(app)
          .put(`/admin/product/100`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3000000,
            TypeId: 1,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body.message).toBe('product not found')
            done()
          })
      })
      test('because product name empty', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: '',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3000000,
            TypeId: 1,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('product name cannot be empty')
            done()
          })
      })
      test('because product image url empty', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: '',
            price: 3000000,
            TypeId: 1,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('image url cannot be empty')
            done()
          })
      })
      test('because product price less than 0', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: -3000000,
            TypeId: 1,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('price cannot less than 0')
            done()
          })
      })
      test('because product type empty', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3000000,
            TypeId: null,
            stock: 5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('type cannot be empty')
            done()
          })
      })
      test('because product stock less than 0', (done) => {
        request(app)
          .put(`/admin/product/${id}`)
          .set('token', token)
          .send({
            name: 'agv k3 sv',
            image_url: 'https://img.auctiva.com/imgdata/6/9/2/4/2/1/webimg/1017682934_o.png',
            price: 3000000,
            TypeId: 1,
            stock: -5
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body.message).toBe('stock cannot less than 0')
            done()
          })
      })
    })
  })
  describe('/product/:id find one section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', (done) => {
        request(app)
          .get(`/admin/product/${id}`)
          .set('token', token)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('data')
            done()
          })
      })
    })
    describe('Error response', () => {
      test(`because token empty`, (done) => {
        request(app)
          .delete(`/admin/product/${id}`)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('please login first!')
            done()
          })
      })
      test(`because role isn't admin`, (done) => {
        request(app)
          .delete(`/admin/product/${id}`)
          .set('token', tokent)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(403)
            expect(res.body.message).toBe('this action for admin only!')
            done()
          })
      })
      test('because product not found', (done) => {
        request(app)
          .delete(`/admin/product/100`)
          .set('token', token)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body.message).toBe('product not found')
            done()
          })
      })
    })
  })
  describe('/product/:id delete section', () => {
    describe('Success response', () => {
      test('Will returning status code 200 and message', (done) => {
        request(app)
          .delete(`/admin/product/${id}`)
          .set('token', token)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body.message).toBe('success delete agv k3 sv')
            done()
          })
      })
    })
    describe('Error response', () => {
      test(`because token empty`, (done) => {
        request(app)
          .delete(`/admin/product/${id}`)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body.message).toBe('please login first!')
            done()
          })
      })
      test(`because role isn't admin`, (done) => {
        request(app)
          .delete(`/admin/product/${id}`)
          .set('token', tokent)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(403)
            expect(res.body.message).toBe('this action for admin only!')
            done()
          })
      })
      test('because product not found', (done) => {
        request(app)
          .delete(`/admin/product/100`)
          .set('token', token)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body.message).toBe('product not found')
            done()
          })
      })
    })
  })
})