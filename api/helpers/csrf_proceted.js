const { excludeRoutes, allowMethods } = require('./exclude_rules_for_protected')
const { destroySessionAndCookie } = require('../helpers/session')

module.exports = (req, res, next) => {
    if (!excludeRoutes.includes(req.path)) {
        if (allowMethods.includes(req.method)) {
            if (req.headers['x-csrf-token']) {
                if (req.session._csrf === req.headers['x-csrf-token']) {
                    return next()
                }
            }

            destroySessionAndCookie(req, res)
            return res.status(403).json({
                status: 403,
                message: 'Доступ запрещен'
            })
        }
    }
    return next()
}
