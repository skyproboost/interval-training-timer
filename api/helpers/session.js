const expressSession = require('express-session')
const MemoryStore = require('memorystore')(expressSession)
const { v4: uuid } = require('uuid')
const session = expressSession({
    name: 'sessionID',
    genid: () => uuid(),
    secret: process.env.SECRET,
    proxy: false,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: new MemoryStore({
        checkPeriod: 86400000 // Удалять просроченные сессии каждые 24 часа (Свойство опр. в мс)
    }),
    cookie: {
        sameSite: 'strict',
        httpOnly: true,
        expires: 86400,
        secure:  process.env.PROTOCOL === 'https'
    }
})

module.exports = {
    session,
    destroySessionAndCookie: (req, res) => {
        if (req.session) req.session.destroy()
        res.cookie('CSRF_TOKEN', null, { maxAge: 0 })
        res.cookie('sessionID', null, { maxAge: 0 })
        res.cookie('UID', null, { maxAge: 0 })
    }
}
