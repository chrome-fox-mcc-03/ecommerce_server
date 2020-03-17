module.exports = (err, req, res, next) => {
// console.log(err, '>>>>>>>>>>>>>EROOORR NIHHH')

  let status = 500
  let errObj = {
    message: 'Internal Server Error'
  }
  if (err.name === 'SequelizeValidationError') {
    status = 400
    let errors = []
    err.errors.forEach(error => {
      errors.push(error.message)
    })
    errObj = {
      message: 'BAD REQUEST',
      errObj: errors
    }
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    status = 400
    errObj = {
      message: 'BAD REQUEST',
      errObj: [err.errors[0].message]
    }
  } else if (err.name === 'Invalid Email/Password') {
    status = 400
    errObj = {
      message: 'BAD REQUEST',
      errObj: [err.name]
    }
  } else if (err.name === 'Please Login First') {
    status = 401
    errObj = {
      message: 'Authentication',
      errors: [err.name]
    }
  } else if (err.name === 'Invalid Token Error') {
    status = 401
    errObj = {
      message: 'Authentication',
      errors: [err.name]
    }
  } else if (err.name === 'Not Authorization Update') {
    status = 401
    errObj = {
      message: 'Authorization',
      errors: ['You are not authorized to update this action']
    }
  } else if (err.name === 'Not Authorization Delete') {
    status = 401
    errObj = {
      messsage: 'Authorization',
      errors: ['You are not authorized to delete this action']
    }
  } else if (err.name === 'Not Found') {
    status = 404
    errObj = {
      message: 'Not Found',
      errors: [err.name]
    }
  } else if (err.name === 'Not Authorization') {
    status = 401
    errObj = {
      message: 'Authorization',
      errors: ['You are not authorized to use this action']
    }
  }

  res.status(status).json(errObj)
}