const  {customError}  = require("../helpers/errorModel.js")

function authorization(req, res, next) {
    let payload = req.decoded
    console.log(">>AUTHORIZATION<< \n");
    // console.log(req.params)
    console.log("REQ DECODED AT AUTHORIZATION IS");
    console.log(payload);
    // let userId = req.decoded.id

    if(payload.role === "admin") {
        console.log("AUTHORIZATION SUCCESS")
        next()
    } else {
        throw new customError(401, "UNAUTHORIZED ACCESS")
    }
}

module.exports = authorization