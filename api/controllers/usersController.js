require('../db')
const User = require('../models/User')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const { signToken, createAndSaveCSRFToken, verifyToken } = require('../helpers/jwt_helper')
const { destroySessionAndCookie } = require('../helpers/session')
const { response } = require('../helpers/responseHandler')
const { resetTempBlockedUser } = require('../helpers/auth_protected')

module.exports = {
    register: [
        validator.body('sex', 'Необходимо выбрать ваш пол').isLength({ min: 1 }),
        validator.body('login', 'Необходимо ввести логин').isLength({ min: 1 }),
        validator.body('password', 'Необходимо ввести пароль').isLength({ min: 1 }),
        validator.body('login').custom(async value => {
            return User.findOne({ login: value }).then(user => {
                if (user !== null) {
                    return Promise.reject('Данный логин уже существует')
                }
            }).catch(() => Promise.reject('Ошибка сервера'))
        }),
        async function(req, res) {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) return response(res, 500, { error: errors.mapped() })

            const user = new User({
                ip: req.ip,
                login: req.body.login,
                sex: req.body.sex,
                password: req.body.password
            })

            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)

            await user.save().catch(error => response(res, 500, {
                error,
                message: 'Ошибка при регистрации пользователя'
            }))
            return response(res, 200, { message: 'Вы успешно зарегестрировались' })
        }
    ],

    login: [
        validator.body('login', 'Вы не ввели ваш логин').isLength({ min: 1 }),
        validator.body('password', 'Вы не ввели ваш пароль').isLength({ min: 1 }),

        async function(req, res) {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) return response(res, 500, { error: errors.mapped() })

            const userData = await User.findOne({ login: req.body.login }).catch(error => response(res, 500, { error }))

            if (userData === null) return response(res, 500, {
                message: 'Неверный логин или пароль',
                token: null
            })

            return bcrypt.compare(req.body.password, userData.password, async (error, isMatched) => {
                if (error) return response(res, 500, { error, message: 'Ошибка авторизации' })
                if (isMatched) {
                    const user = {
                        _id: userData._id,
                        login: userData.login,
                        sex: userData.sex
                    }
                    const token = await signToken(user).catch(error => response(res, 500, { error }))

                    createAndSaveCSRFToken(req, res, token)
                    await resetTempBlockedUser(req, res)

                    return response(res, 200, { message: 'Вы успешно авторизировались', payload: user })
                } else response(res, 500, { error, message: 'Неверный логин или пароль' })
            })
        }
    ],

    logout: (req, res) => {
        destroySessionAndCookie(req, res)
        return response(res, 200, { message: 'Вы успешно разлогинились' })
    },

    user: async (req, res) => {
        if (req.ip === req.session.ip && req.cookies['UID']) {
            const user = await verifyToken(req, res, req.cookies['UID']).catch(error => response(res, 500, {
                error,
                message: 'Ошибка аутентификации'
            }))
            return response(res, 200, { payload: user})
        } else return response(res, 500, { message: 'Ошибка аутентификации' })
    }
}
