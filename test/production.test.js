const request = require('supertest')
const app = require('../app')
const { Production, Cart, User ,sequelize } = require('../models')
const { queryInterface } = sequelize
const { decode,sign } = require('../helper/jwt')
let token;
const data = {
  email : "adamjay@gmail.com",
  password : "123456",
  RoleId : 1
}
let id;

describe.only('Product Testing' ,() => {
  beforeEach( async () => {
    try {
      const res = await User.create({
        email : data.email,
        password : data.password,
        RoleId: 1
      })
      const payload  = {id : res.id,email : res.email, RoleId : res.RoleId}
      token = sign(payload)
    } catch (error) {
      console.log(error)
    }
  })
  afterEach((done) => {
    queryInterface.bulkDelete('Users',{})
    .then(_=> {
      done()
    })
    .catch(err => {
      done(err)
    })
  }),
  afterAll( async () => {
    try {
      const res = queryInterface.bulkDelete('Producstions',{})
    } catch (error) {
      console.log(error)
    }
  })
  describe('Succsess testing',() => {
    test('Success add', async () => {
      try {
        console.log(token)
        const res = await request(app).post(`/product`).send({
          name : "coba1",
          stock: 90,
          description : "hiya",
          price : 8000,
          url : "www.img.com",
          CategoryId : 1
        }).set({token})
        id = res.body.id
        expect(res.body).toHaveProperty('message','add success')
        expect(res.status).toBe(201)
      } catch (error) {
        expect(error).toBe(null)
      }
    })
    test('Success Edit', async () => {
      try {
        const res = await request(app).patch(`/product/${id}`).set({token}).send({
          name : "coba1",
          stock: "90",
          description : "hiya",
          price : 9000,
          url : "www.img.com",
          CategoryId : 1
        })
        expect(res.body).toHaveProperty('message','edit success')
        expect(res.status).toBe(200)
      } catch (error) {
        expect(error).toBe(null)
      }
    })
    test('Success fecth', async () => {
      try {
        const res = await request(app).get('/product').set({token})
        console.log(res.body)
        expect(res.body[0]).toHaveProperty('name',expect.any(String))
        expect(res.body[0]).toHaveProperty('stock',expect.any(Number))
        expect(res.body[0]).toHaveProperty('description',expect.any(String))
        expect(res.body[0]).toHaveProperty('price',expect.any(Number))
        expect(res.status).toBe(200)
      } catch (error) {
        console.log(error)
        expect(error).toBe(null)
      }
    })
    test('Success delete', async () => {
      try {
        const res = await request(app).delete(`/product/${id}`).set({token})
        expect(res.body).toHaveProperty('message','delete success')
        expect(res.status).toBe(200)
      } catch (error) {
        expect(error).toBe(null)
      }
    })
  })
  describe('Invalid Add', () => {
    describe('invalid Add', () => {
      test('invalid missing table name', async () => {
        try {
          const res = await request(app).post('/product').send({
            stock: 90,
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Name for the Porduct')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table name', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : '',
            stock: 90,
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Name for the Porduct')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table stok', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : 'hiya',
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert The Quanty Product')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table stok', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : 'hiya',
            stock: 0,
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Minimum quanty 1')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table description' , async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : "hiyaa",
            stock: 90,
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Plese insert description to give infomation to the customer')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table price', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : "hehehe",
            stock: 90,
            description : "hiya",
            price : 0,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Price minimum 100 ')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table price', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : 'hiya',
            stock: 90,
            description : "hiya",
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Price')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table url', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : 'hua',
            stock: 90,
            description : "hiya",
            price : 8000,
          }).set({token})
          expect(res.body.message).toContain('Please insert Url_image')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table url', async  () => {
        try {
          const res = await request(app).post('/product').send({
            name : 'hua',
            stock: 90,
            description : "hiya",
            price : 8000,
            url : ""
          }).set({token})
          expect(res.body.message).toContain('Please Insert Url_image')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
    })
    describe('Invalid edit', () => {
      test('invalid missing table name', async  () => {
        try {
          const res = await request(app).patch(`/product/${id}`).send({
            name : '',
            stock: 90,
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Name for the Porduct')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table stok', async  () => {
        try {
          const res = await request(app).patch(`/product/${id}`).send({
            name : 'hiya',
            stock: 0,
            description : "hiya",
            price : 8000,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Minimum quanty 1')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table price', async  () => {
        try {
          const res = await request(app).patch(`/product/${id}`).send({
            name : 'hehe',
            stock: 90,
            description : "hiya",
            price : 0,
            url : "www.img.com"
          }).set({token})
          expect(res.body.message).toContain('Please insert Price minimum 100 ')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
      test('invalid missing table url', async  () => {
        try {
          const res = await request(app).patch(`/product/${id}`).send({
            name : 'hiyaa',
            stock: 90,
            description : "hiya",
            price : 8000,
            url : ""
          }).set({token})
          expect(res.body.message).toContain('Please Insert Url_image')
          expect(res.status).toBe(400)
        } catch (error) {
          expect(error).toBe(null)
        }
      })
    })
  })
})