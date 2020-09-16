const expressSession = require('express-session')
const protocol = process.env.HOST_FULL.split(':')[0]
const session = expressSession({
    name: 'connect.sid',
    proxy: true,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        httpOnly: protocol !== 'https',
        secure:  protocol === 'https'
    }
})

module.exports = {
    session,
    destroySessionAndCookie: (req, res) => {
        req.session.destroy()
        res.cookie('CSRF_TOKEN', null, {maxAge: 0})
        res.cookie('connect.sid', null, {maxAge: 0})
    }
}
