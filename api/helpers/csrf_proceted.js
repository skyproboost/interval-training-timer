const { excludeRoutes, allowMethods } = require('./exclude_rules_for_protected')
const { destroySessionAndCookie } = require('../helpers/session')
const responseHandler = require('./responseHandler')

module.exports = (req, res, next) => {
    try {
        if (!excludeRoutes.includes(req.path)) {
            if (allowMethods.includes(req.method)) {
                if (req.headers['x-csrf-token']) {
                    if (req.session._csrf === req.headers['x-csrf-token']) return next()
                }
                destroySessionAndCookie(req, res)
                return responseHandler(res, 500)
            }
        }
        next()
    } catch (error) {
        return responseHandler(res, 500, { error })
    }
}
