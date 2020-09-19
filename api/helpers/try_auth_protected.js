const TempBlockedUser = require('../models/TempBlockedUser')
const responseHandler = require('./responseHandler')

module.exports = {
    authProtected: async (req, res, next) => {
        try {
            const blockedUser = await TempBlockedUser.findOne({ ip: req.ip })
            if (blockedUser) {
                if (!blockedUser.isBlocked) {
                    blockedUser.countRequest++
                    blockedUser.createdAt = new Date()
                    if (blockedUser.countRequest > 3) {
                        blockedUser.isBlocked = true
                        await blockedUser.save()
                        return responseHandler(res, 403, { message: 'Вы были заблокированы за большое количество попыток авторизации' })
                    }
                } else {
                    if (+blockedUser.expiresAt > +new Date() - +blockedUser.createdAt) {
                        return responseHandler(res, 403, { message: 'Вы были заблокированы за большое количество попыток авторизации' })
                    } else await blockedUser.remove()
                }
                await blockedUser.save()
            } else await new TempBlockedUser({ ip: req.ip, countRequest: 1 }).save()
            next()
        } catch (error) {
            return responseHandler(res, 500, { error })
        }
    },
    resetTempBlockedUser: async (req, res) => {
        try {
            const blockedUser = await TempBlockedUser.findOne({ ip: req.ip })
            if (blockedUser) await blockedUser.remove()
        } catch (error) {
            return responseHandler(res, 500, { error })
        }
    }
}
