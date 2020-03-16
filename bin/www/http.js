'use strict'

const { app } = require('../../app');
const PORT = process.env.PORT
const http = require('http');
const server = http.createServer(app);


server.listen(PORT, () => {
    console.log(`Port connected on ${PORT}`)
});

