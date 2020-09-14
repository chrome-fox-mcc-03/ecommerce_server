function errorHandler(err, req, res, next) {
    if (err.name == "SequelizeValidationError") {
        let error = err.errors.map(el => el.message);
        res.status(400).json({ message: error[0] });
    } else if (err.name == "JsonWebTokenError") {
        res.status(401).json({ message: "Please login first!" });
    } else {
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
    }
}

module.exports = errorHandler;
