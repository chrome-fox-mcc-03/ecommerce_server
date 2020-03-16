const cors = require('cors');
const express = require('express');
const app = express();
const { User } = require('./models/index.js')
const {  } = require('./helpers/bcrypt')


app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.post("/register", (req, res, next) => {
    let { email, password, fullname } = req.body
    User.create({
        email,
        password,
        fullname
    })
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email,
                fullname: data.fullname
            })
        })
        .catch(err => {
            next(err)
        })
    
    })
app.use((req, res, next))
    let { email, password } = req.body
    User

app.use((err, req, res, next) => {
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        let errors = [];
        err.errors.forEach(element => {
            errors.push(element.message)
        })
        res.status(400).json({ errors })
    }
    else {
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" })
    }
})


module.exports = app