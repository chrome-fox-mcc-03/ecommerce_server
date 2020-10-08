const request = require('supertest')
const app = require('../app')

describe('Category test. Data in database was seeded', () => {
  describe('Category findAll', () => {
    test('Should return an object with property categories that contain array of objects. Status code 200', done => {
      request(app)
        .get('/categories')
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(200)
          expect(res.body).toHaveProperty('categories', 
            expect.arrayContaining([
              expect.objectContaining(
                { name: 'rice' },
                { name: 'noodle and pasta' },
                { name: 'meat' },
                { name: 'pastry' },
                { name: 'beverage' })
            ]))
          done()
      })  
    })
  })

  describe('Category find By id', () => {
    describe('Find by id successful', () => {
      test('Should return an object of requested category', done => {
        request(app)
          .get('/categories/5')
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('category', 
              expect.objectContaining(
                { name: 'beverage' }
              ))
            done()
          })
      })
    })

    describe('Find by id error not found', () => {
      test('Should return an object of requested category', done => {
        request(app)
          .get('/categories/6')
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('errors', expect.arrayContaining(['Category not found']))
            done()
          })
      })
    })
  })
})