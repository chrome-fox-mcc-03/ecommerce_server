"use strict"

const jwt = require('jsonwebtoken')
const { User } = require('../models/index')

module.exports = (req, res, next) => {
    if(!req.headers.token){
        throw({
            status: 401,
            msg: 'You are not authenticated.'
        })
    }
    try {
        const decoded = jwt.verify(req.headers.token, process.env.SECRET_KEY)
        User.findOne({
            where: {
                id:  decoded.id
            }
        })
        .then(result => {
            console.log(result)
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