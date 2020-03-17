const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Controller {
    static Register(req, res, next) {
        let {Email, Password} = req.body
        User.create({Email, Password,Role: "User"})
            .then(function(result) {
                let payload = {
                    Email: result.Email
                }
                
                res.status(201).json(payload)
            })
            .catch(function(err) {
                next(err)
            })
    }

    static Login(req, res, next) {
        let {Email, Password} = req.body
        console.log(Email, Password)
        User.findAll({
            where: {
                Email
            }
        })
            .then(function(result) {
                console.log(result[0].Password)
                console.log(bcrypt.compareSync(Password, result[0].Password)); // true
                if(bcrypt.compareSync(Password, result[0].Password )) {
                    let payloads = {
                        Email: result[0].Email
                    }
                    let Access_Token = jwt.sign(payloads, process.env.SECRET)
                    let payload = {
                        Access_Token,
                        Email: result[0].Email
                    }
                    res.status(200).json(payload)
                }
                else {
                    let err = {
                        msg: "Wrong Email / Password"
                    }
                    throw err
                }
            })
            .catch(function(err) {
                console.log(err)
                next(err)
            })

    }

}

module.exports = Controller