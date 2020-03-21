const userController = require("../controller/usercontroller")
const app = require('../app')
const request = require('supertest')
const { sequelize } = require('../models')
const { queryInterface } = sequelize


let data = {
    Email: "testing@mail.com",
    Password: "SecretPassword"
}

describe('Routes User', function() {
    // afterEach((done) => {
    //     queryInterface.bulkDelete('Users', {})
    //         .then(function() {
    //             done()
    //         })
    //         .catch(function(err) {
    //             done(err)
    //         })
    // });


    describe("Testing Register", function() {
        describe("POST REGISTER SUCCESS", function() {
            test("should send object of email with status code 201", function(done) {
                request(app)
                    .post("/user/register")
                    .send(data)
                    .end(function(err, res) {
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('Email', data.Email)
                        expect(res.status).toBe(201)
                        done()
                    })
            })
        })
    })

    describe('Error Register', () => {
        test('Should Error Code 400 missing email value ', (done) => {
            let withoutEmail = { ...data }
            delete withoutEmail.Email
            request(app)
                .post('/user/register')
                .send(withoutEmail)
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty("message", "Bad Request")
                    expect(res.body).toHaveProperty('errors', expect.any(Array))
                    done()
                })

        });
    });

    describe('Testing Login', () => {
        test('Should object', (done) => {
            let loginEmail = {...data}
            // console.log(loginEmail)
            request(app)
                .post('/user/login')
                .send(loginEmail)
                .end(function(err, res) {
                    // console.log(res)
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty("Access_Token", expect.any(String))
                    expect(res.body).toHaveProperty('Email', expect.any(String))
                    done()
                })
        });
        
    });
    
    describe('Error Login', () => {
        test('Should Error Code 400 missing email value', (done) => {
            let loginwithoutemail = {...data}
            delete loginwithoutemail.Email
            request(app)
                .post('/user/login')
                .send(loginwithoutemail)
                .end(function(err, res) {
                    expect(err).toBe(null)
                    expect(res.body).toHaveProperty("message", expect.any(String))
                    expect(res.status).toBe(400)
                    done()
                })
        });
        
    });
})
