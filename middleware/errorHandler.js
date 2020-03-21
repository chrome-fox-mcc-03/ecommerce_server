module.exports = (err,req,res,next) => {
  console.log(err.name)
  let obj = {
    status : 500,
    message : 'Internal Serval Error'
  }
  if(err.name == "SequelizeValidationError") {
    let arr = []
    err.errors.forEach(el => {
      arr.push(el.message)
    })
    obj.message = arr
    obj.status = 400
    res.status(obj.status).json(obj)
  }
  else if(err.name === 'costume') {
    obj.status = err.status
    obj.message = err.message
    console.log(obj)
    res.status(obj.status).json(obj)
  }
  else if(err.name == 'SequelizeUniqueConstraintError') {
    obj.status = 400
    obj.message = 'Email already registerd'
    res.status(obj.status).json(obj)
  }
  else if(err.name =='JsonWebTokenError'){
    obj.status = 401
    obj.message = 'Please login first as admin'
  }
  else{
    res.status(obj.status).json(obj)
  }
}