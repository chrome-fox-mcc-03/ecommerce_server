const env = process.env.NODE_ENV || 'development'

switch(env) {
  case 'development':
    require('dotenv').config({path:process.cwd() + '/.env'})
      break
  case 'test':
    require('dotenv').config({path:process.cwd() + '/.env.test'})
      break
  case 'production':
    require('dotenv').config()
}

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.HOST,
  dialect: process.env.DB_DIALECT
}