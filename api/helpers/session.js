const expressSession = require('express-session')
const session = expressSession({
    name: 'sessionId.connect',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        httpOnly: true,
        // secure:  process.env.PROTOCOL === 'https'
    }
})

module.exports = {
    session,
    destroySessionAndCookie: (req, res) => {
        req.session.destroy()
        res.cookie('CSRF_TOKEN', null, {maxAge: 0})
        res.cookie('sessionId.connect', null, {maxAge: 0})
    }
}
