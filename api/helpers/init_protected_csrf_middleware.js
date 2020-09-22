const { Router } = require('express')
const router = Router()
const { isAuthenticated, isBlockedUser } = require('./auth_protected')

router.post('*', isBlockedUser, isAuthenticated)
router.put('*', isBlockedUser, isAuthenticated)
router.delete('*', isBlockedUser, isAuthenticated)
router.patch('*', isBlockedUser, isAuthenticated)

module.exports = router

