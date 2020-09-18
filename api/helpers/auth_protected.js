const { verifyToken } = require('./jwt_helper')
const { excludeRoutes } = require('./exclude_rules_for_protected')
const { destroySessionAndCookie } = require('../helpers/session')
const responseHandler = require('./responseHandler')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!excludeRoutes.includes(req.path)) {
            if (token) {
                verifyToken(req, token, function(err) {
                    if (err) {
                        destroySessionAndCookie(req, res)
                        return responseHandler(res, 401, { message: 'Ошибка аутентификации' })
                    }
                })
            } else {
                destroySessionAndCookie(req, res)
                return responseHandler(res, 401, { message: 'Ошибка аутентификации' })
            }
        }
        next()
    } catch (error) {
        return responseHandler(res, 500, { error })
    }
}
