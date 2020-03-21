require('dotenv').config()
const app = require('../app');
const http = require('http').createServer(app);
http.listen(process.env.PORT, _ => {
    console.log(`Hi there! You're listening to radio ${process.env.PORT}`);
})