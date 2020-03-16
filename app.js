if(process.env.NODE_ENV === "development"){
    require('dotenv').config()
};


const cors = require('cors');
const express = require('express');
const app = express();
const http = require("http").createServer(app);

http.listen(process.env.PORT, _ => {
    console.log(`Hi there! You're listening to port ${process.env.PORT}`)
})

module.exports = app