const env = process.env.NODE_ENV || "development"
console.log(process.env.NODE_ENV, "ini clg dari process.env.NODE_ENV")
console.log(process.cwd(), 'ini dari config.js')
switch(env) {
    case "development":
        require("dotenv").config({ path: process.cwd() + "/.env" })
        break;
    case "test":
        process.env.DB_NAME = "db_ecommerce_cms_testing"
        require("dotenv").config({ path: process.cwd() + "/.env2" })
        break;
}

module.exports = {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
}
