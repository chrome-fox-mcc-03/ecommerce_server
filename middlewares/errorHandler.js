module.exports = function(err, req, res, next) {
  console.log(err)
  switch (err.name) {
    case "SequelizeValidationError":
      const error = err.errors.map(el => el.message)
      res.status(400).json(error)
      break
    
    case "DATA NULL":
      res.status(404).json(err.message)
      break;

    case "Wrong password":
      res.status(401).json(err.message)
      break
  
    default:
      res.status(500).json(err)
      break;
  }
}