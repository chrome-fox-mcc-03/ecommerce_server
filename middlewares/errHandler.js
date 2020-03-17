module.exports = 
  function errHandler (err, req, res, next) {
    let status = 500
    let errors = []

    if(err.name === 'SequelizeValidationError' || 
      err.name === 'SequelizeUniqueConstraintError') {
      status = 400
      errors = err.errors.map(error => error.message)
    } else if (err.name === 'JsonWebTokenError') {
      status = 401
      errors.push('Please login first')
    } else {
      errors.push(err.message)
    }
    
    res.status(err.status || status).json({ errors })
  }