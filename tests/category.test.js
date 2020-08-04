const request = require('supertest')
const { generateToken } = require('../helpers/jwt')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token
let categoryId

beforeAll(done => {
    let input = {
        name: 'Ramadesy',
        email: 'ramadesy@gmail.com',
        password: 'ramadesy1',
        role: 'admin'
    }
    User.create(input)
        .then(user => {
            return User.findOne({
                where: {
                    id: user.id
                }
            })
        })
        .then(user => {
            //set token dari hasil login
            access_token = generateToken({ id: user.id })
            done()
        })
})

afterAll((done) => {
    queryInterface.bulkDelete('Categories', {})
        .then(_ => {
            done()
        })
        .catch(err => done(err))
})

describe('Category Endpoints', () => {
    describe('success process', () => {
        describe('get categories', () => {
            it('should return an object categories and status 200', (done) => {
                request(app)
                    .get('/categories')
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('categories', expect.any(Array))
                        done()
                    })
            })
        })

        describe('create category', () => {
            it('should create a new category', done => {
                const data = {
                    name: 'baju'
                }
                request(app)
                    .post(`/categories`)
                    .set('access_token', access_token)
                    .send(data)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(201)
                        expect(res.body).toHaveProperty('category')
                        categoryId = res.body.category.id
                        done()
                    })
            })
        })

        describe('Get one category success', () => {
            it('should fetch a single category', done => {
                request(app)
                    .get(`/categories/${categoryId}`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('category')
                        done()
                    })
            })
        })

        describe('update category success', () => {
            it('should update a category', done => {
                const data = {
                    name: 'Baju'
                }
                request(app)
                    .put(`/categories/${categoryId}`)
                    .set('access_token', access_token)
                    .send(data)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        expect(res.body).toHaveProperty('category')
                        categoryId = res.body.category.id
                        done()
                    })
            })
        })

        describe('Delete one category success', () => {
            it('should delete a single category', done => {
                request(app)
                    .delete(`/categories/${categoryId}`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(200)
                        done()
                    })
            })
        })
    })
    describe('error process', () => {
        describe('create category', () => {
            it('should return validation error', (done) => {
                request(app)
                    .post('/categories')
                    .set('access_token', access_token)
                    .field('price', '')
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(400)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
        })

        describe('Get one category error', () => {
            it('should return error not found', done => {
                request(app)
                    .get(`/category/0`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(404)
                        done()
                    })
            })
        })
        describe('Delete one category error not found', () => {
            it('should return error not found', done => {
                request(app)
                    .delete(`/category/xxx`)
                    .set('access_token', access_token)
                    .end((err, res) => {
                        expect(res.statusCode).toEqual(404)
                        done()
                    })
            })
        })

    })
})
