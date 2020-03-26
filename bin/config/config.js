
const env = process.env.NODE_ENV || 'development'

switch (env) {
    case 'development': 
        require('dotenv').config({path: process.cwd() + '/.env'})
        // console.log(process.env.PORT)
        break
    case 'test' : 
        require('dotenv').config({path: process.cwd() + '/.env.test'})
        break
}

module.exports={
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
}

