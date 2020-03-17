const request = require('supertest')
const app = require('../app')
const { sequelize, Product, User} = require('../models')
const { queryInterface } = sequelize
const { generateToken } = require('../helpers/jwt')
let adminToken
let customerToken
let productId

describe('Product route', () => {
  beforeAll((done) => {
    queryInterface.bulkDelete('Products', {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  beforeEach((done) => {
    let users = [{
      name: 'Hikmani Syariful Fajar',
      email: 'syarifulfajar@gmail.com',
      password: '12345678',
      role: 'admin'
    }, {
      name: 'Aprilia Dian',
      email: 'apriliadian@gmail.com',
      password: '12345678',
      role: 'customer'
    }]
    let promises = []
    users.forEach(user => {
      promises.push(User.create(user))
    })
    Promise.all(promises)
      .then(users => {
        let adminData = {
          id: users[0].id,
          name: users[0].name,
          email: users[0].email,
          role: users[0].role
        }
        adminToken = generateToken(adminData)

        let customerData = {
          id: users[1].id,
          name: users[1].name,
          email: users[1].email,
          role: users[1].role
        }
        customerToken = generateToken(customerData)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  beforeEach((done) => {
    let productData = [{
      name: 'Sweat A',
      image_url: 'https://www.bbo-store.com/wp-content/uploads/2019/02/1-29.jpg',
      description: '',
      CategoryId: 1,
      price: 200000,
      stock: 10
    }, {
      name: 'Sweat B',
      image_url: 'https://s.blanja.com/picspace/570/286266/800.800_a58fda2f71e14af7affe2a35d6b5b249.jpg?w=348',
      description: '',
      CategoryId: 2,
      price: 190000,
      stock: 15
    }]
    let promises = []
    productData.forEach(product => {
      promises.push(Product.create(product))
    })
    Promise.all(promises)
      .then(response => {
        productId = response[0].id
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterEach((done) => {
    queryInterface.bulkDelete('Products', {})
      .then(response => {
        return queryInterface.bulkDelete('Users', {})
      })
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('GET /products', () => {
    
    describe('Success process', () => {
      test('It permission to admin to get all products and should return array of object about products and status 200', (done) => {
        request(app)
          .get('/products')
          .set({
            access_token : adminToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toEqual(expect.any(Array))
            expect(response.status).toBe(200)
            done()
          })
      })

      test('It permission to customer to get all products and should return array of objact about products and status 200', (done) => {
        request(app)
          .get('/products')
          .set({
            access_token: customerToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toEqual(expect.any(Array))
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Error Process', () => {
      test("It should error massage because don't have access_token and return status 401", (done) => {
        request(app)
          .get('/products')
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Please Login First']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because have invalid access_token and return status 401", (done) => {
        request(app)
          .get('/products')
          .set({
            access_token: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Invalid Token Error']))
            expect(response.status).toBe(401)
            done()
          })
      })
    })
  })

  describe('POST /products', () => {
    describe('Success process', () => {
      test('It should return new product object and status 201', (done) => {
        request(app)
          .post('/products')
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            CategoryId: 1,
            price: 150000,
            stock: 5
          })
          .set({
            access_token: adminToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name')
            expect(response.body).toHaveProperty('image_url')
            expect(response.body).toHaveProperty('description')
            expect(response.body).toHaveProperty('CategoryId')
            expect(response.body).toHaveProperty('price')
            expect(response.body).toHaveProperty('stock')
            expect(response.status).toBe(201)
            done()
          })
      })
    })

    describe('Error process', () => {
      test("It should error massage because don't have access_token and return status 401", (done) => {
        request(app)
          .post('/products')
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Please Login First']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because have invalid access_token and return status 401", (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Invalid Token Error']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test('It should error massage because role of user is not admin and access is not Authorized with status 401', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: customerToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authorization')
            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toEqual(expect.arrayContaining(['You are not authorized to use this action']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required name and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: '',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["Please input product's name"]))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required image url and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: 'Sweat C',
            image_url: '',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["Please input product's image url"]))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required price and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: null,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["Please input product's price"]))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about required stock and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: null
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["Please input product's stock"]))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about minimal price and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: -100000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["The lowest price is 0"]))
            expect(response.status).toBe(400)
            done()
          })
      })

      test('It should return error messages from SequelizeValidationError about minimal stock and status 400', (done) => {
        request(app)
          .post('/products')
          .set({
            access_token: adminToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 100000,
            stock: -2
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('BAD REQUEST')
            expect(response.body).toHaveProperty('errObj', expect.any(Array))
            expect(response.body.errObj).toEqual(expect.arrayContaining(["The lowest amount of stock is 0"]))
            expect(response.status).toBe(400)
            done()
          })
      })
    })
  })
    
  describe('GET /products/:id', () => {
    describe('Success process', () => {
      test('It should return object about product and status 200', (done) => {
        request(app)
          .get(`/products/${productId}`)
          .set({
            access_token: adminToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('name')
            expect(response.body).toHaveProperty('image_url')
            expect(response.body).toHaveProperty('description')
            expect(response.body).toHaveProperty('CategoryId')
            expect(response.body).toHaveProperty('price')
            expect(response.body).toHaveProperty('stock')
            expect(response.status).toBe(200)
            done()
          })
      })
    })

    describe('Error process', () => {
      test("It should error massage because don't have access_token and return status 401", (done) => {
        request(app)
          .get(`/products/${productId}`)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Please Login First']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because have invalid access_token and return status 401", (done) => {
        request(app)
          .get(`/products/${productId}`)
          .set({
            access_token: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Invalid Token Error']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because Id product undefined and return status 401", (done) => {
        request(app)
          .get(`/products/${productId + 10}`)
          .set({
            access_token: adminToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Not Found')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Not Found']))
            expect(response.status).toBe(404)
            done()
          })
      })
    })
  })

  describe('PUT /products/:id', () => {
    describe('Success process', () => {
      test("It should return array of array and status 200", (done) => {
        request(app)
          .put(`/products/${productId}`)
          .set({
              access_token: adminToken
          })
          .send({
              name : "Kemaja Baru",
              image_url : "https://id-live-01.slatic.net/p/a1a40768ad937837ada6f4e4a5e75824.jpg",
              description: "Made in indonesia",
              CategoryId: 1,
              price : 20000,
              stock : 5
          })
          .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('name')
              expect(response.body).toHaveProperty('image_url')
              expect(response.body).toHaveProperty('description')
              expect(response.body).toHaveProperty('CategoryId')
              expect(response.body).toHaveProperty('price')
              expect(response.body).toHaveProperty('stock')
              expect(response.status).toBe(200)
              done()
          })
      })
    })

    describe('Error process', () => {
      test("It should error massage because don't have access_token and return status 401", (done) => {
        request(app)
          .put(`/products/${productId}`)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Please Login First']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because have invalid access_token and return status 401", (done) => {
        request(app)
          .put(`/products/${productId}`)
          .set({
            access_token: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Invalid Token Error']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test('It should error massage because role of user is not admin and access is not Authorized with status 401', (done) => {
        request(app)
          .put(`/products/${productId}`)
          .set({
            access_token: customerToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authorization')
            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toEqual(expect.arrayContaining(['You are not authorized to use this action']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because id product undefined and return status 401", (done) => {
        request(app)
          .get(`/products/${productId + 10}`)
          .set({
            access_token: adminToken
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Not Found')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Not Found']))
            expect(response.status).toBe(404)
            done()
          })
      })
    })
  })

  describe('DELETE /products/:id', () => {
    describe('Success process', () => {
      test("It should return array of array and status 200", (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .set({
              access_token: adminToken
          })
          .end((err, response) => {
              expect(err).toBe(null)
              expect(response.body).toHaveProperty('message')
              expect(response.body.message).toBe('Delete is successfully')
              expect(response.status).toBe(200)
              done()
          })
      })
    })

    describe('Error process', () => {
      test("It should error massage because don't have access_token and return status 401", (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Please Login First']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test("It should error massage because have invalid access_token and return status 401", (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .set({
            access_token: '12345678'
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authentication')
            expect(response.body).toHaveProperty('errors', expect.any(Array))
            expect(response.body.errors).toEqual(expect.arrayContaining(['Invalid Token Error']))
            expect(response.status).toBe(401)
            done()
          })
      })

      test('It should error massage because role of user is not admin and access is not Authorized with status 401', (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .set({
            access_token: customerToken
          })
          .send({
            name: 'Sweat C',
            image_url: 'https://my-test-11.slatic.net/p/f25a89b9281cb57433b80760715aa596.jpg_340x340q80.jpg_.webp',
            description: 'Sweater with cotton 100% no polyester',
            price: 150000,
            stock: 5
          })
          .end((err, response) => {
            expect(err).toBe(null)
            expect(response.body).toHaveProperty('message')
            expect(response.body.message).toBe('Authorization')
            expect(response.body).toHaveProperty('errors')
            expect(response.body.errors).toEqual(expect.arrayContaining(['You are not authorized to use this action']))
            expect(response.status).toBe(401)
            done()
          })
      })
    })
  })
})