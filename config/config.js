const env = process.env.NODE_ENV || 'development'

switch (env) {
  case 'development':
    require('dotenv').config({path: process.cwd() + '/.env'})
      break
  case 'test':
    require('dotenv').config({path: process.cwd() + '/.env.test'})
}


module.exports = {
  username: process.env.USERNAME_DATABASE,
  password: process.env.PASSWORD_DATABASE,
  database: process.env.DB_NAME,
  host: process.env.HOST_DATABASE,
  dialect: process.env.DIALECT_DATABASE
}