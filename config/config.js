const env = process.env.NODE_ENV || 'development'
switch (env) {
  case "development" :
    require('dotenv').config({
      path: process.cwd() +'/.env'
    })
    break;
    case "test" : 
    require('dotenv').config({
      path : process.cwd() + '/.env.test'
    })
    break;
    
  }


module.exports = {
  "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT,
} 

  // "development": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_development",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // },
  // "test": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_test",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // },
  // "production": {
  //   "username": "root",
  //   "password": null,
  //   "database": "database_production",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "operatorsAliases": false
  // }

