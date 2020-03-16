const { User } = require('../models');
const { checkPassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const { customError } = require("../helpers/errorModel")

let regParams
let datum
let data

class UserController {
    static register(req, res, next) {

        console.log("--- USER-CONTROLLERS: CREATE ---");
        console.log("REQ BODY IS");
        console.log(req.body);
        regParams = {
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        }

        User.create(regParams)
            .then(response => {
                console.log("CREATE USER SUCCESS");
                datum = {
                    id: response.id,
                    email: response.email,
                    role: response.role
                }
                res.status(201).json({data: datum})
            })
            .catch(err => {
                next(err)
            })
    }

    // static login(req, res, next) {}
}

module.exports = UserController