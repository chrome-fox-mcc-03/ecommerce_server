"use strict"

const { User, Store } = require('../models/index')
const { verifyPassword } = require('../helper/bcrypt')
const jwt = require('jsonwebtoken')
const {GoogleAuth, OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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
        console.log(data)
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
        if(data.role === 'Admin') {
            if(!storeData.name) {
                throw ({
                    status: 400,
                    msg: 'Please choose the store.'
                })
            }
            Store.findOne({
                where: {
                    name: storeData.name
                }
            })
            .then(result => {
                if(result) {
                    throw ({
                        status: 400,
                        msg: 'Store name already been used.'
                    })
                } 
                else {
                    return User.findOne({
                        where: {
                            email: data.email
                        }
                    })
                }
            })
            .then(result => {
                if(result){
                    throw ({
                        status: 400,
                        msg: 'Email already been used.'
                    })
                }
                else {
                    return Store.create(storeData)
                }
            })
            .then(result => {
                newStore.id = result.id
                data.store_id = result.id
                newStore.name = result.name
            })
            .then(id => {
                return User.create(data)
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
            .catch(err=> {
                if (err.errors) {
                    Store.destroy({where: {
                        id: data.store_id
                    }})
                    .then(_ =>{
                        next(err)
                    })
                } else {
                    next(err)
                }
            })
        } else if (data.role === 'Staff') {
            if(!req.body.store_exist) {
                throw ({
                    status: 400,
                    msg: 'Please choose the store.'
                })
            }
            Store.findOne({
                where: {
                    name: req.body.store_exist
                }
            })
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
        } else {
            User.findOne({
                where: {
                    email: data.email
                }
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
                    password: result.password
                }
                res.status(201).json(newUser)
            })
            .catch(next)
        }
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
            img_url: null,
            store_id: null
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
                    dataToThrow.store_id = result.store_id
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
            res.status(201).json({
                token, name: dataToThrow.name, 
                store_name: dataToThrow.store_name, 
                img_url: dataToThrow.img_url,
                store_id: dataToThrow.store_id
            })
        })
        .catch(next)
    }

    static loginCustomer(req, res, next){
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({
            where: {
                email: data.email,
                role: 'Customer'
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
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.user_token,
                audience: process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            const email = payload.email
            let dataToThrow = {
                id: null,
                name: null,
                store_name: null,
                img_url: null,
                store_id: null
            }
            User.findOne({
                where: {
                    email: email
                }
            })
            .then(result => {
                if(result){
                    dataToThrow.id = result.id
                    dataToThrow.name = result.name
                    dataToThrow.img_url = result.img_url
                    dataToThrow.store_id = result.store_id
                    return Store.findOne({
                        where: {
                            id: result.store_id
                        }
                    })
                } else {
                    res.status(200).json({email})
                }
            })
            .then(result => {
                dataToThrow.store_name = result.name
                    const token = jwt.sign({
                        id: dataToThrow.id
                    }, process.env.SECRET_KEY)
                    res.status(201).json({
                        token, name: dataToThrow.name, 
                        store_name: dataToThrow.store_name, 
                        img_url: dataToThrow.img_url,
                        store_id: dataToThrow.store_id
                    })
            })
            .catch(next)
        }
        verify()
    }
}

module.exports = Controller