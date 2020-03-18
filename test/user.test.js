const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { queryInterface } = sequelize;

let data = {
    email: "ace@mail.com",
    password: "qweqwe",
    // fullname: "Andreas Anggara"
}

describe("User Routes", () => {
    afterEach((done) => {
        queryInterface.bulkDelete("Users", {})
            .then( () => {
                done()
            })
            .catch(err => done(err))
    })
    describe("POST /register", () => {
        describe("Success Register", () => {
            test("Send object (email, password, fullname) with status code (201)", (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull;
                        expect(res.body).toHaveProperty("email", data.email);
                        expect(res.body).toHaveProperty("id", expect.any(Number));
                        expect(res.body).toHaveProperty("fullname", data.fullname);
                        done()
                    })
            })
        })
    })
    describe("POST /register", () => {
        describe("Error Register", () => {
            test("Send object (email, password, fullname) with status code (400) with message Email has been registered, please choose another email", (done) => {
                data.email = "ace@mail.com"
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.errors[0]).toBe("Email has been registered, please choose another email")
                        done()
                    })
            }),
            test("Send object (email, password, fullname) with status code (400) with message Please input with valid email!", (done) => {
                data.email = "aceasdas"
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.errors[0]).toBe("Please input with valid email!")
                        done()
                    })
            }),
            test("Send object (email, password, fullname) with status code (400) with message Password at least 5 characters", (done) => {
                data.password = "123"
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.errors[0]).toBe("Password at least 5 characters")
                        done()
                    })
            })
        })
    })
    describe("POST /login", () => {
        describe("Success", () => {
            test("Send object (email, password) with status code (200) replied with token", (done) => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(200)
                        expect(res.body.token).toBe("testtoken123456789abcdefghijklmnopqrstuvwxyz")
                        done()
                    })
            })
        })
    })
    describe("POST /login", () => {
        describe("Error", () => {
            test("Send object (email, password) with status code (400) replied Email / Password invalid!", (done) => {
                data.email = "ace2@mail.com"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe("Email / Password invalid!")
                        done()
                    })
            })
        })
    })
    describe("POST /login", () => {
        describe("Error", () => {
            test("Send object (email, password) with status code (400) replied with replied Email / Password invalid!", (done) => {
                data.password = "123"
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(res.status).toBe(400)
                        expect(res.body.message).toBe("Email / Password invalid!")
                        done()
                    })
            })
        })
    })
})
