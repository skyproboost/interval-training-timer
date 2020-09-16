const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersController')
const isAuthenticated = require('../helpers/auth_protected')
const { destroySessionAndCookie } = require('../helpers/session')

router.post('/users/register', usersController.register)
router.post('/users/login', usersController.login)
router.post('/users/logout', (req, res) => {
    destroySessionAndCookie(req, res)
    res.status(200).json({
        status: 200,
        message: 'Вы успешно разлогинилсь'
    })
})
router.get('/users/user', isAuthenticated, usersController.user)
router.post('/users/user/add', (req, res) => {
    res.end()
})

module.exports = router
