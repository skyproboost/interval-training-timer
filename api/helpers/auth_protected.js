const TempBlockedUser = require('../models/TempBlockedUser')
const { verifyToken } = require('./jwt_helper')
const { excludeRoutes } = require('./exclude_rules_for_protected')
const { response } = require('./responseHandler')
const { message } = require('../helpers/response_template')

module.exports = {
    isAuthenticated: async (req, res, next) => {
        if (!excludeRoutes.includes(req.path)) {
            await verifyToken(req, res, req.cookies['UID'])
                .then(() => next())
                .catch(error => response(res, 401, { error, message: message.errorAuth }))
        } else next()
    },

    isCreateBlockedUser: async (req, res, next) => {
        await TempBlockedUser.findOne({ ip: req.ip })
            .then(async blockedUser => {
                if (!blockedUser) {
                    await new TempBlockedUser({ ip: req.ip, countRequest: 1 })
                        .save()
                        .then(() => next())
                        .catch(error => response(res, 500, { error, message: message.oops }))
                } else next()
            })
            .catch(error => response(res, 500, { error, message: message.oops }))
    },

    isBlockedUser: async (req, res, next) => {
        await TempBlockedUser.findOne({ ip: req.ip })
            .then(async blockedUser => {
                if (blockedUser) {
                    if (!blockedUser.isBlocked) {
                        blockedUser.countRequest++
                        blockedUser.createdAt = new Date()
                        if (blockedUser.countRequest > 3) {
                            blockedUser.isBlocked = true
                            await blockedUser
                                .save()
                                .then(() => response(res, 403, { message: message.blocked }))
                                .catch(error => response(res, 500, { error }))
                        } else await blockedUser.save().then(() => next()).catch(error => response(res, 500, {
                            error,
                            message: message.oops
                        }))
                    } else {
                        if (+blockedUser.expiresAt > +new Date() - +blockedUser.createdAt) {
                            return response(res, 403, { message: message.blocked })
                        } else await blockedUser.remove()
                            .then(() => next())
                            .catch(error => response(res, 500, { error, message: message.oops }))
                    }
                } else next()
            })
            .catch(error => response(res, 500, { error, message: message.oops }))
    },

    resetTempBlockedUser: (req, res) => {
        return new Promise(async (resolve, reject) => {
            await TempBlockedUser.findOne({ ip: req.ip })
                .then(async blockedUser => {
                    if (blockedUser) await blockedUser.remove().then(() => resolve()).catch(error => reject(error))
                })
                .catch(error => reject(error))
        })
    }
}
