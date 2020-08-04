const { verify } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = (req, res, next) => {
    let access_token = req.headers.access_token
    let payload
    try {
        payload = verify(access_token, process.env.key)
        User.findOne({ where: { id: payload.id } })
            .then(result => {
                if (result) {
                    req.currentUserId = payload.id
                    next()
                } else {
                    next({
                        name: 'Unauthorized'
                    })
                }
            })
            .catch(next)
    } catch (err) {
        next({ name: 'Unauthorized' })
    }
}

module.exports = authentication