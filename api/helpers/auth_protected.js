const TempBlockedUser = require('../models/TempBlockedUser')
const { verifyToken } = require('./jwt_helper')
const { excludeRoutes } = require('./exclude_rules_for_protected')
const { response } = require('./responseHandler')
const { destroySessionAndCookie } = require('./session')

module.exports = {
    isAuthenticated: async (req, res, next) => {
        if (!excludeRoutes.includes(req.path)) {
            await verifyToken(req, res, req.cookies['UID']).catch(error => response(res, 401, {
                error,
                message: 'Ошибка аутентификации'
            }))
        }
        next()
    },
    isCreateBlockedUser: async (req, res, next) => {
        const blockedUser = await TempBlockedUser.findOne({ ip: req.ip }).catch(error => response(res, 500, { error }))
        if (!blockedUser) {
            await new TempBlockedUser({
                ip: req.ip,
                countRequest: 1
            }).save().catch(error => response(res, 500, { error }))
        }
        next()
    },
    isBlockedUser: async (req, res, next) => {
        const blockedUser = await TempBlockedUser.findOne({ ip: req.ip }).catch(error => response(res, 500, { error }))
        if (blockedUser) {
            if (!blockedUser.isBlocked) {
                blockedUser.countRequest++
                blockedUser.createdAt = new Date()
                if (blockedUser.countRequest > 3) {
                    blockedUser.isBlocked = true
                    await blockedUser.save().catch(error => response(res, 500, { error }))
                    return response(res, 403, { message: 'Вы были заблокированы за большое количество попыток авторизации' })
                }
            } else {
                if (+blockedUser.expiresAt > +new Date() - +blockedUser.createdAt) {
                    return response(res, 403, { message: 'Вы были заблокированы за большое количество попыток авторизации' })
                } else await blockedUser.remove().catch(error => response(res, 500, { error }))
            }
            await blockedUser.save().catch(error => response(res, 500, { error }))
        }
        next()
    },
    resetTempBlockedUser: async (req, res) => {
        const blockedUser = await TempBlockedUser.findOne({ ip: req.ip }).catch(error => response(res, 500, { error }))
        if (blockedUser) await blockedUser.remove().catch(error => response(res, 500, { error }))
    }
}
