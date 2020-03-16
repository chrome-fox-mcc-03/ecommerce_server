const env = process.env.NODE_ENV

switch (env) {
  case 'development':
    require('dotenv').config({path: process.cwd() + '/.env'})
    break;
  case 'test':
    require('dotenv').config({path: process.cwd() + '/.env.test'})
    break;
}

const PORT = process.env.PORT
const app = require('../app')
const http = require('http')
const server = http.createServer(app)

server.listen(PORT, ()=> {
  console.log(`listening on port ${PORT}`);
})
