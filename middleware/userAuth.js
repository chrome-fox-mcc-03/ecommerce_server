const { User, Product, Cart } = require("../models")
const  {customError}  = require("../helpers/errorModel.js")

function authorization(req, res, next) {

    console.log(">>AUTHORIZATION<< \n");
    // console.log(req.params)
    console.log("REQ DECODED AT AUTHORIZATION IS");
    console.log(req.decoded);
    let userId = req.decoded.id

    User.findByPk(userId)
        .then(response => {
            console.log("USER FOUND");
            // console.log(response);
            if(response) {
                if(response.role === "user") {
                    console.log("AUTHORIZATION SUCCESS");
                    next()
                } else {
                    throw new customError(401, "UNAUTHORIZED ACCESS")
                }
            } else {
                throw new customError(404, "ENTRY NOT FOUND")
            }
        })
        .catch(err => {
            console.log("AUTHORIZATION FAILS")
            next(err)
        })
}

module.exports = authorization