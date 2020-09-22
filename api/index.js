const express = require('express')
const users = require('./routes/users')
const auth = require('./routes/auth')
const { session } = require('./helpers/session.js')
const cookieParser = require('cookie-parser');
const initProtectedCSRFMiddleware = require('./helpers/init_protected_csrf_middleware')
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session)
app.use(initProtectedCSRFMiddleware)

app.use(auth)
app.use(users)

module.exports = {
    path: '/',
    handler: app
}
