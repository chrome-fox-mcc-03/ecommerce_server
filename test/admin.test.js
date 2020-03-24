const request = require('supertest');
const app = require('../app');

const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let loginDummy = {
    email: 'mail1@mail.com',
    password: 'qweqwe'
}

describe('Admin routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done();
            })
            .catch(error => {
                done(error)
            })
    })

    describe('POST /login', () => {
        describe('proccess succeded', () => {
            test('should return an object(token) with status 200', (done) => {
                request(app)
                    .post('/admins/login')
                    .send(loginDummy)
                    .end((err, res) => {
                        console.log(res.body, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< masuk login admin");
                        
                        expect(res.body).toHaveProperty('token', res.body.token)
                        expect(res.status).toBe(200)
                        done()
                    })
            })
        })

        describe('proccess failed', () => {
            test('should return a message with status 404 because user input wrong email', (done) => {
                let wrongEmail = { ...loginDummy, email: 'wrong@mail.com' }
                request(app)
                    .post('/admins/login')
                    .send(wrongEmail)
                    .end((err, res) => {
                        console.log(res.body, 'res bodyyyyyyyyyyyyyyy');
                        
                        expect(res.body).toBe('wrong email/password');
                        expect(res.status).toBe(404)
                        done()
                    });
            })

            test('should return a message with status 404 because user input wrong password', (done) => {
                let wrongPassword = { ...loginDummy, password: 'wrongpassword' }
                request(app)
                    .post('/admins/login')
                    .send(wrongPassword)
                    .end((err, res) => {
                        expect(res.body).toBe('wrong email/password');
                        expect(res.status).toBe(404)
                        done()
                    });
            })
        })
    })
})
