"use strict"
if(process.env.NODE_ENV === 'test')require('dotenv').config()
const supertest = require('supertest')
const { queryInterface } = require('../models').sequelize
const app = require('../app')

describe('Store Router', () => {
    const storeSeed = [
        { name: 'Toko Alpha', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Toko Beta' , createdAt: new Date(), updatedAt: new Date() },
        { name: 'Toko Charlie' , createdAt: new Date(), updatedAt: new Date() },
    ]
    const dataUser = {
        name: 'Adam Primarizki',
        email: 'Adam.primarizki@gmail.com',
        img_url: 'http//migur.com/asdfghjkl',
        password: 'asdasdasd123',
        passwordConfirm: 'asdasdasd123',
        store_name: 'Toko Mita',
        role: 'Staff'
    }
    const dataLogin = {
        email: 'Adam.primarizki@gmail.com',
        password: 'asdasdasd123'
    }

    beforeAll(done => {
        queryInterface.bulkInsert('Stores', storeSeed)
        .then(_ => done())
        .catch(done)
    })
    afterAll(done => {
        queryInterface.bulkDelete('Users', {})
        .then(_ => { 
            return queryInterface.bulkDelete('Stores', {})
        })
        .then(_ => done())
        .catch(done)
    })

    describe('Store found', () => {
        const keyword = 'Toko'
        it('should return found stores', done => {
            supertest(app)
            .post('/register')
            .send(dataUser)
            .end(() => {
                supertest(app)
                .post('/login')
                .send(dataLogin)
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    const token = res.body.token
                    supertest(app)
                    .get(`/store/${keyword}`)
                    .set('token', token)
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('data')
                        expect(res.body.data.length).toBeGreaterThan(0)
                        done()
                    })
                })
            })
        })

        it('should return unauthorized error: 401', done => {
            supertest(app)
            .get(`/store/${keyword}`)
            .expect('Content-Type', /json/)
            .expect(401)
            .end((err, res) => {
                expect(err).toBe(null)
                expect(res.body).toHaveProperty('msg', 'You are not authenticated.')
                done()
            })
        })

        it('should edit store', done => {
            supertest(app)
            .post('/register')
            .send({...dataUser, role: 'Admin', email: 'Zlatan2@mail.com'})
            .end((err, res) => {
                const id = res.body.store_id
                supertest(app)
                .post('/login')
                .send({
                    email: 'Zlatan2@mail.com',
                    password: 'asdasdasd123'
                })
                .expect('Content-Type', /json/)
                .expect(201)
                .end((err, res) => {
                    const token = res.body.token
                    supertest(app)
                    .put(`/store/${id}`)
                    .set('token', token)
                    .send({name: 'Toko Natalz'})
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('msg', 'Store edited')
                        done()
                    })
                })
            })
        })

        it('should return unauthorized admin', done => {
            supertest(app)
            .post('/register')
            .send({...dataUser, store_name: 'Toko Zlatan', email: 'Zlatan@mail.com', role: 'Admin'})
            .end((err, res) => {
                const id = res.body.store_id
                supertest(app)
                .post('/register')
                .send({...dataUser, store_name: 'Toko Zlatan', role: 'Staff'})
                .end(() => {
                    supertest(app)
                    .post('/login')
                    .send(dataUser)
                    .expect('Content-Type', /json/)
                    .expect(201)
                    .end((err, res) => {
                        const token = res.body.token
                        supertest(app)
                        .put(`/store/${id}`)
                        .set('token', token)
                        .send({name: 'Toko Natalz'})
                        .expect('Content-Type', /json/)
                        .expect(401)
                        .end((err, res) => {
                            expect(err).toBe(null)
                            expect(res.body).toHaveProperty('msg', 'You cannot edit or add product to this store. Please contanct the owner.')
                            done()
                        })
                    })
                })
            })
        })
    })
})
