const { Router } = require('express')
const router = Router()
const usersController = require('../controllers/usersController')
const { isAuthenticated } = require('../helpers/auth_protected')
const { isBlockedUser } = require('../helpers/auth_protected')

router.get('/user', isBlockedUser, isAuthenticated, usersController.user)
router.post('/test', (req, res) => {
    res.end()
})

module.exports = router
