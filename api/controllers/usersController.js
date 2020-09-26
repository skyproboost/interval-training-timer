require('../db')
const User = require('../models/User')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const { signToken, createAndSaveCSRFToken, verifyToken } = require('../helpers/jwt_helper')
const { destroySessionAndCookie } = require('../helpers/session')
const { response } = require('../helpers/responseHandler')
const { resetTempBlockedUser } = require('../helpers/auth_protected')
const { message } = require('../helpers/response_template')

module.exports = {
    register: [
        validator.body('sex', message.fieldsError.sex).isLength({ min: 1 }),
        validator.body('login', message.fieldsError.login).isLength({ min: 1 }),
        validator.body('password', message.fieldsError.password).isLength({ min: 1 }),
        validator.body('login').custom(async value => {
            return User.findOne({ login: value })
                .then(user => {
                    if (user !== null) Promise.reject(message.existLogin)
                })
                .catch(() => Promise.reject(message.oops))
        }),
        async function(req, res) {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) return response(res, 422, { error: errors.mapped() })

            const user = new User({
                ip: req.ip,
                login: req.body.login,
                sex: req.body.sex,
                password: req.body.password
            })

            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)

            await user.save()
                .then(() => response(res, 200, { message: message.register }))
                .catch(error => response(res, 500, {
                    error,
                    message: message.oops
                }))
        }
    ],

    login: [
        validator.body('login', message.fieldsError.login).isLength({ min: 1 }),
        validator.body('password', message.fieldsError.password).isLength({ min: 1 }),

        async function(req, res) {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) return response(res, 422, { error: errors.mapped() })

            await User.findOne({ login: req.body.login })
                .then(userData => {
                    if (userData === null) return response(res, 500, { message: message.authInputError })
                    bcrypt.compare(req.body.password, userData.password, async (error, isMatched) => {
                        if (error) return response(res, 500, { error, message: message.oops })
                        if (isMatched) {
                            const user = {
                                _id: userData._id,
                                login: userData.login,
                                sex: userData.sex
                            }
                            await signToken(user)
                                .then(async token => {
                                    createAndSaveCSRFToken(req, res, token)
                                    await resetTempBlockedUser(req, res)
                                        .then(() => response(res, 200, {
                                            message: message.auth,
                                            payload: user
                                        }))
                                        .catch(error => response(res, 500, {
                                            error,
                                            message: message.oops
                                        }))
                                })
                                .catch(error => response(res, 500, { error }))
                        } else response(res, 500, { error, message: message.authInputError })
                    })
                })
                .catch(error => response(res, 500, { error, message: message.oops }))
        }
    ],

    logout: (req, res) => {
        destroySessionAndCookie(req, res)
        response(res, 200, { message: message.logout })
    },

    user: async (req, res) => {
        if (req.cookies['UID']) {
            await verifyToken(req, res, req.cookies['UID'])
                .then(user => response(res, 200, { payload: user }))
                .catch(error => response(res, 500, { error, message: message.errorAuth }))
        } else response(res, 500, { message: message.errorAuth })
    }
}
