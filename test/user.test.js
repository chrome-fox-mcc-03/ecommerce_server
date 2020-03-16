const request = require('supertest')
const app = require('../app')
const {sequelize} = require('../models')
const {queryInterface} = sequelize

let data = {
    email: 'testing@mail.com',
    password:'testing',
    isAdmin:false
}

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users',{})
        .then(_ => {
            done()
        })
        .catch(err => done(err))
    })

    describe('POST /register',() => {
        describe('success process',() => {
            test('should send an object (email,id,token) with status 201 ', (done) => {
                request(app)
                .post('/register')
                .send(data)
                .end((err,res) => {
                    console.log(res.body)
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('email',expect.any(String))
                    expect(res.body).toHaveProperty('id',expect.any(Number))
                    expect(res.body).toHaveProperty('token',expect.any(String))
                    expect(res.status).toBe(201)
                    done()
                })
            })
        })

        describe.skip('error process', () => { // skip agar menghindari email kembar
            test('should send an errror with status 400 cause of missing email', (done) => {
                const withoutEmail = {...data}
                delete withoutEmail.email
                request(app)
                .post('/register')
                .send(withoutEmail)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(Array))
                    expect(res.body.message[0]).toContain('email cant empty')
                    expect(res.status).toBe(400)
                    done()
                })
            })
        })

        describe.skip('error process', () => { // skip agar menghindari email kembar
            test('should send an error with status 400 cause password min 6 characters',(done) => {
                let passwordLengthFalse = {...data,password:'5char'}
                request(app)
                .post('/register')
                .send(passwordLengthFalse)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(Array))
                    expect(res.body.message[0]).toContain('password min 6 characters')
                    expect(res.status).toBe(400)
                    done()
                })
            })
        })
    })

    describe('POST /login', () => {
        describe('success process',() => {
            test('should send an object (email,id,token) with status 200',(done) => {
                request(app)
                .post('/login')
                .send(data)
                .end((err,res) => {
                    expect(err).toBe(null) // error server / error jest
                    expect(res.body).toHaveProperty('email',expect.any(String))
                    expect(res.body).toHaveProperty('id',expect.any(Number))
                    expect(res.body).toHaveProperty('token',expect.any(String))
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })
        describe('error process',() => {
            test('should send an error with status 400 cause email / password wrong',(done) => {
                let wrongEmail = {...data,email:'wrong@mail.com'}
                request(app)
                .post('/login')
                .send(wrongEmail)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(String))
                    expect(res.status).toBe(400)
                    done()
                })
            })
        })
    })
})