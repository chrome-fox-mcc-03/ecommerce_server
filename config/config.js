const env = process.env.NODE_ENV || 'development'
require('dotenv').config({path: process.cwd() + '/.env'})
switch(env) {
    case 'development':
        require('dotenv').config({ path: process.cwd() + '/.env' })
            break;
    case 'test':
        require('dotenv').config({ path: process.cwd() + '/.env.test' })
            break;
}
module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'db_ecommerce_cms',
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
}
