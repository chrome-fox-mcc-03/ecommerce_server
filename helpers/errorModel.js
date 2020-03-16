function customError(code, message) {
    let err = new Error(message)
    err.code = code
    return err
}

module.exports = {
    customError
}