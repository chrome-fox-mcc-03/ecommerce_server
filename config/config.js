const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	require('dotenv').config({ path: process.cwd() + '/.env' });
} else if (env === 'test') {
	require('dotenv').config({ path: process.cwd() + '/.env.test' });
}

module.exports = {
	"username": process.env.DB_USER,
	"password": process.env.DB_PASSWORD,
	"database": process.env.DB_NAME,
	"host": process.env.DB_HOST,
	"dialect": process.env.DIALECT,
	"logging": false
}