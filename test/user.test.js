const request = require('supertest')
const {User} = require("../models")
const app = require('../app')
const {
    sequelize
} = require('../models')
const {
    queryInterface
} = sequelize

// USE SYSADMIN AS SAMPLE
let data = {
    email: 'sysadmin@mail.com',
    password: 'precious',
    role: "admin"
}

afterAll((done) => {
    // queryInterface.bulkDelete("Users", {})
    //     .then(_ => {
    //         done()
    //     })
    //     .catch(err => {
    //         done(err)
    //     })
    User.destroy({
        where: {
            email: data.email
        }
    })
    .then(_ => {
        done()
    })
    .catch(err => {
        done(err)
    })
})

describe('--- USER ROUTES ---', () => {

    // IF WE/RE ABOUT TO IMPOSE UNIQUE EMAIL, THEN WE MAY ONLY DELETE AFTER
    // EVERY TEST IS DONE
    // afterEach((done) => {
    //     queryInterface.bulkDelete('Users', {})
    //       .then(_ => {
    //         done()
    //       }).catch(err => done(err))
    // })


    // USER REGISTER
    describe('POST /register', () => {

        // REGISTER SUCCESS
        describe('REGISTER SUCCESS', () => {
            test('SHOULD SEND AN OBJECT(ID, EMAIL, ROLE) WITH STATUS CODE 201', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        // console.log(res);
                        // console.log(res.body);
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty("data", expect.any(Object))
                        expect(res.body.data).toHaveProperty('id', expect.any(Number))
                        expect(res.body.data).toHaveProperty('id', expect.any(Number))
                        expect(res.body.data).toHaveProperty('email', data.email)
                        expect(res.body.data).toHaveProperty('role', data.role)
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })


        // EMAIL ERRORS
        describe('REGISTER ERRORS TYPE 1: EMAIL', () => {

            // EMAIL IS EMPTY/MISSING
            test('SHOULD SEND ERROR 400 BECAUSE OF MISSING EMAIL', (done) => {
                const withoutEmail = {
                    ...data
                }
                delete withoutEmail.email
                request(app)
                    .post('/register')
                    .send(withoutEmail)
                    .end((err, res) => {
                        console.log("ERROR RESPONSE");
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log("RES STATUS");
                        // console.log(res.status);
                        // expect(err).toBe(null)
                        // expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })

            // EMAIL INVALID
            test('SHOULD SEND ERROR 400 BECAUSE OF INVALID EMAIL FORMAT', (done) => {
                const invalidEmail = {
                    ...data,
                    email: "sysadmin"
                }
                request(app)
                    .post('/register')
                    .send(invalidEmail)
                    .end((err, res) => {
                        console.log("ERROR RESPONSE");
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log("RES STATUS");
                        // console.log(res.status);
                        expect(err).toBe(null)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })


            // EMAIL DUPLICATE
            test('SHOULD SEND ERROR 400 BECAUSE OF DUPLICATE EMAIL', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        console.log("ERROR RESPONSE");
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log("RES STATUS");
                        // console.log(res.status);
                        expect(err).toBe(null)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })
            
        })



        describe('REGISTER ERRORS TYPE 2: PASSWORD', () => {

            // PASSWORD IS EMPTY
            test("SHOULD SEND ERROR 400 BECAUSE OF EMPTY PASSWORD", (done) => {
                const withoutPassword = {
                    ...data
                }
                delete withoutPassword.password
                request(app)
                    .post("/register")
                    .send(withoutPassword)
                    .end((err, res) => {
                        console.log("ERROR RESPONSE");
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log("RES STATUS");
                        // console.log(res.status);
                        expect(err).toBe(null)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })


            // INSUFFICIENT PASSWORD LENGTH
            test("SHOULD SEND ERROR 400 BECAUSE OF INSUFFICIENT PASSWORD LENGTH", (done) => {
                const warpedPassword = {
                    ...data,
                    password: "haha"
                }
                request(app)
                    .post("/register")
                    .send(warpedPassword)
                    .end((err, res) => {
                        console.log("ERROR RESPONSE");
                        // console.log(res);
                        // console.log("RES BODY");
                        // console.log(res.body);
                        // console.log("RES STATUS");
                        // console.log(res.status);
                        expect(err).toBe(null)
                        expect(res.status).toBe(400)
                        expect(res.body).toHaveProperty('message', expect.any(String))
                        expect(res.body.errors.length).toBeGreaterThan(0)
                        expect(res.body).toHaveProperty('errors', expect.any(Array))
                        done()
                    })
            })


        })


    })


    // beforeEach((done) => {
    //     User.create(data)
    //         .then(_ => {
    //             done()
    //         })
    //         .catch(err => {
    //             done(err)
    //         })
    // })

    // USER LOGIN
    describe("USER /login", () => {

        // LOGIN SUCCESS
        describe("LOGIN SUCCESS", () => {
            test('SHOULD SEND AN OBJECT(ID, EMAIL, ROLE) WITH STATUS CODE 201', (done) => {
                request(app)
                .post("/login")
                .send(data)
                .end((req, res) => {
                    // console.log(res);
                    // console.log("TEST: RES BODY IS:");
                    // console.log(res.body);
                    expect(res.status).toBe(200)
                    expect(res.body).toHaveProperty("token", expect.any(String))
                    done()
                })
            })
        })


        
        // LOGIN FAIL: WRONG PASSWORD
        describe("LOGIN FAIL TYPE 1: WRONG PASSWORD", () => {
            test('SHOULD SEND ERROR 400 BECAUSE OF WRONG PASSWORD', (done) => {
                let wrongEmail = {...data, password:"precioso"}
                request(app)
                .post("/login")
                .send(wrongEmail)
                .end((err, res) => {
                    // console.log(res);
                    // console.log("TEST: RES BODY IS:");
                    // console.log(res.body);
                    // console.log("RES STATUS IS");
                    // console.log(res.status);
                    expect(err).toBe(null)
                    expect(res.status).toBe(400)
                    expect(res.body).toHaveProperty("error", expect.any(String))
                    done()
                })
            })
        })


        // // LOGIN FAIL: WRONG EMAIL
        // describe("LOGIN FAIL TYPE 2: WRONG EMAIL", () => {
        //     test('SHOULD SEND ERROR 400 BECAUSE OF WRONG EMAIL', (done) => {
        //         let wrongEmail = {...data, email: "sysadmina@mail.com"}
        //         request(app)
        //         .post("/login")
        //         .send(wrongEmail)
        //         .end((err, res) => {
        //             // console.log(res);
        //             console.log("TEST: RES BODY IS:");
        //             console.log(res.body);
        //             console.log("RES STATUS IS");
        //             console.log(res.status);
        //             expect(err).toBe(null)
        //             // expect(res.status).toBe(400)
        //             // expect(res.body).toHaveProperty("error", expect.any(String))
        //             done()
        //         })
        //     })
        // })


    })


})