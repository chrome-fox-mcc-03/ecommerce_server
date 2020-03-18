const { verifyToken } = require("../helpers/jwt.js")
const {customError} = require("../helpers/errorModel.js")
const { User } = require("../models")
let token
let payload
function authentication(req, res, next) {
    console.log(">>> AUTHENTICATION <<<");
    try {
        token = req.headers.token
        console.log("token is");
        console.log(token);
        payload = verifyToken(token)
        console.log(`the decrypted payload is`);
        console.log(payload);
        req.decoded = payload
        // next()

        User.findAll({
            where: {
                id: payload.id
            }
        })
        .then(response => {
            console.log(`USER FOUND`);
            // console.log(response);
            // console.log(`RESPONSE ID:`);
            // console.log(response[0].id);
            if((response[0].id === payload.id) && (payload.role === "admin")) {
                console.log(`AUTHENTICATION PASSED!`)
                req.decoded = payload
                next()
            } else {
                console.log("AUTHENTICATION FAILED!");
                throw new customError(401, "UNAUTHORIZED ACCESS")
            }
        })
    }
    catch(err) {
        console.log("ERROR AUTHENTICATING");
        console.log(err);
        next(err)
    }
}

module.exports = authentication