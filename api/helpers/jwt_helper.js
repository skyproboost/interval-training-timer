const jwt = require('jsonwebtoken')
const { destroySessionAndCookie } = require('../helpers/session')

module.exports = {
    verifyToken: (req, res, token) => {
        return new Promise((resolve, reject) => {
            if (req.ip === req.session.ip) {
                token = token ? token : ''
                const regexp = `^${process.env.AUTH_TOKEN_TYPE}\\s`
                return jwt.verify(token.replace(new RegExp(regexp, 'g'), ''), process.env.SECRET, (error, token) => {
                    if (error) {
                        destroySessionAndCookie(req, res)
                        reject(error)
                    } else resolve(token)
                })
            }
            destroySessionAndCookie(req, res)
            reject()
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
    createAndSaveCSRFToken: (req, res, token) => {
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
