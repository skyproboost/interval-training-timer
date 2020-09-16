const jwt = require('jsonwebtoken')
const md5 = require('md5')
const defaultConfigForJwt = {
    expiresIn: 60 * 60 * 24 * 7
}

module.exports = {
    verifyToken: (res, token, callback, options = {}) => {
        options = { ...defaultConfigForJwt, ...options }
        const regexp = `^${process.env.AUTH_TOKEN_TYPE}\\s`
        jwt.verify(token.replace(new RegExp(regexp, 'g'), ''), process.env.SECRET, options, function(err, decoded) {
            callback(err, decoded)
        })
    },
    signToken: (userData) => {
        return jwt.sign(userData, process.env.SECRET, { ...defaultConfigForJwt })
    },
    createAndSaveCSRFToken: (session, res) => {
        const salt = md5(process.env.SECRET)
        session._csrf = `${salt}---${md5(salt + ':' + process.env.CSRF_SECRET)}`
        res.cookie('CSRF_TOKEN', session._csrf, {
            sameSite: 'strict',
            httpOnly: false,
            secure: process.env.PROTOCOL === 'https'
        })
    }
}
