const { destroySessionAndCookie } = require('../api/helpers/session')

export default async ({ req, res, redirect, store, $axios }) => {
    if (req) {
        await $axios.get('/user')
            .then(res => {
                store.commit('USER/SET_USER', res.data.payload)
            }).catch(() => {
            destroySessionAndCookie(req, res)
            return redirect('/login')
        })
    }
}
