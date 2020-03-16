const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let dummySignUp = {
    name: 'Sign Up User',
    email: 'signup@gmail.com',
    password: '123123'
}
describe('User Routes', () => {
    afterAll((done) => {
        queryInterface.bulkDelete('Users', {})
            .then(_ => {
                done()
            })
            .catch(err => {
                done(err)
            })
    })
    describe('POST /signup', () => {
        describe('Success Process', () => {
            test('Should send an object (token, name) with status code 201', (done) => {
                // = = = = hit server = = = = 
                request(app)
                    .post('/signup')
                    .send(dummySignUp)
                    .end((err, res) => {
                        console.log('= = = = = >', res.body);
    
                        expect(err).toBe(null)
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.body).toHaveProperty('currentUser', expect.any(String))
                        expect(res.status).toBe(201);
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            // describe('User existed', () => {
            //     test('Should send an object (message) with status code 400', (done) => {
            //         let alreadySignUp = {
            //             name: 'Hannah',
            //             email: 'hannah@gmail.com',
            //             password: 123123
            //         }
            //         request(app)
            //             .post('/signup')
            //             .send(alreadySignUp)
            //             .end((err, res) => {
            //                 expect(res.status).toBe(400)
            //                 expect(res.body).toHaveProperty('message', 'Your email has already registered')
            //                 expect(err).toBe(null)
            //                 done()
            //             })
            //     })
            // })
            describe('Empty Email', () => {
                test('Should send an object (message) with status code 400', (done) => {
                    let withoutEmail = { ...dummySignUp }
                    delete withoutEmail.email
                    request(app)
                        .post('/signup')
                        .send(withoutEmail)
                        .end((err, res) => {
                            // console.log('+++++++++', res.body);
                            expect(res.body).toHaveProperty('message', expect.any(Array))
                            expect(res.body.message).toContain('User.email cannot be null');
                            expect(res.status).toBe(400)
                            expect(err).toBe(null)
                            done()
                        })
                })
            })
            describe('Invalid Email Format', () => {
                test('Should send an object (message) with status code 400', (done) => {
                    let invalidEmailFormat = {
                        name: 'Hannah',
                        email: 'notanemail',
                        password: '123123'
                    }
                    request(app)
                        .post('/signup')
                        .send(invalidEmailFormat)
                        .end((err, res) => {
                            // console.log('+++++++++', res.body);
                            expect(res.body).toHaveProperty('message', expect.any(Array))
                            expect(res.body.message).toContain('Invalid email format');
                            expect(res.status).toBe(400)
                            expect(err).toBe(null)
                            done()
                        })
                })
            })
            describe('Minimum Length of Password', () => {
                test('Should send an object (message) with status code 400', (done) => {
                    let pwLessThan6 = {
                        name: 'Albus',
                        email: 'albus@gmail.com',
                        password: '1231'
                    }
                    request(app)
                        .post('/signup')
                        .send(pwLessThan6)
                        .end((err, res) => {
                            // console.log('+++++++++', res.body);
                            expect(res.body).toHaveProperty('message', expect.any(Array))
                            expect(res.body.message).toContain('Password should at least have 6 characters');
                            expect(res.status).toBe(400)
                            expect(err).toBe(null)
                            done()
                        })
                })
            })
            describe('Empty Name', () => {
                test('Should send an object (message) with status code 400', (done) => {
                    let emptyName = {
                        name: '',
                        email: 'albus@gmail.com',
                        password: '123123'
                    }
                    request(app)
                        .post('/signup')
                        .send(emptyName)
                        .end((err, res) => {
                            // console.log('+++++++++', res.body);
                            expect(res.body).toHaveProperty('message', expect.any(Array))
                            expect(res.body.message).toContain('Name cannot be empty');
                            expect(res.status).toBe(400)
                            expect(err).toBe(null)
                            done()
                        })
                })
            })
        })
    })
    describe('POST /signin', () => {
        describe('Success Process', () => {
            test('Should return an object (token, currentUser) with status code 201', (done) => {
                let dummySignIn = {
                    email: 'signup@gmail.com',
                    password: '123123'
                }
                request(app)
                    .post('/signin')
                    .send(dummySignIn)
                    .end((err, res) => {
                        // console.log(res.body);
    
                        expect(res.body).toHaveProperty('token', expect.any(String))
                        expect(res.body).toHaveProperty('currentUser', expect.any(String))
                        expect(res.status).toBe(201)
                        expect(err).toBe(null)
                        done()
                    })
            })
        })
        describe('Error Process', () => {
            describe('Wrong combination', () => {
                test('Should send a message with status code 400', (done) => {
                    let withoutEmail = {
                        email: 'signup@gmail.com',
                        password: '1231234'
                    }
                    request(app)
                        .post('/signin')
                        .send(withoutEmail)
                        .end((err, res) => {
                            console.log('++b+o+d+y++++', res.body);
                            expect(res.body).toBe('Invalid email/password');
                            expect(res.status).toBe(400);
                            expect(err).toBe(null);
                            done()
                        })
                })
            })
        })
    })
})