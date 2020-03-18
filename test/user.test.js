const app = require('../app');
const { User, sequelize } = require('../models');
const request = require('supertest');

describe('User Routers', () => {
    beforeEach(done => {
        const payload = {
            email: 'bluebell@gmail.co',
            password: 'permenkaretku',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        User.create(payload).then(res => {
            done()
        }).catch(err => {
            done(err);
        })
    })

    afterEach((done) => {
        sequelize.queryInterFace.bulkDelete('Users', {}).then(res => {
            done();
        }).catch(err => {
            done(err);
        })
    });

    describe('POST /register', () => {
        describe('Registration Success', () => {
            test(`It returns status 201 and object of access_token`, (done) => {
                request(app).post('/register').send({
                    email: 'michacat@gmail.co',
                    password: 'permenku',
                    role: 'admin'
                }).end((err, res) => {
                    expect(err).toBeNull();
                    expect(res.body).toHaveProperty('access_token', expect.any(String));
                    expect(res.status).toBe(201);
                    done()
                })
            })
        })

        describe('Register Failed', () => {
            describe('Invalid email', () => {
                test('Email Existed', (done) => {
                    request(app).post('/register').send({
                        email: 'bluebird@blue.com',
                        password: 'permenkubanyak',
                        role: 'admin'
                    }).end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message');
                        done();
                    })

                })

                test('Wrong Email Format', (done) => {
                    request(app).post('/register').send({
                        email: 'wrong@124h',
                        password: 'permenku',
                        role: 'admin'
                    }).end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', expect.any(Array));
                        done()
                    })
                });

                test('Email Null', (done) => {
                    request(app).post('/register').send({
                        email: null,
                        password: 'permenkaretku',
                        role: 'admin'
                    }).end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', expect.any(Array));
                        done()
                    })
                });
            });

            describe('Invalid password', () => {
                test('Null', (done) => {
                    request(app).post('/register').send({
                        email: 'michacat25@gmail.co',
                        password: null,
                        role: 'admin'
                    }).end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message', expect.any(Array));
                        done();
                    })
                })
            })
        });
    });

    describe('POST /login', () => {
        describe('Login Success', () => {
            test('Login Success', done => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'test2@gmail.com',
                        password: 'permenkaretku'
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        done();
                    })
            })
        })

        describe('Login Failed', () => {
            test('Invalid Email', done => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'test24@gmail.com',
                        password: 'permenkaretku'
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message');
                        done();
                    })
            })

            test('Invalid Password', done => {
                request(app)
                    .post('/login')
                    .send({
                        email: 'test24@gmail.com',
                        password: 'permenkaret'
                    })
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('message');
                        done();
                    })
            })
        })
    });
});



