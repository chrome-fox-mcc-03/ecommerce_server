"use strict"

const { User } = require('../models/index')
const { verifyPassword } = require('../helper/bcrypt')
const jwt = require('jsonwebtoken')

class Controller {

    static register(req, res, next){
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            img_url: req.body.img_url,
        }
        const passwordConfirmation = req.body.passwordConfirm
        if(data.password !== passwordConfirmation){
            throw ({
                status: 400,
                msg: 'Password do not matches.'
            })
        }
        User.findOne({
            where: {
                email: data.email
            }
        })
        .then(result => {
            if(!result){
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
                hashedPassword: result.password
            }
            res.status(201).json({newUser})
        })
        .catch(next)
        
    }

    static login(req, res, next){
        const data = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: data.email
            }
        })
        .then(result => {
            if(!result){
                throw({
                    status: 400,
                    msg: 'Email not found.'
                })
            }
            else {
                if(!verifyPassword(data.password, result.password)){
                    throw({
                        status: 400,
                        msg: 'Wrong password.'
                    })
                }
                else {
                    const token = jwt.sign({
                        id: result.id
                    }, process.env.SECRET_KEY)
                    res.status(201).json({token})
                }
            }
        })
        .catch(next)
    }

    static googleLogin(req, res, next){
        //oAuth
    }

    static editUser(req, res, next){
        const data = {
            role: req.body.role,
            store_id: req.body.store_id
        }

        User.update(data, {
            where: {
                id: req.params.id
            }
        })
        .then(result => {
            res.status(201).json({
                msg: 'Welcome to the store'
            })
        })
        .catch(next)
    }

    static findUser(req, res, next){
        const { email } = req.body

        User.findOne({
            where: {
                email: email
            }
        })
        .then(result => {
            if(!result){
                throw({
                    status: 404,
                    msg: 'User not found.'
                })
            }
            else {
                res.status(200).json({
                    data: result
                })
            }
        })
        .catch(next)
    }
}

module.exports = Controller