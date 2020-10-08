const env = process.env.NODE_ENV

if (env === "test") {
  require('dotenv').config( { path: process.cwd() + '/.env.test' } );
} else if (env === "development") {
  require('dotenv').config( { path: process.cwd() + '/.env' } );
}


const express = require('express');
const app = express();

const cors = require('cors');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.use(errorHandler);

module.exports = app;
