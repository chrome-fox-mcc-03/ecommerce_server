const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'hacktiv8shop@gmail.com',
        pass: 'Hacktiv8MCC'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter