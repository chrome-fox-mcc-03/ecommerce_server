const env = process.env.NODE_ENV || "development"

switch (env) {
  case "test":
    require('dotenv').config({path : process.cwd() + '/.env'})
    break;
  case "development":
    require('dotenv').config({path : process.cwd() + '/.env.test'})
    break;
  default:
    break;
}

module.exports = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD,
  "database": process.env.DB_DATABASE,
  "host": process.env.DB_HOST,
  "dialect": process.env.DB_DIALECT,  
}

