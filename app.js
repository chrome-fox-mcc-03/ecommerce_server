const express = require('express')
const app = express()
const {User} = require('./models')
const {errorHandler} = require('./middlewares/errorHandler')
// const routers = require('./routes')
app.use(express.urlencoded({extended:false}))
app.use(express.json())


app.post('/register',(req,res,next) => {
    let {email,password} = req.body
    User.create({
        email,
        password
    })
    .then((result) => {
        res.status(201).json({email:result.email,id:result.id})
    }).catch((err) => {
        next(err)
    });
})

app.post('/login',(req,res,next) => {
    let {email,password} = req.body
    User.findOne({
        where:{email}
    })
    .then((result) => {
        if(result) {
            res.status(200).json({email:result.email,id:result.id}) // harusnya token nnti tinggal diganti
        }else{
            next({status:400,message:'Email or password wrong'})
        }
    })
    .catch((err) => {
        next(err)
    });
})

app.use(errorHandler)

module.exports = app