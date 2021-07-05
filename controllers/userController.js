const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class userController {
  // ---USER---
  static Create(req, res, next) {
    console.log('masuk');
    User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({ token: token })
      })
      .catch((err) => {
        next(err)
      })
  }

  static Login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
    .then((user) => {
      if(user) {
        let status = comparePassword(req.body.password ,user.password)
        if(status) {
          let payload = {
            id: user.id,
            email: user.email
          }
          let token = getToken(payload)
          res.status(200).json({ token: token })
        }
        else {
          next({ name: 'Invalid email or password'})
        }
      }
      else {
        next({ name: 'Invalid email or password'})
      }
    })
    .catch((err) => {
      next(err)
    })
  }

  // ---ADMIN---
  static adminRegister(req, res, next) {
    User.create({
      email: req.body.email,
      password: req.body.password,
      Admin: true
    })
    .then((admin) => {
      let payload = {
        id: admin.id,
        email: admin.email,
        Admin: admin.Admin
      }
      let token = getToken(payload)
      res.status(201).json({
        token: token
      })
    })
    .catch(next)
  }

  static adminLogin(req, res, next) {
    User.findOne({
      where:{
        email: req.body.email
      }
    })
    .then((user) => {
      if(user){
        let status = comparePassword(req.body.password, user.password) 
        if(status) {
          if(user.Admin) {
            let payload = {
              id: user.id,
              email: user.email
            }
            let token = getToken(payload)
            res.status(200).json({
              token: token
            })
          }
          else{
           next({ name: 'Admin only!'})          
          }
        }
        else {
          next({ name: 'Admin only!'})          
        }
      }
      else {
        next({ name: 'Invalid email or password'})
      }
    })
    .catch(next)
  }
}

module.exports = userController