const { destroySessionAndCookie } = require('../api/helpers/session')

export default async ({ req, res, redirect, store, $axios }) => {
    if (req) {
        const response = await $axios.get('/user').catch(() => {
            destroySessionAndCookie(req, res)
            return redirect('/login')
        })

        if (response) store.commit('USER/SET_USER', response.data.payload)
    }
}
