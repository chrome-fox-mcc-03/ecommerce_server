const env = process.env.NODE_ENV || "development"

switch(env) {
    case "development":
        require("dotenv").config({ path: process.cwd() + "/.env" })
        break;
    case "test":
        require("dotenv").config({ path: process.cwd() + "/.env.test" })
}

const app = require('../app');
const http = require('http').createServer(app);

http.listen(process.env.PORT, _ => {
    console.log(`Hi there! You're listening to PORT: ${process.env.PORT}`);
})