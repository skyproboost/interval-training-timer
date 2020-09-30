const jwt = require('jsonwebtoken')
const { destroySessionAndCookie } = require('../helpers/session')

module.exports = {
    verifyToken: (req, res, token) => {
        return new Promise((resolve, reject) => {
            token = token ? token : ''
            const regexp = `^${process.env.AUTH_TOKEN_TYPE}\\s`
            jwt.verify(token.replace(new RegExp(regexp, 'g'), ''), process.env.SECRET, (error, token) => {
                console.log(token)
                console.log(error)
                if (error) {
                    destroySessionAndCookie(req, res)
                    reject(error)
                } else resolve(token)
            })
        })
    },
    signToken: (userData) => {
        return new Promise((resolve, reject) => {
            jwt.sign(userData, process.env.SECRET, (error, token) => {
                if (error) reject(error)
                resolve(token)
            })
        })
    },
    createSessionId: (req, res, token) => {
        token = process.env.AUTH_TOKEN_TYPE + ' ' + token
        const cookieSettings = {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.PROTOCOL === 'https'
        }
        req.session.ip = req.ip
        req.session.token = token

        res.cookie('UID', token, cookieSettings)
    }
}
