const expressSession = require('express-session')
const session = expressSession({
    name: 'connect.sid',
    proxy: true,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: 'strict',
        httpOnly: process.env.PROTOCOL !== 'https',
        secure:  process.env.PROTOCOL === 'https'
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
