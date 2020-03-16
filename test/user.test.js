const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let data = {
    email: "test01@mail.com",
    password: "123456",
}

let acccess_token = '';

describe('user route', () => {
    afterAll((done) => {
        queryInterface.bulkDelete("Users", {})
        .then(_ => {
            done();
        })
        .catch(err => {
            done(err);
        })
    });
    describe('post /register', () => {
        describe('register success', () => {
            test('success registering, 201, object(email,id) returned', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('email', "test01@mail.com");
                        expect(res.body).toHaveProperty('id', expect.any(Number));
                        expect(res.status).toBe(201);
                        done();
                    });
            })
        });
        describe('register error', () => {
            test('email null, error 400', (done) => {
                let nullEmail = {...data};
                delete nullEmail.email;
                request(app)
                    .post('/register')
                    .send(nullEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors).toContain('email is required');
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('password null, err 400', (done) => {
                let nullPass = {...data};
                delete nullPass.password;
                request(app)
                    .post('/register')
                    .send(nullPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('password is required');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('wrong email format, err 400', (done) => {
                let wrongEmail = {...data};
                wrongEmail.email = "test01mail.com"
                request(app)
                    .post('/register')
                    .send(wrongEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('wrong email format');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('insufficient password length, err 400', (done) => {
                let shortPass = {...data};
                shortPass.password = '12345';
                request(app)
                    .post('/register')
                    .send(shortPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('minimum password length is 6 characters');
                        expect(res.status).toBe(400);
                        done();
                    });
            });
            test('duplicate email, err 400, email already registered', (done) => {
                request(app)
                    .post('/register')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);expect(res.body).toHaveProperty('message', 'bad request');
                        expect(res.body).toHaveProperty('errors', expect.any(Array));
                        expect(res.body.errors.length).toBeGreaterThan(0);
                        expect(res.body.errors).toContain('email already registered');
                        done();
                    })
            })
        })
    });
    describe('post /login', () => {
        describe('login error', () => {
            test('email null, error 400', (done) => {
                let nullEmail = {...data};
                delete nullEmail.email;
                request(app)
                    .post('/login')
                    .send(nullEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'email and password are required');
                        done()
                    });
            });
            test('password null, error 400', (done) => {
                let nullPass = {...data};
                delete nullPass.password;
                request(app)
                    .post('/login')
                    .send(nullPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'email and password are required');
                        done();
                    })
            })
            test('email nonexist, error 404', (done) => {
                let nonexistEmail = {...data};
                nonexistEmail.email = "testxx@mail.com";
                request(app)
                    .post('/login')
                    .send(nonexistEmail)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(404);
                        expect(res.body).toHaveProperty('error', 'wrong email/password combination');
                        done();
                    })
            })
            test('email exist, wrong password, error 400', (done) => {
                let wrongPass = {...data};
                wrongPass.password = "wrongpassword";
                request(app)
                    .post('/login')
                    .send(wrongPass)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(400);
                        expect(res.body).toHaveProperty('error', 'wrong email/password combination');
                        done();
                    })
            })
        })
        describe('login success', () => {
            test('login success, status 200, access_token returned', (done) => {
                request(app)
                    .post('/login')
                    .send(data)
                    .end((err, res) => {
                        expect(err).toBeNull();
                        expect(res.status).toBe(200);
                        expect(res.body).toHaveProperty('access_token', expect.any(String));
                        acccess_token = res.body.acccess_token;
                        done();
                    })
            })
        })
    });
});

describe('product route', () => {});