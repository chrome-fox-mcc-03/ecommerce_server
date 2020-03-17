const route = require('express').Router()
const userRoute = require('./user-route')
const errorhandler = require('../middleware/errhandler')

route.use('/user', userRoute )
route.get('/', function(req, res, next) {
    res.status(200).json({
        message:'Home Domain Connected'
    })
})



module.exports = route