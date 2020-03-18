const { User } = require('../models');
const jwt = require('../helpers/jwt');
const CustomError = require('../helpers/customError');
const bcrypt = require('../helpers/bcrypt');
const invalid = "invalid email / password!";

class UserController {
    static login(req, res, next) {
        const { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
            .then((result) => {
                if (result) {
                    if (bcrypt.compare(password, result.password)) {
                        let payload = {
                            id: result.id,
                            role: result.role
                        }
                        payload = jwt.createToken(payload);
                        res.status(200).json({ token: payload })
                    } else {
                        throw new CustomError(400, invalid)
                    }
                } else {
                    throw new CustomError(400, invalid)
                }
            }).catch((err) => {
                console.log(err);
                next(err);
            });
    }

    static register(req, res, next) {
        const { email, password, name, role } = req.body;
        User.create({
            email,
            password,
            name,
            role
        })
            .then((result) => {
                let payload = {
                    id: result.id,
                    role: result.role
                }
                payload = jwt.createToken(payload);
                res.status(201).json({ token: payload })
            }).catch((err) => {
                console.log(err);
                next(err);
            });
    }
}

module.exports = UserController;
