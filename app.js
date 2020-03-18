const express = require('express')
const { User } = require('./models')
// const { Sequelize } = require('../models');
const app = express()
const errorHandler = require("./middleware/errorHandler")
const errors = []
const cors = require("cors")
const router = require("./routes/index.js")
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// USER REGISTER
// app.post('/register',(req,res,next)=>{
//     let { email,password,role } = req.body
//     User.create({
//         email,
//         password,
//         role
//     })
//     .then(data=>{
//         res.status(201).json({
//             id: data.id,
//             email: data.email,
//             role: data.role
//         })
//     })
//     .catch(err=>{
//         console.log(err);
//         next(err)
//     })
// })

app.use(router)


// app.post("/login", (req, res, next) => {})


// app.post("/googleLogin", (req, res, next) => {})


// app.use((err,req,res,next)=>{
//     let status = 500

//     let message = { error: 'INTERNAL SERVER ERROR' }
//     console.log("APP ERROR");
//     console.log(res);
//     // if(err instanceof Sequelize.ValidationError) {
//     //     let errors = [];
//     //     err.errors.forEach(item => {
//     //         errors.push(item.message)
//     //     })
//     //     res.status(400).json({
//     //         message: "BAD REQUEST",
//     //         errors: errors,
//     //     })
//     // }  else if (err instanceof Error) {
//     //     res.status(err.code).json({
//     //         error: err.message,
//     //     })
//     // }
//     // else {
//     //     res.status(500).json({
//     //         error: "INTERNAL SERVER ERROR",
//     //     })
//     // }
//     // switch (err.name) {
//     //     case 'SequelizeValidationError':
//     //         const errors = []
//     //         err.errors.forEach(error => {
//     //           errors.push(error.message)
//     //         })
//     //         message = {
//     //           message: 'Bad Request',
//     //           errors
//     //         }
//     //         status = 400
//     //         res.status(status).json(message)
//     //     break;
    
//     //     default:
//     //         res.status(status).json(message)
//     //     break;
//     // }
// })


app.use(errorHandler)


// PRODUCT


module.exports = app