const request = require('supertest')
const app = require('../app')
const {sequelize,User} = require('../models')
const {queryInterface} = sequelize
const helper = require('../helpers/helper')

let data = {
    email: 'testing@mail.com',
    password:'testing',
    isAdmin:false
}

let dataAdmin = {
    email:'admin@mail.com',
    password:'admin12',
    idAdmin:true
}

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users',{})
        .then(_ => {
            done()
        })
        .catch(err => done(err))
    })

    describe.skip('POST /register',() => {
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

    describe.skip('POST /login', () => {
        describe('success process', () => {
            test('should send an object (email,id,token) with status 200', (done) => {
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
        describe('error process', () => {
            test('should send an error with status 400 cause email / password wrong', (done) => {
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
    
    describe('POST /loginAdmin', () => {
        beforeAll((done) => {
            User.create({
                email: dataAdmin.email,
                password: dataAdmin.password,
                isAdmin: true
            })
            .then((result) => {
                const {id} = result
                token = helper.getToken({id,email:dataAdmin.email})
                done()
            }).catch((err) => {
                console.log(err)
                done(err)
            });
        })
        describe('success process', () => {
            test('should send an object (email,id,token) with status 200', (done) => {
                request(app)
                .post('/loginAdmin')
                .send(dataAdmin)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('email',expect.any(String))
                    expect(res.body).toHaveProperty('id',expect.any(Number))
                    expect(res.body).toHaveProperty('token',expect.any(String))
                    expect(res.status).toBe(200)
                    done()
                })
            })
        })
        describe.skip('error process wrong token', () => {
            test('should send and object(message, status) with status 403', (done) => {
                request(app)
                .post('/loginAdmin')
                .send(dataAdmin)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(String))
                    expect(res.body).toHaveProperty('status',expect.any(Number))
                    expect(res.status).toBe(403)
                    done()
                })
            })
        })
        describe.skip('error process', () => {
            test('should send an object (message, status) with status 400', (done) => {
                request(app)
                .post('/loginAdmin')
                .send(dataAdmin)
                .end((err,res) => {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty('message',expect.any(String))
                    expect(res.body).toHaveProperty('status',expect.any(Number))
                    expect(res.status).toBe(400)
                    done()
                })
            })
        })
        
    })  
})
