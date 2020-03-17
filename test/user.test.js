const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let data = {
    email: "mail@mail.com",
    password: 'qweqwe'
}

describe('User routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done()
            })
            .catch(err => done(err))
    })

    // REGISTER TEST
    describe('POST /register', () => {
        describe('process success', () => {
            test('should send an object (token) with status code 201', (done) => {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body).toHaveProperty('token', res.body.token);
                        expect(res.status).toBe(201);
                        done();
                    })
            })
        })
        describe('process error', () => {
            test('should send an error with status 400 because of email is not unique', (done) => {
                request(app)
                    .post('/users/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('someone has signed up using this email');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('should send an error with status 400 because of email is an empty string', (done) => {
                let withoutEmail = { ...data };
                delete withoutEmail.email;
                request(app)
                    .post('/users/register')
                    .send(withoutEmail)
                    .end((err, res) => {
                        // console.log(res.body.message);
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('email is required');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('should send an error with status 400 because of email format is invalid', (done) => {
                let invalidEmail = { ...data, email: 'mail' };
                request(app)
                    .post('/users/register')
                    .send(invalidEmail)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('invalid email format');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('should send an error with status 400 because of password is an empty string', (done) => {
                let passwordIsEmpty = { ...data };
                delete passwordIsEmpty.password
                request(app)
                    .post('/users/register')
                    .send(passwordIsEmpty)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('password is required');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
            test('should send an error code 400 because of password length is less than 5', (done) => {
                let passwordLength = { ...data, password: 'qwe' };
                request(app)
                    .post('/users/register')
                    .send(passwordLength)
                    .end((err, res) => {
                        expect(err).toBe(null);
                        expect(res.body.message).toContain('password should be at least 5 characters');
                        expect(res.status).toBe(400);
                        done();
                    })
            })
        })
    })


    // LOGIN TEST
    describe('POST/ signin', () => {
        test('should send an error code 404 because username is wrong', (done) => {
            let wrongUsername = { 
                email: 'mai@mail.com',
                password: 'qweqw'
            }
            request(app)
                .post('/users/signin')
                .send(wrongUsername)
                .end((err, res) => {
                    
                    expect(err).toBe(null);
                    expect(res.error.text).toContain('wrong email/password');
                    expect(res.status).toBe(404);
                    done()
                })
        })
        test('should send an error code 404 because password is wrong', (done) => {
            let wrongPassword = {
                ...data,
                password: 'qwewe'
            }
            request(app)
                .post('/users/signin')
                .send(wrongPassword)
                .end((err, res) => {
                    
                    expect(err).toBe(null);
                    expect(res.error.text).toContain('wrong email/password');
                    expect(res.status).toBe(404);
                    done()
                })
        })
        test('should send an object (token) with status code 200', (done) => {
            request(app)
                .post('/users/signin')
                .send(data)
                .end((err, res) => {       
                                 
                    expect(err).toBe(null);
                    expect(res.text).toContain('token', res.text.token);
                    expect(res.status).toBe(200);
                    done()
                })
        })
    })
})