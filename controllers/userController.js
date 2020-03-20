const {getToken,comparePassword} = require('../helpers/helper')
const {User} = require('../models')
class UserController {
    static register(req,res,next) {
        let {email,password} = req.body
        User.create({
            email,
            password
        })
        .then((result) => {
            let {id} = result
            let token = getToken({email,id})
            res.status(201).json({email,id,token})
        }).catch((err) => {
            next(err)
        });
    }

    static login(req,res,next) {
        let {email,password} = req.body
        User.findOne({
            where:{email}
        })
        .then((result) => {
            if(result) {
                let {id} = result
                let passwordDb = result.password
                let compared = comparePassword(password,passwordDb)
                if(compared){
                    let token = getToken({email,id})
                    res.status(200).json({email,id,token})
                }else{
                    next({status:400,message:'Email or password wrong'})
                }
            }else{
                next({status:400,message:'Email or password wrong'})
            }
        })
        .catch((err) => {
            next(err)
        });
    }

    static loginAdmin(req,res,next) {
        let {email,password} = req.body
        console.log(req.body)
        User.findOne({
            where:{email}
        })
        .then((result) => {
            if(result) {
                let {id,isAdmin} = result
                let passwordDb = result.password
                let compared = comparePassword(password,passwordDb)
                if(compared){
                    if(isAdmin) {
                        let token = getToken({email,id})
                        res.status(200).json({email,id,token})
                    }else{
                        next({status:403,message:"can't trespassing"})
                    }
                }else{
                    next({status:400,message:'Email or password wrong'})
                }
            }else{
                next({status:400,message:'Email or password wrong'})
            } 
        }).catch((err) => {
           next(err) 
        });
    }
}

module.exports = UserController