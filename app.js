const express = require('express');
const app = express();
const router = require('./routes');
const error = require('./middlewares/error');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`ecommerce_server`)
});

app.use(router);
app.use(error);

module.exports = app;