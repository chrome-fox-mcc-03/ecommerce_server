module.exports = {
  errorHandler(err, req, res, next) {
    if (err.name === "SequelizeUniqueConstraintError") {
      let uniqueMessage = err.errors.map(el => el.message);
      res.status(400).json({
        status: "Bad Request",
        msg: uniqueMessage
      });
    } else if (err.name === "SequelizeValidationError") {
      let validateMessage = err.errors.map(el => el.message);
      res.status(400).json({
        status: "Bad Request",
        msg: validateMessage
      });
    } else if (err.status === "Bad Request") {
      res.status(400).json({
        status: err.status,
        msg: err.msg
      });
    } else if (err.status === "Unauthorized") {
      res.status(401).json({
        status: err.status,
        msg: err.msg
      });
    } else if (err.status === "Not Found") {
      res.status(404).json({
        status: err.status,
        msg: err.msg
      });
    } else {
      res.status(500).json({
        status: "Internal Server Error"
      });
    }
  }
};
