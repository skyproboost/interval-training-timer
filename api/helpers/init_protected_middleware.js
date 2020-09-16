const { Router } = require('express')
const router = Router()
const csrfProtected = require('../helpers/csrf_proceted')
const isAuthenticated = require('./auth_protected')

router.post('*', isAuthenticated, csrfProtected)
router.put('*', isAuthenticated, csrfProtected)
router.delete('*', isAuthenticated, csrfProtected)
router.patch('*', isAuthenticated, csrfProtected)

module.exports = router

