const request = require('supertest');
const app = require('../app');
const { sequelize, Customer, Cart, Product } = require('../models');
const { queryInterface } = sequelize;
const { getToken } = require('../helpers/jwt')
const appPayload = require('../helpers/appPayload')

afterAll((done) => {
    queryInterface.bulkDelete("Customers", {})
        .then(_ => {
          return queryInterface.bulkDelete("CartProducts", {})
        })
        .then(_ => {
          return queryInterface.bulkDelete("Products", {})
        })
        .then(_ => {
          done()
        })
        .catch(err => {
            done(err);
        })
});

let customer1 = {
  email: "test01@mail.com",
  password: "leleyeye"
}
let customer2 = {
  email: "test02@mail.com",
  password: "leleyeye",
  name: "not test 02"
}
let cartItem = {}
let product1 = {
  name: 'customer.test.product.item.01',
  price: 1000,
  stock: 10,
  image_url: 'http://www.google.com'
}

beforeAll(done => {
  Customer
    .create(customer2)
    .then(customer => {
      customer2.id = customer.id
      customer2.avaurl = customer.avaurl
      customer2.name = customer.name
      return Cart.create({
        CustomerId: customer2.id
      })
    })
    .then(_ => {
      return queryInterface.bulkInsert('Products', [
          {
              name: 'product test 01',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '13',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 02',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '15',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 03',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '17',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 04',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '19',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 05',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 06',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 07',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 08',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 09',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 10',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 11',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 12',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 13',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 14',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 15',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 16',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 17',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 18',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 19',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 20',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              name: 'product test 21',
              image_url: "https://api.adorable.io/avatars/125/test01@mail.com.png",
              price: '1000',
              stock: '10',
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ], {});
    })
    .then(_ => {
      return Product.create(product1)
    })
    .then(result => {
      product1.id = result.id
      done()
    })
    .catch(err => done(err))
})

describe('customer route', () => {
  describe('customer register', () => {
    describe('customer register error', () => {
      test('email null', (done) => {
        let nullEmail = {...customer1}
        nullEmail.email = null
        request(app)
          .post("/customer/register")
          .send(nullEmail)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('email is required')
            done()
          })
      })
      test('email empty', (done) => {
        let emptyEmail = {...customer1}
        emptyEmail.email = ''
        request(app)
          .post("/customer/register")
          .send(emptyEmail)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('email is required')
            done()
          })
      })
      test('email invalid', (done) => {
        let invalidEmail = {...customer1}
        invalidEmail.email = 'not email format'
        request(app)
          .post("/customer/register")
          .send(invalidEmail)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('invalid email format')
            done()
          })
      })
      test('email duplicate', (done) => {
        let duplicate = {...customer2}
        request(app)
          .post("/customer/register")
          .send(duplicate)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            done()
          })
      })
      test('password null', (done) => {
        let nullPass = {...customer1}
        nullPass.password = null
        request(app)
          .post("/customer/register")
          .send(nullPass)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('password is required')
            done()
          })
      })
      test('password empty', (done) => {
        let emptyPass = {...customer1}
        emptyPass.password = ''
        request(app)
          .post("/customer/register")
          .send(emptyPass)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('password is required')
            done()
          })
      })
      test('password length error', (done) => {
        let shortPass = {...customer1}
        shortPass.password = "abc"
        request(app)
          .post("/customer/register")
          .send(shortPass)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('required minimum password length is 6 characters')
            done()
          })
      })
      test('avaurl invalid', (done) => {
        let invalidUrl = {...customer1}
        invalidUrl.avaurl = 'not an url'
        request(app)
          .post("/customer/register")
          .send(invalidUrl)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('message', 'bad request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toContain('invalid url format')
            done()
          })
      })
    })
    describe('customer register success', () => {
      test('valid email & password', (done) => {
        let newCustomer1 = {...customer1}
        delete newCustomer1.name
        newCustomer1.email = "test04@mail.com"
        request(app)
          .post("/customer/register")
          .send(newCustomer1)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(201)
            expect(res.body.user).toHaveProperty('email', newCustomer1.email)
            expect(res.body.user).toHaveProperty('id', expect.any(Number))
            expect(res.body.user).toHaveProperty('token', expect.any(String))
            expect(res.body.user).toHaveProperty('avaurl', expect.any(String))
            expect(res.body.user).toHaveProperty('name', expect.any(String))
            done()
          })
      })
      test('valid email, password, name & avaurl', (done) => {
        let newCustomer2 = {...customer1}
        newCustomer2.email = "test03@mail.com"
        newCustomer2.name = "is test 03"
        newCustomer2.avaurl = `https://api.adorable.io/avatars/125/${newCustomer2.email}.png`
        request(app)
          .post("/customer/register")
          .send(newCustomer2)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(201)
            expect(res.body.user).toHaveProperty('email', newCustomer2.email)
            expect(res.body.user).toHaveProperty('id', expect.any(Number))
            expect(res.body.user).toHaveProperty('name', newCustomer2.name)
            expect(res.body.user).toHaveProperty('avaurl', newCustomer2.avaurl)
            expect(res.body.user).toHaveProperty('token', expect.any(String))
            customer1.token = res.body.user.token
            done()
          })
      })
    })
  })
  describe('customer login', () => {
    describe('customer login error', () => {
      test('wrong email & password', (done) => {
        let wrongCustomer = {}
        wrongCustomer.email = "another@mail.com";
        wrongCustomer.password = "another password";
        request(app)
          .post("/customer/login")
          .send(wrongCustomer)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error', 'wrong email/password')
            done()
          })
      })
      test('wrong email', (done) => {
        let wrongEmail = {}
        wrongEmail.email = customer1.email;
        wrongEmail.password = customer2.password;
        request(app)
          .post("/customer/login")
          .send(wrongEmail)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error', 'wrong email/password')
            done()
          })
      })
      test('wrong password', (done) => {
        let wrongPassword = {}
        wrongPassword.email = customer2.email;
        wrongPassword.password = "an invalid password"
        request(app)
          .post("/customer/login")
          .send(wrongPassword)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error', 'wrong email/password')
            done()
          })
      })
    })
    describe('customer login success', () => {
      test('valid email & password', (done) => {
        let valid_customer = {}
        valid_customer.email = customer2.email
        valid_customer.password = customer2.password
        request(app)
          .post("/customer/login")
          .send(valid_customer)
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body.user).toHaveProperty('email', customer2.email)
            expect(res.body.user).toHaveProperty('id', customer2.id)
            expect(res.body.user).toHaveProperty('name', customer2.name)
            expect(res.body.user).toHaveProperty('avaurl', customer2.avaurl)
            expect(res.body.user).toHaveProperty('token', expect.any(String))
            customer2.token = res.body.user.token
            done()
          })
      })
    })
  })
  describe('customer fetch shop', () => {
    describe('customer fetch error', () => {
      test('user token nonexist', (done) => {
        request(app)
          .get("/customer/shop")
          .set({
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'token not found')
            done()
          })
      })
      test('invalid user token', (done) => {
        let invalidToken = {}
        invalidToken.token = "wrong token"
        request(app)
          .get("/customer/shop")
          .set({
            token: invalidToken.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'invalid token')
            done()
          })
      })
    })
    describe('customer fetch success', () => {
      test('valid user token', (done) => {
        let validUser = {...customer2}
        request(app)
          .get("/customer/shop")
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('products', expect.any(Array))
            expect(res.body.products.length).toBe(20)
            done()
          })
      })
    })
  })
  describe('customer add item to cart', () => {
    describe('customer add item to cart error', () => {
      test('invalid user token', (done) => {
        let invalidToken = {...customer2}
        invalidToken.token = 'not valid token'
        let validItem = {
          amount: 1,
          itemId: 1
        }
        request(app)
          .post("/customer/cart")
          .send(validItem)
          .set({
            token: invalidToken.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'invalid token')
            done()
          })
      })
      test('user token nonexist', (done) => {
        let validUser = {...customer2}
        let validItem = {
          amount: 1,
          itemId: 1
        }
        request(app)
          .post("/customer/cart")
          .send(validItem)
          .set({
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'token not found')
            done()
          })
      })
      test('item id nonexist', (done) => {
        let validUser = {...customer2}
        let noItemId = {
          amount: 1
        }
        request(app)
          .post("/customer/cart")
          .send(noItemId)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'itemid & amount required')
            done()
          })
      })
      test('quantity nonexist', (done) => {
        let validUser = {...customer2}
        let noQty = {
          itemId: 1
        }
        request(app)
          .post("/customer/cart")
          .send(noQty)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'itemid & amount required')
            done()
          })
      })
      test('item id invalid', (done) => {
        let validUser = {...customer2}
        let invalidItemId = {
          itemId: 99999,
          amount: 1
        }
        request(app)
          .post("/customer/cart")
          .send(invalidItemId)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(404)
            expect(res.body).toHaveProperty('error', 'itemid not found')
            done()
          })
      })
      test('quantity null', (done) => {
        let validUser = {...customer2}
        let invalidQuantity = {
          itemId: 1,
          amount: null
        }
        request(app)
          .post("/customer/cart")
          .send(invalidQuantity)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'itemid & amount required')
            done()
          })
      })
      test('quantity invalid', (done) => {
        let validUser = {...customer2}
        let invalidQuantity = {
          itemId: 1,
          amount: 'not a number'
        }
        request(app)
          .post("/customer/cart")
          .send(invalidQuantity)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'itemid & amount required')
            done()
          })
      })
      test('quantity greater than item stock', (done) => {
        let validUser = {...customer2}
        let stockInsufficient = {
          itemId: product1.id,
          amount: 10000
        }
        request(app)
          .post("/customer/cart")
          .send(stockInsufficient)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'insufficient product stock')
            done()
          })
      })
    })
    describe('customer add item to cart success', () => {
      test('valid user token, valid item id, and stock > quantity', (done) => {
        let validUser = {...customer2}
        let addedItem = {
          itemId: product1.id,
          amount: 1
        }
        request(app)
          .post("/customer/cart")
          .send(addedItem)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'added to cart')
            expect(res.body).toHaveProperty('itemId', addedItem.itemId)
            expect(res.body).toHaveProperty('cartItemId', expect.any(Number))
            expect(res.body).toHaveProperty('amount', addedItem.amount)
            cartItem = {...res.body}
            done()
          })
      })
    })
  })
  describe('customer fetch cart', () => {
    describe('customer fetch error', () => {
      test('user token nonexist', (done) => {
        request(app)
          .get("/customer/cart")
          .set({
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'token not found')
            done()
          })
      })
      test('invalid user token', (done) => {
        let invalidToken = {}
        invalidToken.token = "wrong token"
        request(app)
          .get("/customer/cart")
          .set({
            token: invalidToken.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'invalid token')
            done()
          })
      })
    })
    describe('customer fetch success', () => {
      test('valid user token', (done) => {
        let validUser = {...customer2}
        request(app)
          .get("/customer/cart")
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('cartItems', expect.any(Array))
            if (res.body.cartItems.length > 0) {
              expect(res.body.cartItems[0]).toHaveProperty('name', expect.any(String))
              expect(res.body.cartItems[0]).toHaveProperty('quantity', expect.any(Number))
              expect(res.body.cartItems[0]).toHaveProperty('stock', expect.any(Number))
              expect(res.body.cartItems[0]).toHaveProperty('price', expect.any(Number))
            }
            done()
          })
      })
    })
  })
  describe('customer update cart qty', () => {
    describe('customer update cart qty error', () => {
      test('user token nonexist', (done) => {
        let validUser = {...customer2}
        let validCartItemId = {...cartItem}
        request(app)
          .patch(`/customer/cart/${validCartItemId.cartItemId}`)
          .send(validCartItemId)
          .set({
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'token not found')
            done()
          })
      })
      test('invalid token', (done) => {
        let invalidToken = {...customer2}
        invalidToken.token = 'notvalidtoken'
        let validCartItemId = {...cartItem}
        request(app)
          .patch(`/customer/cart/${validCartItemId.cartItemId}`)
          .send(validCartItemId)
          .set({
            token: invalidToken.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'invalid token')
            done()
          })
      })
      test('invalid cartitemid', (done) => {
        let validUser = {...customer2}
        let invalidCartItemId = {...cartItem}
        invalidCartItemId.cartItemId = 'not'
        request(app)
          .patch(`/customer/cart/${invalidCartItemId.cartItemId}`)
          .send(invalidCartItemId)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'cart item id required')
            done()
          })
      })
      test('cart item id nonexist', (done) => {
        let validUser = {...customer2}
        let nonexistCartItemId = {...cartItem}
        delete nonexistCartItemId.cartItemId
        request(app)
          .patch(`/customer/cart/${nonexistCartItemId.cartItemId}`)
          .send(nonexistCartItemId)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'cart item id required')
            done()
          })
      })
      test('wrong user token', (done) => {
        let wrongUser = {...customer1}
        let validCartItemId = {...cartItem}
        request(app)
          .patch(`/customer/cart/${validCartItemId.cartItemId}`)
          .send(validCartItemId)
          .set({
            token: wrongUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('error', 'not authorized for cart item id')
            done()
          })
      })
    })
    describe('customer update cart qty success', () => {
      test('valid token, valid item id, and stock >= quantity', (done) => {
        let validUser = {...customer2}
        let validCartItemId = {...cartItem}
        request(app)
          .patch(`/customer/cart/${validCartItemId.cartItemId}`)
          .send(validCartItemId)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'product qty updated')
            done()
          })
      })
    })
  })
  describe('customer remove item from cart', () => {
    describe('customer remove cart item error', () => {
      test('invalid token', (done) => {
        let invalidToken = {...customer2}
        invalidToken.token = 'nottoken'
        let validCartItemId = {...cartItem}
        request(app)
          .delete(`/customer/cart/${validCartItemId.cartItemId}`)
          .set({
            token: invalidToken.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'invalid token')
            done()
          })
      })
      test('token nonexist', (done) => {
        let validUser = {...customer2}
        let validCartItemId = {...cartItem}
        request(app)
          .delete(`/customer/cart/${validCartItemId.cartItemId}`)
          .set({
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'token not found')
            done()
          })
      })
      test('invalid cartitemid', (done) => {
        let validUser = {...customer2}
        let invalidCartItemId = {...cartItem}
        invalidCartItemId.cartItemId = 'notitemid'
        request(app)
          .delete(`/customer/cart/${invalidCartItemId.cartItemId}`)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'cart item id required')
            done()
          })
      })
      test('cartitemid nonexist', (done) => {
        let validUser = {...customer2}
        let nonexistCartItemId = {...cartItem}
        delete nonexistCartItemId.cartItemId
        request(app)
          .delete(`/customer/cart/${nonexistCartItemId.cartItemId}`)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('error', 'cart item id required')
            done()
          })
      })
      test('wrong user token', (done) => {
        let wrongUser = {...customer1}
        let validCartItemId = {...cartItem}
        request(app)
          .delete(`/customer/cart/${validCartItemId.cartItemId}`)
          .set({
            token: wrongUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('error', 'not authorized for cart item id')
            done()
          })
      })
    })
    describe('customer remove cart item success', () => {
      test('valid token, valid cart item id', (done) => {
        let validUser = {...customer2}
        let validCartItemId = {...cartItem}
        request(app)
          .delete(`/customer/cart/${validCartItemId.cartItemId}`)
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'item deleted')
            done()
          })
      })
    })
  })
  describe('customer clear cart', () => {
    describe('customer clear cart error', () => {})
    describe('customer clear cart success', () => {
      test('valid user, clear cart success', (done) => {
        let validUser = {...customer2}
        request(app)
          .delete("/customer/cart/all")
          .set({
            token: validUser.token
          })
          .end((err, res) => {
            expect(err).toBeNull()
            // expect(res.body).toBe(expect.any(Array))
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'cart cleared successfully')
            done()
          })
      })
    })
  })
})
