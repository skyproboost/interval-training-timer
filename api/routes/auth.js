const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersController')
const { isCreateBlockedUser } = require('../helpers/auth_protected')

router.post('/register', usersController.register)
router.post('/login', isCreateBlockedUser, usersController.login)
router.post('/logout', usersController.logout)

module.exports = router
