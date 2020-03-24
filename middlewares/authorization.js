const { Cart } = require('../models/index');

module.exports = (req, res, next) => {
  let UserId = +req.decoded.id
  
  Cart.findOne({
    where: { UserId }
  })
    .then(response => {
      if(response) {
        if(response.UserId === req.decoded.id) {
          console.log('masuk authorization');
          next()
          return null
        }
        else {
          next({
            status: 403,
            msg: "You're not authorized to perform this action!"
          })
        }
      }
      else {
        next({
          status: 404,
          msg: "Cart not found! Please contact your administrator"
        })
      }
    })
    .catch(err => {
      next(err)
    })
}