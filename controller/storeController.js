"use strict"

const { Store } = require('../models/index')
const {Op} = require('sequelize')

class Controller {

    static editStore(req, res, next){
        const data = { name: req.body.name }
        Store.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(201).json({
                msg: 'Store edited'
            })
        })
        .catch(next)
    }

    static findStore(req, res, next){
        const { name } = req.params
        Store.findAll({
            where: {
                name: {[Op.like]: `${name}%`}
            }
        })
        .then(results => {
            if(results){
                res.status(200).json({
                    data: results
                })
            }
            else {
                res.status(200).json({data: null})
            }
            
        })
        .catch(next)
    }
}

module.exports = Controller