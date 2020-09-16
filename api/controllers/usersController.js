require('../db')
const User = require('../models/User')
const validator = require('express-validator')
const bcrypt = require('bcryptjs')
const { verifyToken, signToken, createAndSaveCSRFToken } = require('../helpers/jwt_helper')

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
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 422,
                    error: errors.mapped()
                })
            }

            const user = new User({
                login: req.body.login,
                sex: req.body.sex,
                password: req.body.password
            })

            const salt = bcrypt.genSaltSync(10)
            user.password = bcrypt.hashSync(user.password, salt)

            user.save(function(err, user) {
                if (err) {
                    return res.status(500).json({
                        status: 500,
                        message: 'Ошибка при регистрации пользователя',
                        error: err
                    })
                }
                return res.json({
                    message: 'Вы успешно прошли регистрацию',
                    _id: user._id
                })
            })
        }
    ],

    login: [
        validator.body('login', 'Вы не ввели ваш логин').isLength({ min: 1 }),
        validator.body('password', 'Вы не ввели ваш пароль').isLength({ min: 1 }),

        function(req, res) {
            const errors = validator.validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(422).json({
                    status: 422,
                    error: errors.mapped()
                })
            }

            User.findOne({ login: req.body.login }, function(err, user) {
                if (err) return res.status(500).json({
                    status: 500,
                    message: 'Ошибка авторизации',
                    error: err
                })

                if (user === null) return res.status(500).json({
                    status: 500,
                    message: 'Неверный логин или пароль'
                })

                return bcrypt.compare(req.body.password, user.password, function(err, isMatched) {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: 'Ошибка авторизации',
                        error: err
                    })

                    if (isMatched) {
                        const userData = {
                            _id: user._id,
                            login: user.login,
                            sex: user.sex
                        }

                        createAndSaveCSRFToken(req.session, res)
                        return res.json({
                            user: userData,
                            token: signToken(userData),
                            _csrf: req.session._csrf

                        })
                    } else return res.status(500).json({
                        status: 500,
                        message: 'Неверный логин или пароль'
                    })
                })
            })
        }
    ],

    user: (req, res) => {
        const token = req.headers.authorization
        if (token) {
            verifyToken(res, token, function(err, decoded) {
                if (err) {
                    return res.status(401).json({
                        status: 401,
                        message: 'Ошибка при попытке авторизации'
                    })
                } else return res.json({ user: decoded })
            })
        } else return res.status(401).json({
            status: 401,
            message: 'Ошибка при попытке авторизации'
        })
    }
}
