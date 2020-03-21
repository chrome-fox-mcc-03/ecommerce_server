const { User } = require('../models');
const { checkPassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jwt")
const { customError } = require("../helpers/errorModel")

let regParams
let datum
let data
let accessToken
let payloadParams
let flagMatchingPassword

class UserController {
    static register(req, res, next) {

        // console.log("--- USER-CONTROLLERS: CREATE ---");
        // console.log("REQ BODY IS");
        // console.log(req.body);
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
                    password: response.password,
                    role: response.role
                }
                res.status(201).json({data: datum})
            })
            .catch(err => {
                // console.log(err)
                next(err)
            })
    }

    static login(req, res, next) {

        // console.log("--- USER-CONTROLLERS: LOGIN ---");
        // console.log("REQ BODY IS");
        // console.log(req.body);
        // console.log(req.body.email);

        User.findAll({
            where: {
                email: req.body.email
            }
        })
        .then(response => {
            console.log("USER FOUND");
            // console.log("RESPONSE IS");
            // console.log(response);
            
            if(response) {
                console.log("USER NOT NULL");
                // console.log("WHAT'S RESPONSE 2?");
                // console.log(response[0]);
                flagMatchingPassword = checkPassword(req.body.password, response[0].password)
                // console.log(`password flag: ${flag}`);
                if(flagMatchingPassword) {
                    console.log("PASSWORD MATCHES");
                    payloadParams = {
                        id: response[0].id,
                        email: req.body.email,
                        password: req.body.password,
                        role: response[0].role
                    }
    
                    accessToken = createToken(payloadParams)
                    console.log("ACCESS TOKEN FOUND");
                    // console.log(accessToken);
                    // req.headers.token = accessToken --> AUTENTIKASI
                    // localStorage.setItem("token", accessToken) --> CLIENT
                    res.status(200).json({token:accessToken})
    
                } else {
                    throw new customError(400, "WRONG PASSWORD/EMAIL")
                }

            } else {
                throw new customError(400, "WRONG PASSWORD/EMAIL")
            }
        })
        .catch(err => {
            console.log("ERROR LOGIN FROM USER-CONTROLLER");
            // console.log(err.message);
            // take err.code, err.message
            next(err)
        })

    }

    static getAllUsers(req, res, next) {
        console.log('--- USER CONTROLLER: SEE ALL USERS ---');
        User.findAll()
            .then(response => {
                console.log("VIEWING LIST OF USERS");
                res.status(200).json({data: response})
            })
            .catch(err => {
                console.log("ERROR VIEWING LIST OF USERS");
                next(err)
            })
    }
}

module.exports = UserController