const { User } = require ('../models/index') ;

class UserController {
    static register (req,res,next) {
        let newUser = {
            email : req.body.email,
            password : req.body.password,
            role : req.body.role
        }

        User.create(newUser)
            .then((data)=>{
                res.status(201).json({
                    id : data.id,
                    email : data.email,
                    role : data.role
                })
            })
            .catch((err)=>{
                next(err);
            })
    }

}

module.exports = UserController