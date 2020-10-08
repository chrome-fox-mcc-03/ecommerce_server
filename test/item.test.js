const request = require('supertest')
const app = require('../app')
const { sequelize, User, Item } = require('../models')
const { queryInterface } = sequelize
const { sign } = require('../helpers/jwt')

describe('Item test', () =>  {
  let tokenAdmin = ''
  let tokenUser = ''
  let itemId = 0

  beforeAll(done => {
    User.create({
      username: 'admin',
      email: 'admin@admin.com',
      password: 'qwe',
      role: true
    })
      .then(user => {
        let id = user.id
        tokenAdmin = sign(id)
        return User.create({
          username: 'bukanAdmin',
          email: 'bukan@userBiasa.com',
          password: 'qwe'
        })
      .then(user => {
        let id = user.id
        tokenUser = sign(id)
        return queryInterface.bulkInsert('Items', [
          {
            name: 'Rendang',
            imageUrl: 'https://cdn2.tstatic.net/jogja/foto/bank/images/resep-rendang-ide-olahan-daging-kurban-lezat-dan-awet-disimpan.jpg',
            price: 50000,
            stock: 50,
            CategoryId: 3
          },
          {
            name: 'Mie Telor',
            imageUrl: 'https://img-global.cpcdn.com/recipes/5d9dab1cac158d72/751x532cq70/mie-telor-goreng-pedas-foto-resep-utama.jpg',
            price: 20000,
            stock: 100,
            CategoryId: 2
          }
        ])
      })
    })
    .then(() => {
      return Item.create({
        name: 'Kue Keju',
        imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
        price: 20000,
        stock: 30,
        CategoryId: 4
      })
    })
    .then(item => {
      itemId = item.id
      done()
    })
    .catch(done)
  })

  afterAll(done => {
    tokenAdmin = ''
    tokenUser = ''
    queryInterface.bulkDelete('Users', {})
      .then(() => {
        return queryInterface.bulkDelete('Items', {})
      })
      .then(() => {
        done()
      })
      .catch(done)
  })

  describe('Items findAll', () => {
    test('Should return objects contain items with status code 200', done => {
      request(app)
        .get('/items')
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('items' 
            // expect.arrayContaining([
            //   expect.objectContaining({
            //     name: 'Rendang',
            //     imageUrl: 'https://cdn2.tstatic.net/jogja/foto/bank/images/resep-rendang-ide-olahan-daging-kurban-lezat-dan-awet-disimpan.jpg',
            //     price: 50000,
            //     stock: 50,
            //     CategoryId: 3
            //   }),
            //   expect.objectContaining({
            //     name: 'Mie Telor',
            //     imageUrl: 'https://img-global.cpcdn.com/recipes/5d9dab1cac158d72/751x532cq70/mie-telor-goreng-pedas-foto-resep-utama.jpg',
            //     price: 20000,
            //     stock: 100,
            //     CategoryId: 2
            //   }),
            //   expect.objectContaining({
            //     name: 'Kue Keju',
            //     imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
            //     price: 20000,
            //     stock: 30,
            //     CategoryId: 4
            //   })
            // ])
            )
            done()
        })
    })
  })

  describe('Create new item', () => {
    describe('Create successful', () => {
      test('Should return an object contain message of success with status 201', done => {
        request(app)
          .post('/items')
          .set('token', tokenAdmin)
          .send({
            name: 'Es Teh Manis',
            imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
            price: 3000,
            stock: 200,
            CategoryId: 5
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('message', 'Create item successful')
            done()
          })
      })
    })

    describe('Create item error', () => {
      describe('item name null', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: 3000,
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item name cannot empty']))
              done()
            })
        })
      })

      describe('item name empty string', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: '',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: 3000,
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item name cannot empty']))
              done()
            })
        })
      })

      describe('item price null', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: 'Es Teh Anget',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item price cannot be null']))
              done()
            })
        })
      })

      describe('Item price negative', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: 'Es Teh Anget',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: -5,
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Price cannot be negative']))
              done()
            })
        })
      })

      describe('item stock null', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: 'Es Teh Anget',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: 3000,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item stock cannot be null']))
              done()
            })
        })
      })

      describe('item stock negative', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: 'Es Teh Anget',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: 3000,
              stock: -5,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Stock cannot be negative']))
              done()
            })
        })
      })

      describe('Image path not URL', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenAdmin)
            .send({
              name: 'Es Teh Anget',
              imageUrl: 'EsTheAnget',
              price: 3000,
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Image path must be URL']))
              done()
            })
        })
      })

      describe('Unauthorized user error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .post('/items')
            .set('token', tokenUser)
            .send({
              name: 'Es teh anget',
              imageUrl: 'https://cdn.akurat.co/images/uploads/images/akurat_20181029123557_B6tXpj.jpg',
              price: 3000,
              stock: 200,
              CategoryId: 5
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(401)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Please login properly']))
              done()
            })
        })
      })
      })
    })

  describe('Item find By id', () => {
    describe('Item find by id success', () => {
      test('should return an object that contain success message with status code 200', done => {
        request(app)
          .get(`/items/${itemId}`)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('item', 
              expect.objectContaining({
                name: 'Kue Keju',
                imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
                price: 20000,
                stock: 30,
                CategoryId: 4
              }))
              done()
          })
      })
    })

    describe('Item find by id error item not found', () => {
      test('Should return object contain errors in array', done => {
        request(app)
          .get('/items/0')
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item not found']))
            done()
          })
      })
    })
  })

  describe('Item update', () => {
    describe('Item update successful', () => {
      test('should return an object that contain success message with status code 200', done => {
        request(app)
          .put(`/items/${itemId}/update`)
          .set('token', tokenAdmin)
          .send({
            name: 'Cheese Cake',
            imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
            price: 25000,
            stock: 50,
            CategoryId: 4
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'Update item successful')
            done()
          })
      })
    })

    describe('Item update error', () => {
      describe('Item not found error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .put('/items/0/update')
            .set('token', tokenAdmin)
            .send({
              name: 'Cheese Cake with stroberies',
              imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
              price: 30000,
              stock: 50,
              CategoryId: 4
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item not found']))
              done()
            })
        })
      })

      describe('Item name empty error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .put(`/items/${itemId}/update`)
            .set('token', tokenAdmin)
            .send({
              name: '',
              imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
              price: 30000,
              stock: 50,
              CategoryId: 4
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item name cannot empty']))
              done()
            })
        })
      })

      describe('Unauthorized error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
            .put(`/items/${itemId}/update`)
            .set('token', tokenUser)
            .send({
              name: 'Cheese cake with stroberries',
              imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/4/23/0/64372_Giadas-Dessert_s4x3.jpg.rend.hgtvcom.826.620.suffix/1432385386166.jpeg',
              price: 30000,
              stock: 50,
              CategoryId: 4
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(401)
              expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Please login properly']))
              done()
            })
        })
      })
    })
  })

  describe('Item delete', () => {
    describe('Item delete error', () => {
      describe('Item not found error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
          .delete(`/items/0/delete`)
          .set('token', tokenAdmin)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Item not found']))
            done()
          })
        })
      })

      describe('Unauthorized error', () => {
        test('Should return object contain errors in array', done => {
          request(app)
          .delete(`/items/${itemId}/delete`)
          .set('token', tokenUser)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Please login properly']))
            done()
          })
      })
    })
  })

    describe('Item delete success', () => {
      test('Should return object contain errors in array', done => {
        request(app)
          .delete(`/items/${itemId}/delete`)
          .set('token', tokenAdmin)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('message', 'Delete item successful')
            done()
          })
      })
    })
  })
})