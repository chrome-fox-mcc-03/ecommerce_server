"use strict"

const { User, Store } = require('../models/index')
const { verifyPassword } = require('../helper/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {

    static register(req, res, next){
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            img_url: req.body.img_url,
            store_id: null,
            role: req.body.role
        }
        const storeData = {
            name: req.body.store_name
        }
        const passwordConfirmation = req.body.passwordConfirm
        let newStore = {
            id: null,
            name: null
        }

        if(data.password !== passwordConfirmation){
            throw ({
                status: 400,
                msg: 'Password do not matches.'
            })
        }
        Store.create(storeData)
        .then(result => {
            newStore.id = result.id
            data.store_id = result.id
            newStore.name = result.name
        })
        .then(id => {
            return User.findOne({
                where: {
                    email: data.email
                }
            })
        })
        .then(result => {
            if(result){
                throw ({
                    status: 400,
                    msg: 'Email already been used.'
                })
            }
            else {
                return User.create(data)
            }
        })
        .then(result => {
            const newUser = {
                id: result.id,
                name: result.name,
                email: result.email,
                store_name: storeData.name,
                store_id: result.store_id
            }
            res.status(201).json(newUser)
        })
        .catch(next)
    }

    static login(req, res, next){
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        let dataToThrow = {
            id: null,
            name: null,
            store_name: null,
            img_url: null
        }
        console.log(data)
        User.findOne({
            where: {
                email: data.email
            }
        })
        .then(result => {
            if(!result){
                throw({
                    status: 400,
                    msg: 'Wrong email/password'
                })
            }
            else {
                if(!verifyPassword(data.password, result.password)){
                    throw({
                        status: 400,
                        msg: 'Wrong email/password'
                })
                }
                else {
                    dataToThrow.id = result.id
                    dataToThrow.name = result.name
                    dataToThrow.img_url = result.img_url
                    return Store.findOne({
                        where: {
                            id: result.store_id
                        }
                    })
                }
            }
        })
        .then(result => {
            dataToThrow.store_name = result.name
            const token = jwt.sign({
                id: dataToThrow.id
            }, process.env.SECRET_KEY)
            res.status(201).json({token, name: dataToThrow.name, store_name: dataToThrow.store_name, img_url: dataToThrow.img_url})
        })
        .catch(next)
    }

    static googleLogin(req, res, next){
        //oAuth
    }
}

module.exports = Controller