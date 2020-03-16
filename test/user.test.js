const app = require('../app');
const { User, sequelize } = require('../models');
const request = require('supertest');

describe('POST /register', () => {
    describe('Registration Success', () => {
        test(`It returns status 201 and object of access_token`, done => {
            request(app).post('/register').send({
                email: 'michacat@gmail.co',
                password: 'permenku',
                role: 'admin'
            })
        })
    })
})