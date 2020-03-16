const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

let data = {
    email: 'ace@mail.com',
    password: ''
}