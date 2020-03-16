"use strict"

const { Store, User, Product } = require('../models/index')

module.exports = {

    checkRole(req, res, next){
        User.findOne({
            where: {
                id: req.decoded.id
            }
        })
        .then(result => {
            if(!result){
                throw({
                    status: 401,
                    msg: 'You are not authenticated'
                })
            }
            else{
                if(!result.role === 'Admin'){
                    throw({
                        status: 401,
                        msg: 'You cannot edit or add product to this store. Please contanct the owner.'
                    })
                }
                else{
                    next()
                }
            }
        })
        .catch(next)
    }
}
