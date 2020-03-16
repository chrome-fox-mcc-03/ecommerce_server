"use strict"

const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        User.findOne({
            where: {
                id:  decoded.id
            }
        })
        .then(result => {
            if(result){
                req.decoded = {
                    id: decoded.id
                }
                next()
            }
            else{
                throw({
                    status: 401,
                    msg: 'You are not authenticated.'
                })
            }
        })
    }
    catch(err){
        next(err)
    }
}