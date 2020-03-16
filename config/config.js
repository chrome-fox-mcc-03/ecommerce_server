const env = process.env.NODE_ENV || 'development';

if (env === "test") {
  require('dotenv').config( { path: process.cwd() + '/.env.test' } );
} else if (env === "development") {
  require('dotenv').config( { path: process.cwd() + '/.env' } );
}

module.exports = {
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT,
}