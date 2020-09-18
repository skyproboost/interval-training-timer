const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersController')
const isAuthenticated = require('../helpers/auth_protected')
const tryAuthProtected = require('../helpers/try_auth_protected')

router.post('/users/register', usersController.register)
router.post('/users/login', tryAuthProtected.authProtected, usersController.login)
router.post('/users/logout', usersController.logout)
router.get('/users/user', isAuthenticated, usersController.user)
router.post('/users/user/add', (req, res) => {
    res.end()
})

module.exports = router
