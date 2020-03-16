"use strict"

const { Store } = require('../models/index')

class Controller {

    static createStore(req, res, next){
        const data = { name: req.body.name }
        Store.create(data)
        .then(result => {
            const newStore = {
                id: result.id,
                name: result.name
            }
            res.status(201).json({newStore})
        })
        .catch(next)
    }

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
}

module.exports = Controller