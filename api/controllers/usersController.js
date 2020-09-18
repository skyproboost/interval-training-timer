require('../db')
const User = require('../models/User')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const { verifyToken, signToken, createAndSaveCSRFToken } = require('../helpers/jwt_helper')
const { destroySessionAndCookie } = require('../helpers/session')
const responseHandler = require('../helpers/responseHandler')
const TempBlockedUser = require('../models/TempBlockedUser')
const { resetTempBlockedUser } = require('../helpers/try_auth_protected')

module.exports = {
    register: [
        validator.body('sex', 'Необходимо выбрать ваш пол').isLength({ min: 1 }),
        validator.body('login', 'Необходимо ввести логин').isLength({ min: 1 }),
        validator.body('password', 'Необходимо ввести пароль').isLength({ min: 1 }),
        validator.body('login').custom(value => {
            return User.findOne({ login: value }).then(user => {
                if (user !== null) {
                    return Promise.reject('Данный логин уже существует')
                }
            })
        }),
        function(req, res) {
            try {
                const errors = validator.validationResult(req)
                if (!errors.isEmpty()) return responseHandler(res, 500, { error: errors.mapped() })

                const user = new User({
                    ip: req.ip,
                    login: req.body.login,
                    sex: req.body.sex,
                    password: req.body.password
                })

                const salt = bcrypt.genSaltSync(10)
                user.password = bcrypt.hashSync(user.password, salt)

                user.save(function(error, user) {
                    if (error) return responseHandler(res, 500, {
                        error,
                        message: 'Ошибка при регистрации пользователя'
                    })

                    return responseHandler(res, 200, {
                        message: 'Вы успешно прошли регистрацию',
                        data: { _id: user._id }
                    })
                })
            } catch (error) {
                return responseHandler(res, 500, { error })
            }
        }
    ],

    login: [
        validator.body('login', 'Вы не ввели ваш логин').isLength({ min: 1 }),
        validator.body('password', 'Вы не ввели ваш пароль').isLength({ min: 1 }),

        function(req, res) {
            try {
                const errors = validator.validationResult(req)
                if (!errors.isEmpty()) return responseHandler(res, 500, { error: errors.mapped() })

                User.findOne({ login: req.body.login }, (error, user) => {
                    if (error) return responseHandler(res, 500, { error })
                    if (user === null) return responseHandler(res, 500, { error, message: 'Неверный логин или пароль' })

                    return bcrypt.compare(req.body.password, user.password, async (error, isMatched) => {
                        if (error) return responseHandler(res, 500, { error, message: 'Ошибка авторизации' })
                        if (isMatched) {
                            const userData = {
                                _id: user._id,
                                login: user.login,
                                sex: user.sex
                            }

                            createAndSaveCSRFToken(req.session, res)
                            await resetTempBlockedUser(req, res)

                            return res.status(200).json({
                                status: 200,
                                message: 'Вы успешно прошли авторизацию',
                                user: userData,
                                token: signToken(userData)

                            })
                        } else return responseHandler(res, 500, { error, message: 'Неверный логин или пароль' })
                    })
                })
            } catch (error) {
                return responseHandler(res, 500, { error })
            }
        }
    ],

    logout: (req, res) => {
        try {
            destroySessionAndCookie(req, res)
            return responseHandler(res, 200, { message: 'Вы успешно разлогинились' })
        } catch (error) {
            return responseHandler(res, 500, { error })
        }
    },

    user: (req, res) => {
        try {
            const token = req.headers.authorization
            if (token) {
                verifyToken(res, token, function(error, decoded) {
                    if (error) {
                        return responseHandler(res, 401, { error, message: 'Ошибка при попытке авторизации' })
                    } else return res.json({ user: decoded })
                })
            } else return responseHandler(res, 401, { message: 'Ошибка при попытке авторизации' })
        } catch (error) {
            return responseHandler(res, 500, { error })
        }
    }
}
