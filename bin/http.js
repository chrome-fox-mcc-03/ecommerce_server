const env = process.env.NODE_ENV || 'development';

if (env === "test") {
    require('dotenv').config( { path: process.cwd() + '/.env.test' } );
} else if (env === "development") {
    require('dotenv').config( { path: process.cwd() + '/.env' } );
}

const app =  require('../app');
const http = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log('listen on port ' + process.env.PORT);
})