module.exports = function errorHandler(err, req, res, next) {
  if(err.name === "SequelizeUniqueConstraintError" || err.name === "SequelizeValidationError") {
      let message = err.errors.map(el => el.message);
      res.status(400).json({message})
  }
  if(err.name === "SequelizeDatabaseError") {
    let message = err.original
    res.status(400).json(message)
  }
  else {
      let message = err.msg
      res.status(err.status || 500).json( { message } || "Internal Server Error")       
  }
}