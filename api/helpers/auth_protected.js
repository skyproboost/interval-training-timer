const { verifyToken } = require('./jwt_helper')
const { excludeRoutes } = require('./exclude_rules_for_protected')
const { destroySessionAndCookie } = require('../helpers/session')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!excludeRoutes.includes(req.path)) {
        if (token) {
            verifyToken(req, token, function(err) {
                if (err) {
                    destroySessionAndCookie(req, res)
                    return res.status(401).json({ status: 401, message: 'Ошибка аутентификации' })
                } else return next()
            })
        } else {
            destroySessionAndCookie(req, res)
            return res.status(401).json({ status: 401, message: 'Ошибка аутентификации' })
        }
    } else return next()
}
