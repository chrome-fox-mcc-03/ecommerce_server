const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routes');
const error = require('./middlewares/error');

app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`ecommerce_server`)
});

app.use(router);
app.use(error);

module.exports = app;