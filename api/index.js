const express = require('express')
const users = require('./routes/users')
const { session } = require('./helpers/session.js')
const initProtectedCSRFMiddleware = require('./helpers/init_protected_middleware')
const app = express()

app.use(session)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(initProtectedCSRFMiddleware)

app.use(users)

module.exports = {
    path: 'api/',
    handler: app
}
