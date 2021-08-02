const env = process.env.NODE_ENV || 'development';

console.log(env);
if (env === 'development') {
	require('dotenv').config({ path: process.cwd() + '/.env' });
} else if (env === 'test') {
	require('dotenv').config({ path: process.cwd() + '/.env.test' });
}

const app = require('../app');
const http = require('http');
const server = http.createServer(app);

server.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));