function errorHandler(err, req, res, next) {
  let status = 500;
  let errName = {
    message: 'Internal Server Error'
  }
  console.log(err);
  
  if(err.name === 'SequelizeValidationError') {
    status = 400;
    let arrMessage = []
    for(let i=0; i<err.errors.length ; i++) {
      arrMessage.push(err.errors[i].message)
    }
    errName = {
      message: 'Bad Request',
      errors: arrMessage
    }
  }
  res.status(status).json(errName)
}

module.exports = errorHandler