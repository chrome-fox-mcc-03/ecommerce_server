const env = process.env.NODE_ENV || "development";

switch(env) {
    case "development":
        require('dotenv').config({ path: process.cwd() + '/.env' });
        break;
    case "test":
        require('dotenv').config({ path: process.cwd() + '/.env.test' });
        break;
}

const app = require('../app');
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, ()=> console.log(`listening to PORT: ${PORT}`));